import HelpAccordion from "@/app/_components/shared/HelpAccordion";
import PageLayout from "@/app/_components/shared/PageLayout";
import Link from "next/link";

function Page() {
    return (
        <PageLayout>
            <h1 className="font-semibold text-2xl mb-4">
                How can we assist you today?
            </h1>
            <p>
                At Cartsy, your satisfaction is our top priority. Whether
                you&apos;re tracking an order, making a return, or just have a
                quick question — we&apos;re here to help. Below, you&apos;ll
                find answers to the most frequently asked questions. If you need
                more personalized support, don&apos;t hesitate to reach out!
            </p>

            <HelpAccordion />
            <div className="text-center">
                <p className="font-semibold text-lg text-center">
                    Still need help? We&apos;ve got your back.
                </p>
                <Link
                    href="/contactUs"
                    className="text-accent-200 hover:underline"
                >
                    Visit our contact us page
                </Link>
            </div>
        </PageLayout>
    );
}

export default Page;
