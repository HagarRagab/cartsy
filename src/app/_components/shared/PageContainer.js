function PageContainer({ children, className = "" }) {
    return (
        <div className={`max-w-7xl mx-auto p-2 sm:p-8 ${className}`}>
            {children}
        </div>
    );
}

export default PageContainer;
