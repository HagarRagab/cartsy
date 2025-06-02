import { Check, ChevronsUpDown } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/src/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/src/components/ui/command";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/src/components/ui/form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/src/components/ui/popover";
import { cn } from "@/src/lib/utils";

function SelectBox({ form, name, label = "", items, className = "" }) {
    const t = useTranslations("settings");

    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className={className}>
                    <FormLabel>{label}</FormLabel>
                    <Popover>
                        <PopoverTrigger asChild>
                            <FormControl>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    className={cn(
                                        "w-full justify-between",
                                        !field.value && "text-muted-foreground"
                                    )}
                                >
                                    {field.value
                                        ? items.find(
                                              (item) =>
                                                  item.value === field.value
                                          )?.label
                                        : `${t("select")} ${label}`}
                                    <ChevronsUpDown className="opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                            <Command>
                                <CommandInput
                                    placeholder={t("searchPlaceholder")}
                                    className="h-9"
                                />
                                <CommandList>
                                    <CommandEmpty>{t("noResult")}</CommandEmpty>
                                    <CommandGroup>
                                        {items.map((item) => (
                                            <CommandItem
                                                value={item.value}
                                                key={item.value}
                                                onSelect={() => {
                                                    form.setValue(
                                                        name,
                                                        item.value
                                                    );
                                                }}
                                            >
                                                {item.label}
                                                <Check
                                                    className={cn(
                                                        "ml-auto",
                                                        item.value ===
                                                            field.value
                                                            ? "opacity-100"
                                                            : "opacity-0"
                                                    )}
                                                />
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </CommandList>
                            </Command>
                        </PopoverContent>
                    </Popover>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

export default SelectBox;
