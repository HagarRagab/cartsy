import { Button } from "@/src/components/ui/button";

function PlusMinusBtn({ onClick, icon, ...props }) {
    return (
        <Button
            onClick={onClick}
            className="bg-transparent cursor-pointer shadow-none text-text-100 hover:bg-bg-200"
            {...props}
        >
            {icon}
        </Button>
    );
}

export default PlusMinusBtn;
