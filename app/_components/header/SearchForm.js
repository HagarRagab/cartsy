"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

import { searchFormSchema } from "@/app/_lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useRouter } from "next/navigation";

function SearchForm({ categories }) {
    const router = useRouter();

    const form = useForm({
        resolver: zodResolver(searchFormSchema),
        defaultValues: {
            search: "",
            category: "allcategories",
        },
    });

    function onSubmit(values) {
        const { search, category } = values;
        if (!search) return;
        router.push(`/products?search=${search}&category=${category}`);
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex items-center w-full"
            >
                <FormField
                    control={form.control}
                    name="category"
                    render={({ field }) => (
                        <FormItem>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue="allcategories"
                                {...field}
                            >
                                <FormControl>
                                    <SelectTrigger className="w-[160px] bg-bg-700 text-text-700 hover:bg-bg-300 hover:text-text-200 border-none rounded-r-none rounded-bl-sm rounded-tl-sm">
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectItem value="allcategories">
                                        All Categories
                                    </SelectItem>
                                    {categories.map((category) => (
                                        <SelectItem
                                            value={category.slug}
                                            key={category.slug}
                                        >
                                            {category.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="search"
                    render={({ field }) => (
                        <FormItem className="flex-1 mr-0">
                            <FormControl>
                                <Input
                                    className="border-none m-0"
                                    placeholder="Find product here"
                                    {...field}
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button type="submit" className="primary-btn rounded-none">
                    <Search size={20} />
                </Button>
            </form>
        </Form>
    );
}

export default SearchForm;
