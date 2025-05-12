import PageContainer from "@/app/_components/shared/PageContainer";

function Page() {
    return (
        <PageContainer>
            <h1 className="font-semibold text-2xl mb-6">About us</h1>
            <div className="bg-bg-100 px-10 py-6 shadow-2xl rounded-2xl">
                <div className="mt-6 mb-4">
                    <h2 className="font-semibold text-lg mb-2">
                        Welcome to Cartsy &mdash; Where Style Meets Simplicity.
                    </h2>
                    <p className="ml-4">
                        At Cartsy, we believe shopping should be effortless,
                        enjoyable, and inspiring. Founded in 2023 by a
                        passionate team of tech-savvy retail experts and design
                        enthusiasts, Cartsy was born out of a simple idea: to
                        create a smarter way to shop online. <br /> We&apos;re
                        more than just an e-commerce platform &mdash; we&apos;re
                        a community-first shopping destination that connects
                        people with curated collections of fashion, home goods,
                        beauty, gadgets, and everyday essentials, all in one
                        place.
                    </p>
                </div>
                <div className="mb-4">
                    <h2 className="font-semibold text-lg mb-2">Our Mission</h2>
                    <p className="ml-4">
                        To redefine the online shopping experience by making it
                        more personalized, efficient, and joyful. We combine
                        cutting-edge technology with intuitive design to help
                        our customers discover products they love &mdash; faster
                        and easier.
                    </p>
                </div>
                <div className="mb-4">
                    <h2 className="font-semibold text-lg mb-2">
                        What Makes Us Different
                    </h2>
                    <ul className="ml-8 flex flex-col gap-2 list-disc">
                        <li>
                            <b>Curated Collections:</b> We don&apos;t just stock
                            items &mdash; we curate them. Every product on
                            Cartsy is handpicked by our team for quality, style,
                            and value.
                        </li>
                        <li>
                            <b>Smart Shopping:</b> Our AI-powered recommendation
                            engine tailors your shopping experience based on
                            your taste, preferences, and shopping habits.
                        </li>
                        <li>
                            <b>Fast & Reliable Delivery:</b> With our advanced
                            logistics partnerships, we ensure your orders arrive
                            safely and swiftly, no matter where you are.
                        </li>
                        <li>
                            <b>Sustainability Focus:</b> We work closely with
                            eco-conscious brands and strive to reduce our
                            environmental footprint through greener packaging
                            and operations.
                        </li>
                    </ul>
                </div>
            </div>
        </PageContainer>
    );
}

export default Page;
