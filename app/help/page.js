import HelpAccordion from "@/app/_components/shared/HelpAccordion";
import PageContainer from "@/app/_components/shared/PageContainer";
import Link from "next/link";

function Page() {
    return (
        <PageContainer>
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
                    href="/contact-us"
                    className="text-accent-200 hover:underline"
                >
                    Visit our contact us page
                </Link>
            </div>
        </PageContainer>
    );
}

export default Page;
