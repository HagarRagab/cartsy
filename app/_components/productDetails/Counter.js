import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";

function Counter({ quantity, onSetQuantity, stock }) {
    function increaseQuanity() {
        onSetQuantity((curQuantity) => {
            if (curQuantity < stock) return (curQuantity += 1);
            else return curQuantity;
        });
    }

    function decreaseQuanity() {
        onSetQuantity((curQuantity) => {
            if (curQuantity === 1) return curQuantity;
            return (curQuantity -= 1);
        });
    }

    return (
        <div className="flex items-center gap-4 border-2 border-text-600 rounded-sm w-fit p-1">
            <Button
                onClick={decreaseQuanity}
                className="bg-transparent cursor-pointer shadow-none text-text-100 rounded-full hover:bg-bg-200"
            >
                <Minus size={15} />
            </Button>
            <p className="font-semibold">{quantity}</p>
            <Button
                onClick={increaseQuanity}
                className="bg-transparent cursor-pointer shadow-none text-text-100 rounded-full hover:bg-bg-200"
            >
                <Plus size={15} />
            </Button>
        </div>
    );
}

export default Counter;
