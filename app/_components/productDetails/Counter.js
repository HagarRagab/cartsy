import { Button } from "@/components/ui/button";
import { Minus, Plus } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Counter({ stock }) {
    const searchParams = useSearchParams();
    const params = new URLSearchParams(searchParams);
    const pathname = usePathname();
    const router = useRouter();
    const quantity = Number(searchParams.get("quantity")) || 1;

    function increaseQuanity() {
        if (quantity < stock) {
            params.set("quantity", quantity + 1);
            router.replace(`${pathname}?${params.toString()}`, {
                scroll: false,
            });
        } else return;
    }

    function decreaseQuanity() {
        if (quantity > 1) {
            params.set("quantity", quantity - 1);
            router.replace(`${pathname}?${params.toString()}`, {
                scroll: false,
            });
        } else return;
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
