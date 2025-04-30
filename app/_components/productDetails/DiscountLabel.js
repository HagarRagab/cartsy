import { format } from "date-fns";

function DiscountLabel({ discount }) {
    return (
        <div className="rounded-md px-6 py-4 h-fit bg-primary-gradient text-text-200 flex items-center gap-4 shadow-xl">
            <p className="text-lg font-semibold">{discount.percentage}% OFF</p>
            <p className="bg-bg-200 px-4 py-2 w-fit rounded-md text-text-200 shadow-lg">
                Until {format(new Date(discount.endDate), "MMM dd, yyyy")}
            </p>
        </div>
    );
}

export default DiscountLabel;
