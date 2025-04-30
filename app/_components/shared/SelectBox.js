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

function SelectBox({ form, name, children, items }) {
    // function onSubmit(data) {
    //     toast({
    //         title: "You submitted the following values:",
    //         description: (
    //             <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
    //                 <code className="text-white">
    //                     {JSON.stringify(data, null, 2)}
    //                 </code>
    //             </pre>
    //         ),
    //     });
    // }

    return (
        <FormField
            control={form.control}
            name={name}
            render={({ field }) => (
                <FormItem className="flex flex-col overflow-hidden">
                    <FormLabel>{children}</FormLabel>
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
                                        : `Select ${name}`}
                                    <ChevronsUpDown className="opacity-50" />
                                </Button>
                            </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-[200px] p-0">
                            <Command>
                                <CommandInput
                                    placeholder={`Search ${name}...`}
                                    className="h-9"
                                />
                                <CommandList>
                                    <CommandEmpty>
                                        No {name} found.
                                    </CommandEmpty>
                                    <CommandGroup>
                                        {items.map((item) => (
                                            <CommandItem
                                                value={item.label}
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
