"use client";

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

function SelectCountry({ form, label = "", items, className = "" }) {
    return (
        <FormField
            control={form.control}
            name="country"
            render={({ field }) => (
                <FormItem className={className}>
                    <FormLabel>{label}</FormLabel>
                    <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                    >
                        <FormControl>
                            <SelectTrigger className="bg-bg-100 w-full text-text-200">
                                <SelectValue
                                    placeholder={
                                        field.value
                                            ? items.find(
                                                  (item) =>
                                                      item.name === field.value
                                              )?.name
                                            : "Select country"
                                    }
                                />
                            </SelectTrigger>
                        </FormControl>
                        <SelectContent className="w-[250px]">
                            {items.map((item) => (
                                <SelectItem value={item.name} key={item.name}>
                                    <div className="grid grid-cols-[1fr_auto] items-center gap-2">
                                        <p>{item.name}</p>
                                        <img
                                            src={item.flag}
                                            alt={`${item.name}'s flag`}
                                            className="w-5 aspect-auto"
                                        />
                                    </div>
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

export default SelectCountry;
