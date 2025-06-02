import { Button } from "@/src/components/ui/button";
import {
    Sheet,
    SheetClose,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/src/components/ui/sheet";
import { Filter } from "lucide-react";

function SheetFilter({ children }) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button className="outline-btn mt-4 ml-3">
                    <Filter /> Filter
                </Button>
            </SheetTrigger>
            <SheetContent className="z-[200]">
                <SheetHeader>
                    <SheetTitle>Filter</SheetTitle>
                </SheetHeader>
                {children}
                <SheetFooter>
                    <SheetClose asChild>
                        <Button type="submit" className="primary-btn">
                            Save changes
                        </Button>
                    </SheetClose>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
}

export default SheetFilter;
