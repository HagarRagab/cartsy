import Image from "next/image";
import PriceLabel from "../../shared/PriceLabel";

async function WishProduct({ product, user }) {
    const { imagePreview, title, originalPrice, currency } = product;
    const userLanguage = user.language.slice(0, 2).toLowerCase();

    const userCurrency = user.currency || "USD";
    const currencyRate =
        currency === userCurrency
            ? null
            : await convertCurrency(currency, userCurrency);

    return (
        <div className="relative w-full grid grid-cols-[auto_1fr]">
            <div className="w-40 aspect-square">
                <Image
                    src={imagePreview}
                    alt={title[userLanguage]}
                    fill
                    className="object-contain"
                />
            </div>
            <div>
                <p>{title[userLanguage]}</p>
                <p>{originalPrice}</p>
                <PriceLabel
                    price={originalPrice}
                    productCurrency={currency}
                    userCurrency={userCurrency}
                    currencyRate={currencyRate}
                />
            </div>
        </div>
    );
}

export default WishProduct;
