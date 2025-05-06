import { Button } from "@/components/ui/button";

function ItemActionBtn({ icon, label, style }) {
    return (
        <Button className={`${style} w-full my-1`}>
            {icon}
            <span>{label}</span>
        </Button>
    );
}

export default ItemActionBtn;
