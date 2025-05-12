"use client";

import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { searchFormSchema } from "@/app/_lib/validation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import SpinnerIcon from "@/app/_components/shared/SpinnerIcon";

function SearchForm({ categories }) {
    const router = useRouter();
    const [isPending, startTransition] = useTransition();

    const form = useForm({
        resolver: zodResolver(searchFormSchema),
        defaultValues: {
            search: "",
            category: "",
        },
    });

    function onSubmit(values) {
        const { search, category } = values;
        startTransition(() => {
            router.push(`/products?search=${search}&category=${category}`);
            form.reset();
        });
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
                        <FormItem className="relative">
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                                {...field}
                            >
                                <FormControl>
                                    <SelectTrigger className="w-[160px] bg-bg-700 text-text-700 hover:bg-bg-300 hover:text-text-200 border-none rounded-r-none rounded-bl-sm rounded-tl-sm">
                                        <SelectValue placeholder="Select category" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="0">
                                            All Categories
                                        </SelectItem>
                                        {categories.map((category) => (
                                            <SelectItem
                                                value={category.id}
                                                key={category.id}
                                            >
                                                {category.name}
                                            </SelectItem>
                                        ))}
                                    </SelectGroup>
                                </SelectContent>
                            </Select>
                            <FormMessage className="absolute bottom-0 translate-y-[calc(100%+7px)]" />
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="search"
                    render={({ field }) => (
                        <FormItem className="flex-1 mr-0 relative">
                            <FormControl>
                                <Input
                                    className="border-none m-0"
                                    placeholder="Find product here"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage className="absolute bottom-0 translate-y-[calc(100%+7px)]" />
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    className="primary-btn rounded-none"
                    disabled={isPending}
                >
                    {isPending ? <SpinnerIcon /> : <Search size={20} />}
                </Button>
            </form>
        </Form>
    );
}

export default SearchForm;
