import { useTranslations } from "next-intl";

function SaleLabel() {
    const t = useTranslations("general");

    return (
        <div className="w-[200px] text-center z-10 absolute -left-15 top-5 bg-red-custom-200 text-white py-1 px-4 -rotate-45 text-base font-semibold uppercase shadow-xl">
            {t("sale")}
        </div>
    );
}

export default SaleLabel;
