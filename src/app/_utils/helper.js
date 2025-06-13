export async function getAddressByCoords(lat, lng, language) {
    try {
        const res = await fetch(
            `/api/reverse-geocode?lat=${lat}&lng=${lng}&langugae=${language}`
        );
        if (!res.ok) throw new Error("failed to fetch address");
        const address = await res.json();
        return address;
    } catch (error) {
        console.error(error);
    }
}

export async function convertCurrency(from, to) {
    try {
        const currenciesRatesRes = await fetch(
            `/api/currency-exchange?from=${from}&to=${to}`
        );

        if (!currenciesRatesRes.ok)
            throw new Error("failed to get currencies exchange rates.");

        const currenciesRates = await currenciesRatesRes.json();
        return currenciesRates;
    } catch (error) {
        console.error(error);
    }
}

export function convertToSubCurrency(amount, factor = 100) {
    return Math.round(amount * factor);
}

export function calcRatings(ratings) {
    if (!ratings.length) return;
    const ratingsValues = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
    ratings.forEach((rating) => ratingsValues[rating.stars]++);
    return ratingsValues;
}

export function calcTotalRating(ratings) {
    if (!ratings.length) return;
    return +(
        ratings.reduce((total, rating) => total + rating.stars, 0) /
        ratings.length
    ).toFixed(1);
}

export function handleCounting(num) {
    if (num > 1000000) return (num / 1000000).toFixed(1) + "+M";
    if (num > 1000) return (num / 1000).toFixed(1) + "+K";
    else return num;
}

export function filterProducts(products, discounts, searchValues) {
    const {
        filteredbrands,
        filteredcategories,
        filtereddeals,
        filteredcondition,
        filteredrating,
        filteredrange,
    } = searchValues;

    let filteredProducts = products;

    if (filtereddeals && discounts)
        filteredProducts = discounts.map((d) => d.product);
    if (filteredbrands)
        filteredProducts = products.filter((p) =>
            filteredbrands?.split("-").includes(p.brand.slug)
        );
    if (filteredcategories)
        filteredProducts = products.filter((p) =>
            filteredcategories?.split("-").includes(p.category.slug)
        );
    if (filteredcondition)
        filteredProducts = products.filter(
            (p) => filteredcondition === p.condition
        );
    if (filteredrating)
        filteredProducts = products.filter((p) => filteredrating >= p.rating);
    if (filteredrange)
        filteredProducts = products.filter(
            (p) =>
                filteredrange?.split("-")[0] <= p.originalPrice &&
                filteredrange?.split("-")[1] >= p.originalPrice
        );

    return filteredProducts;
}

export function direction(locale) {
    return locale === "ar" ? "rtl" : "ltr";
}

export function generateOrderNumber(prefixLength) {
    // ORD-2024-001234 (prefix + year + timestamp)

    const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let prefix = "";
    for (let i = 0; i < prefixLength; i++) {
        prefix += letters.at(Math.floor(Math.random() * letters.length));
    }

    const year = new Date().getFullYear();

    const timeStamp = Date.now();

    return `${prefix}-${year}-${timeStamp}`;
}

export function CalcOrderSummary(orderItems, currencyRate, promoCode) {
    const itemsPrice =
        orderItems?.reduce(
            (total, cur) =>
                total + Number(cur.inventory?.price) * Number(cur.quantity),
            0
        ) * currencyRate;

    const discountAmount = !promoCode
        ? 0
        : promoCode?.discount_type === "percentage"
        ? (itemsPrice * promoCode?.value) / 100
        : promoCode?.value * currencyRate;

    const itemsPriceAfterDiscount = itemsPrice - discountAmount;
    const shippingCost = 0 * currencyRate;

    const chargeAmount = itemsPriceAfterDiscount + shippingCost;

    return {
        itemsPrice,
        discountAmount,
        itemsPriceAfterDiscount,
        shippingCost,
        chargeAmount,
    };
}
