function PageContainer({ children, className = "" }) {
    return (
        <div className={`max-w-6xl mx-auto p-8 ${className}`}>{children}</div>
    );
}

export default PageContainer;
