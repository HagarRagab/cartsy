import LinksGroup from "./LinksGroup";

function Footer() {
    return (
        <footer className="bg-bg-800 text-text-700 px-12 py-8">
            <div className="flex justify-around gap-6 mb-12">
                <LinksGroup
                    title="Get to know us"
                    list={[{ label: "About Cartcy", path: "/aboutUs" }]}
                />
                <LinksGroup
                    title="Let us help you"
                    list={[
                        { label: "Help", path: "/help" },
                        { label: "Contact us", path: "/contactUs" },
                    ]}
                />
                <LinksGroup
                    title="Pay with"
                    list={[
                        { label: "visa", path: "/visa.webp" },
                        { label: "master card", path: "/master-card.webp" },
                        {
                            label: "american express",
                            path: "/american-express.webp",
                        },
                        { label: "JCB", path: "/jcb.webp" },
                    ]}
                    isImg={true}
                />
            </div>
            <p className="text-center">
                &copy;2023&mdash;2025, Cartcy, Inc. or its affiliates
            </p>
        </footer>
    );
}

export default Footer;
