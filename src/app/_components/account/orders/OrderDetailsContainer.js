function OrderDetailsContainer({ title, children }) {
    return (
        <div className="p-4 border-2 rounded-lg mt-4">
            <h3 className="font-semibold text-lg mb-4">{title}</h3>
            {children}
        </div>
    );
}

export default OrderDetailsContainer;
