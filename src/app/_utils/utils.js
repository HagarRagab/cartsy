import {
    BanknoteArrowDown,
    CreditCard,
    Heart,
    Settings,
    ShoppingBag,
    Truck,
    User,
    UserRound,
    Link2,
    Mails,
    MapPin,
    MessageCircle,
    Phone,
} from "lucide-react";

import countryCodes from "@/data/countryCodes.json";

export const countries = countryCodes.map((country) => {
    const { name, flag } = country;
    return { name, flag };
});

export const phoneCodes = [...new Set(countryCodes.map((c) => c.id))].map(
    (code) => ({
        label: code,
        value: code,
    })
);

export const currencies = [...new Set(countryCodes.map((c) => c.currency))].map(
    (country) => ({
        label: country,
        value: country,
    })
);

export const languages = [
    { label: "العربية", value: "ar" },
    { label: "English", value: "en" },
];

export const helpFAQs = [
    {
        icon: <Truck />,
        title: {
            en: "Orders & Shipping",
            ar: "الطلبات والشحن",
        },
        FAQs: [
            {
                question: {
                    en: "How do I track my order?",
                    ar: "كيف يمكنني تتبع طلبي؟",
                },
                answer: {
                    en: "Once your order has been shipped, you'll receive a confirmation email with a tracking link. You can also log in to your Cartsy Account and visit the My Orders section.",
                    ar: "بمجرد شحن طلبك، ستتلقى بريدًا إلكترونيًا يحتوي على رابط تتبع. يمكنك أيضًا تسجيل الدخول إلى حسابك في Cartsy وزيارة قسم طلباتي.",
                },
            },
            {
                question: {
                    en: "How long does shipping take?",
                    ar: "كم يستغرق الشحن؟",
                },
                answer: {
                    en: "Standard shipping typically takes 3—7 business days. Express and same-day delivery options are also available at checkout, depending on your location.",
                    ar: "عادةً ما يستغرق الشحن العادي من ٣ إلى ٧ أيام عمل. تتوفر أيضًا خيارات التوصيل السريع أو في نفس اليوم عند الدفع، حسب موقعك.",
                },
            },
            {
                question: {
                    en: "Can I change or cancel my order?",
                    ar: "هل يمكنني تعديل أو إلغاء طلبي؟",
                },
                answer: {
                    en: "You can change or cancel an order within 1 hour of purchase. Please contact our support team immediately at support@cartsy.com or use our live chat feature.",
                    ar: "يمكنك تعديل أو إلغاء الطلب خلال ساعة واحدة من الشراء. يرجى التواصل مع فريق الدعم لدينا فورًا عبر البريد الإلكتروني support@cartsy.com أو استخدام ميزة المحادثة المباشرة.",
                },
            },
        ],
    },
    {
        icon: <BanknoteArrowDown />,
        title: {
            en: "Returns & Refunds",
            ar: "الإرجاع والاسترداد",
        },
        FAQs: [
            {
                question: {
                    en: "What's your return policy?",
                    ar: "ما هي سياسة الإرجاع لديكم؟",
                },
                answer: {
                    en: "We offer a 30-day return window on most items. Products must be unused and in original packaging. View our full Return Policy.",
                    ar: "نحن نوفر فترة إرجاع مدتها 30 يومًا لمعظم المنتجات. يجب أن تكون المنتجات غير مستخدمة وفي تغليفها الأصلي. راجع سياسة الإرجاع الكاملة لدينا.",
                },
            },
            {
                question: {
                    en: "How do I start a return?",
                    ar: "كيف أبدأ عملية الإرجاع؟",
                },
                answer: {
                    en: "Log in to your account, go to My Orders, and select the item you'd like to return. Follow the on-screen steps to generate a return label.",
                    ar: "قم بتسجيل الدخول إلى حسابك، وانتقل إلى قسم طلباتي، واختر المنتج الذي ترغب في إرجاعه. اتبع التعليمات الظاهرة لإنشاء ملصق الإرجاع.",
                },
            },
            {
                question: {
                    en: "When will I receive my refund?",
                    ar: "متى سأستلم المبلغ المسترد؟",
                },
                answer: {
                    en: "Refunds are typically processed within 5—7 business days after we receive your returned item.",
                    ar: "عادةً ما تتم معالجة المبالغ المستردة خلال ٥ إلى ٧ أيام عمل بعد استلام المنتج المُعاد.",
                },
            },
        ],
    },
    {
        icon: <CreditCard />,
        title: {
            en: "Payments & Billing",
            ar: "المدفوعات والفواتير",
        },
        FAQs: [
            {
                question: {
                    en: "What payment methods do you accept?",
                    ar: "ما هي طرق الدفع التي تقبلونها؟",
                },
                answer: {
                    en: "We accept Visa, MasterCard, American Express, Discover, PayPal, Apple Pay, and Cartsy Gift Cards.",
                    ar: "نقبل بطاقات فيزا، وماستركارد، وأمريكان إكسبريس، وديسكفر، وباي بال، وآبل باي، وبطاقات الهدايا من Cartsy.",
                },
            },
            {
                question: {
                    en: "Is my payment information secure?",
                    ar: "هل معلومات الدفع الخاصة بي آمنة؟",
                },
                answer: {
                    en: "Yes. Cartsy uses SSL encryption and PCI-compliant systems to ensure your payment data is fully protected.",
                    ar: "نعم، تستخدم Cartsy تشفير SSL وأنظمة متوافقة مع PCI لضمان حماية معلومات الدفع الخاصة بك بالكامل.",
                },
            },
        ],
    },
    {
        icon: <User />,
        title: {
            en: "Account & Settings",
            ar: "الحساب والإعدادات",
        },
        FAQs: [
            {
                question: {
                    en: "How do I create an account?",
                    ar: "كيف يمكنني إنشاء حساب؟",
                },
                answer: {
                    en: "Click Sign Up in the top-right corner of any page. You can register using your email or sign in with Google or Apple.",
                    ar: "انقر على زر التسجيل في الزاوية العلوية اليمنى من أي صفحة. يمكنك التسجيل باستخدام بريدك الإلكتروني أو تسجيل الدخول عبر Google أو Apple.",
                },
            },
            {
                question: {
                    en: "I forgot my password — what now?",
                    ar: "نسيت كلمة المرور — ماذا أفعل؟",
                },
                answer: {
                    en: "Click Forgot Password? on the login page. We'll email you a link to reset your password.",
                    ar: "انقر على 'هل نسيت كلمة المرور؟' في صفحة تسجيل الدخول. سنرسل لك رابطًا عبر البريد الإلكتروني لإعادة تعيين كلمة المرور الخاصة بك.",
                },
            },
        ],
    },
];

export const contactUsInfo = {
    address: {
        en: "123, Anywhere St, Any City, St 12345",
        ar: "١٢٣، شارع في أي مكان، أي مدينة، الرمز البريدي ١٢٣٤٥",
    },
    email: {
        en: "support@cartsy.com",
        ar: "support@cartsy.com",
    },
    liveChat: {
        en: "Available 9 AM — 9 PM (EST), Monday to Saturday",
        ar: "متاح من ٩ صباحًا حتى ٩ مساءً (بتوقيت EST)، من الاثنين إلى السبت",
    },
    phone: {
        en: "1-800-555-CART (2278)",
        ar: "1-800-555-CART (2278)",
    },
    socialMedia: {
        facebook: "https://facebook.com/shopcartcy",
        instagram: "https://instgram.com/shopcartcy",
    },
};

export const paymentMethodsList = [
    { label: "visa", src: "/visa.webp" },
    { label: "master card", src: "/master-card.webp" },
    {
        label: "american express",
        src: "/american-express.webp",
    },
    { label: "JCB", src: "/jcb.webp" },
];

export const profileList = [
    {
        label: {
            en: "My account",
            ar: "حسابى",
        },
        icon: <UserRound size={15} />,
        href: "/account",
    },
    // {
    //     label: {
    //         en: "Payments",
    //         ar: "الدفع",
    //     },
    //     icon: <CreditCard size={15} />,
    //     href: "/account/payments",
    // },
    {
        label: {
            en: "My orders",
        },
        icon: <ShoppingBag size={15} />,
        href: "/account/orders",
    },
    {
        label: { en: "My wishlist", ar: "قائمة الأمنيات" },
        icon: <Heart size={15} />,
        href: "/account/wishlist",
    },
    // {
    //     label: {en: "Settings"},
    //     icon: <Settings size={15} />,
    //     href: "/account/settings",
    // },
];

export const contacts = [
    {
        icon: <MapPin />,
        label: { en: "Address:", ar: "العنوان:" },
        value: contactUsInfo.address,
    },
    {
        icon: <Mails />,
        label: { en: "Email:", ar: "البريد الإلكتروني:" },
        value: contactUsInfo.email,
    },
    {
        icon: <MessageCircle />,
        label: { en: "Live Chat:", ar: "الدردشة المباشرة:" },
        value: contactUsInfo.liveChat,
    },
    {
        icon: <Phone />,
        label: { en: "Phone:", ar: "الهاتف:" },
        value: contactUsInfo.phone,
    },
    {
        icon: <Link2 />,
        label: { en: "Social Media:", ar: "وسائل التواصل الاجتماعي:" },
        value: {
            en: "DM us on Instagram, Facebook, or Twitter @shopcartsy",
            ar: "راسلنا عبر الرسائل الخاصة على إنستغرام، فيسبوك، أو تويتر @shopcartsy",
        },
    },
];

export const ads = [
    {
        date: "01 Oct - 31 Oct",
        title: { en: "fashion day", ar: "يوم الموضة" },
        description: {
            en: "Discover fashion that suits your style",
            ar: "اكتشف الموضة التي تناسب أسلوبك",
        },
        image: "/ad2.png",
    },
    {
        date: "11 Apr - 17 Apr",
        title: { en: "save more", ar: "وفر المزيد" },
        description: {
            en: "10% off with your HSBC credit card",
            ar: "احصل على خصم 10% مع بطاقة الائتمان HSBC الخاصة بك",
        },
        image: "/ad1.png",
    },
    {
        date: "",
        title: { en: "free delivery", ar: "احصل على شحن مجانى" },
        description: {
            en: "Free delivery on first order. Cash on delivery.",
            ar: "توصيل مجاني للطلب الأول. الدفع عند الاستلام.",
        },
        image: "/ad3.png",
    },
];
