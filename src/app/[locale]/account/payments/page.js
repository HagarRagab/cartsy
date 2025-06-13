import { Ellipsis, Plus } from "lucide-react";
import { getTranslations } from "next-intl/server";

import PaymentMethodForm from "@/src/app/_components/account/paymentMethods/PaymentMethodForm";

async function Page() {
    const t = await getTranslations("paymentMethods");

    return (
        <div>
            <h1 className="text-lg sm:text-2xl font-semibold mb-3">
                {t("title")}
            </h1>
            <p className="text-text-300 text-xs sm:text-sm">{t("subTitle")}</p>
            <div className="mt-6 flex gap-4 items-center">
                <button className="w-80 h-40 p-4 border border-dashed border-bg-300 rounded-lg bg-linear-to-r from-primary-100 to-primary-200 flex flex-col justify-between gap-2 cursor-pointer transition-all hover:scale-95">
                    <div className="flex justify-between items-center gap-2">
                        <p className="text-lg font-semibold">VISA</p>
                        <PaymentMethodForm
                            title="Edit your payment method"
                            btnText="Update card"
                        >
                            <div className="cursor-pointer transition-all hover:scale-115">
                                <Ellipsis size={20} />
                            </div>
                        </PaymentMethodForm>
                    </div>
                    <p className="text-lg">**** **** **** 5463</p>
                    <div className="flex items-center justify-between">
                        <p className="flex flex-col items-start max-w-30 overflow-hidden whitespace-nowrap text-ellipsis">
                            <span className="text-sm text-text-400">Name</span>
                            <span>Demo User Test</span>
                        </p>
                        <p className="flex flex-col items-start">
                            <span className="text-sm text-text-400">
                                Expire Date
                            </span>
                            <span>08/27</span>
                        </p>
                    </div>
                </button>

                <PaymentMethodForm
                    title="Add payment method"
                    btnText="Add card"
                >
                    <button className="w-80 h-40 p-4 border border-dashed border-bg-300 rounded-lg flex flex-col gap-2 items-center justify-center cursor-pointer transition-all hover:scale-95">
                        <div className="border border-dashed border-bg-300 rounded-full p-3">
                            <Plus size={20} />
                        </div>
                        <p className="text-sm">Add payment method</p>
                    </button>
                </PaymentMethodForm>
            </div>
        </div>
    );
}

export default Page;
