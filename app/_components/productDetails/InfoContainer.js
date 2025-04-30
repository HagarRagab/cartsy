function InfoContainer({ title, children }) {
    return (
        <div>
            <h2 className="mb-2 font-semibold">{title}</h2>
            {children}
        </div>
    );
}

export default InfoContainer;
