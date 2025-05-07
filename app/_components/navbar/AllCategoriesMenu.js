import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Link from "next/link";

function AllCategoriesMenu({ categories }) {
    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="ghost"
                    className="text-md hover:underline transition-all hover:bg-transparent hover:text-text-700 p-0 cursor-pointer"
                >
                    <Menu />
                    All
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="ml-8 w-fit">
                <DropdownMenuGroup>
                    {categories.map((c) => (
                        <DropdownMenuItem key={c.id}>
                            <Link href={`/products/${c.slug}`}>{c.name}</Link>
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default AllCategoriesMenu;
