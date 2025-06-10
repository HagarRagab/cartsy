"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Search } from "lucide-react";
import { useTranslations } from "next-intl";
import { redirect } from "next/navigation";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

import SpinnerIcon from "@/src/app/_components/shared/SpinnerIcon";
import { searchFormSchema } from "@/src/app/_lib/validation";
import { direction } from "@/src/app/_utils/helper";
import { Button } from "@/src/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/src/components/ui/select";

function SearchForm({ categories, locale }) {
    const [isPending, startTransition] = useTransition();
    const t = useTranslations("header");

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
            redirect(
                `/${locale}/products?search=${search}&category=${category}`
            );
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
                                dir={direction(locale)}
                            >
                                <FormControl>
                                    <SelectTrigger
                                        className={`shrink-1 w-25 sm:w-[144px] bg-bg-700 text-text-700 hover:bg-bg-300 hover:text-text-200 border-none text-xs md:text-base ${
                                            locale === "ar"
                                                ? "rounded-l-none rounded-br-sm rounded-tr-sm"
                                                : "rounded-r-none rounded-bl-sm rounded-tl-sm"
                                        }`}
                                    >
                                        <SelectValue
                                            placeholder={t(
                                                "SearchListPlaceholder"
                                            )}
                                        />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    <SelectGroup>
                                        <SelectItem value="0">
                                            {t("searchAll")}
                                        </SelectItem>
                                        {categories.map((category) => (
                                            <SelectItem
                                                value={category.id}
                                                key={category.id}
                                            >
                                                {category.name[locale]}
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
                                    className="border-none m-0 text-xs sm:text-base"
                                    placeholder={t("findProduct")}
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
