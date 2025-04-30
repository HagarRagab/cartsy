function PageLayout({ children, className = "max-w-6xl" }) {
    return <div className={`py-8 px-12 mx-auto ${className}`}>{children}</div>;
}

export default PageLayout;
