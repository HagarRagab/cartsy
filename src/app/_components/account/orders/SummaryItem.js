import FormattedPrice from "@/src/app/_components/shared/FormattedPrice";

function SummaryItem({ label, value, currency, className = "" }) {
    return (
        <>
            <p className={className}>{label}</p>
            <p className={`text-end ${className}`}>
                {currency ? (
                    <FormattedPrice value={value} currency={currency} />
                ) : (
                    value
                )}
            </p>
        </>
    );
}

export default SummaryItem;
