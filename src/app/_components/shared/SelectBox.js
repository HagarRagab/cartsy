"use client";

import { useTranslations } from "next-intl";

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/src/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/src/components/ui/select";

function SelectBox({ form, name, label = "", items, className = "" }) {
    const t = useTranslations("settings");

    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className={className}>
                    <FormLabel>{label}</FormLabel>
                    <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                    >
                        <FormControl>
                            <SelectTrigger className="bg-bg-100 w-full">
                                <SelectValue
                                    className={`w-full ${
                                        !field.value
                                            ? "text-muted-foreground"
                                            : ""
                                    }`}
                                    placeholder={
                                        field.value
                                            ? items.find(
                                                  (item) =>
                                                      item.value === field.value
                                              )?.label
                                            : `${t("select")} ${label}`
                                    }
                                />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent className="w-[200px] p-0">
                            {items.map((item) => (
                                <SelectItem value={item.value} key={item.value}>
                                    {item.label}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

export default SelectBox;
