import { BanknoteArrowDown, CreditCard, Truck, User } from "lucide-react";

export const countries = [
    {
        value: "egypt",
        label: "Egypt",
    },
    {
        value: "saudi arabia",
        label: "Saudi Arabia",
    },
    {
        value: "usa",
        label: "USA",
    },
];

export const languages = [
    {
        value: "AR",
        label: "العربية",
    },
    {
        value: "EN",
        label: "English",
    },
];

export const currencies = [
    { label: "USD", value: "United States Dollar" },
    { label: "EUR", value: "Euro" },
    { label: "SAR", value: "Saudi Riyal" },
    { label: "EGP", value: "Egyptian Pound" },
    { label: "AED", value: "United Arab Emirates Dirham" },
];

export const phoneCodes = [
    { label: "+20", value: "Egypt" },
    { label: "+30", value: "Saudi" },
];

export async function getCurrencies(symbols) {
    try {
        const currenciesRatesRes = await fetch(
            `${process.env.FIXER_IO_URL}?access_key=${
                process.env.FIXER_IO_KEY
            }&symbols=${symbols.join(",")}`
        );
        const currenciesRates = await currenciesRatesRes.json();
        return currenciesRates;
    } catch (error) {
        console.error(error);
        throw new Error("Cannot get Currencies. Try again later");
    }
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

export const helpFAQs = [
    {
        icon: <Truck />,
        title: "Orders & Shipping",
        FAQs: [
            {
                question: "How do I track my order?",
                answer: "Once your order has been shipped, you'll receive a confirmation email with a tracking link. You can also log in to your Cartsy Account and visit the My Orders section.",
            },
            {
                question: "How long does shipping take?",
                answer: "Standard shipping typically takes 3&mdash;7 business days. Express and same-day delivery options are also available at checkout, depending on your location.",
            },
            {
                question: "Can I change or cancel my order?",
                answer: "You can change or cancel an order within 1 hour of purchase. Please contact our support team immediately at support@cartsy.com or use our live chat feature.",
            },
        ],
    },
    {
        icon: <BanknoteArrowDown />,
        title: "Returns & Refunds",
        FAQs: [
            {
                question: "What&apos;s your return policy?",
                answer: "We offer a 30-day return window on most items. Products must be unused and in original packaging. View our full Return Policy.",
            },
            {
                question: "How do I start a return?",
                answer: "Log in to your account, go to My Orders, and select the item you&apos;d like to return. Follow the on-screen steps to generate a return label.",
            },
            {
                question: "When will I receive my refund?",
                answer: "Refunds are typically processed within 5&mdash;7 business days after we receive your returned item.",
            },
        ],
    },
    {
        icon: <CreditCard />,
        title: "Payments & Billing",
        FAQs: [
            {
                question: "What payment methods do you accept?",
                answer: "We accept Visa, MasterCard, American Express, Discover, PayPal, Apple Pay, and Cartsy Gift Cards.",
            },
            {
                question: "Is my payment information secure?",
                answer: "Yes. Cartsy uses SSL encryption and PCI-compliant systems to ensure your payment data is fully protected.",
            },
        ],
    },
    {
        icon: <User />,
        title: "Account & Settings",
        FAQs: [
            {
                question: "How do I create an account?",
                answer: "Click Sign Up in the top-right corner of any page. You can register using your email or sign in with Google or Apple.",
            },
            {
                question: "I forgot my password — what now?",
                answer: "Click Forgot Password? on the login page. We&apos;ll email you a link to reset your password.",
            },
        ],
    },
];

export const contactUsInfo = {
    address: "123, Anywhere St, Any City, St 12345",
    email: "support@cartsy.com",
    liveChat: "Available 9 AM &mdash; 9 PM (EST), Monday to Saturday",
    phone: "1-800-555-CART (2278)",
    socialMedia: {
        facebook: "https://facebook.com/shopcartcy",
        instgram: "https://instgram.com/shopcartcy",
    },
};
