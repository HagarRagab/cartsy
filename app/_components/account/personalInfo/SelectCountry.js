import { Check, ChevronsUpDown } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

function SelectCountry({ form, label = "", items, className = "" }) {
    return (
        <FormField
            control={form.control}
            name="country"
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
                                                  item.name === field.value
                                          )?.name
                                        : "Select country"}
                                    <ChevronsUpDown className="opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                            <Command>
                                <CommandInput
                                    placeholder="Search country..."
                                    className="h-9"
                                />
                                <CommandList>
                                    <CommandEmpty>
                                        No country found.
                                    </CommandEmpty>
                                    <CommandGroup>
                                        {items.map((item) => (
                                            <CommandItem
                                                value={item.name}
                                                key={item.name}
                                                onSelect={() => {
                                                    form.setValue(
                                                        "country",
                                                        item.name
                                                    );
                                                }}
                                                className="w-full flex items-center"
                                            >
                                                <p className="flex-1">
                                                    {item.name}
                                                </p>
                                                <img
                                                    src={item.flag}
                                                    alt={`${item.name}'s flag`}
                                                    className="w-5 aspect-auto"
                                                />
                                                <Check
                                                    className={cn(
                                                        "ml-auto",
                                                        item.name ===
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

export default SelectCountry;
