"use client";

import { useState } from "react";
import { ChevronDown, Flag } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { RegionalPreferencesList } from "@/app/_components/header/RegionalPreferencesList";
import { countries, currencies, languages } from "@/app/_utils/helper";

function RegionalSettings() {
    const language = "EN";
    const currency = "EGP";

    return (
        <Popover>
            <PopoverTrigger>
                <div className="bg-transparent hover:bg-transparent cursor-pointer flex gap-2 items-center p-0">
                    <div>
                        <Flag size={26} />
                    </div>
                    <div className="text-sm text-left">
                        <p>{language}/</p>
                        <p className="flex items-center gap-1 font-semibold">
                            {currency}
                            <ChevronDown size={20} />
                        </p>
                    </div>
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-80">
                <div className="grid gap-4">
                    <div className="grid gap-2">
                        <div className="grid grid-cols-3 items-center gap-4">
                            <p className="font-medium">Ship to:</p>
                            <RegionalPreferencesList
                                list={countries}
                                prefType="country"
                                className="col-span-2 h-8"
                            />
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                            <p className="font-medium">Language:</p>
                            <RegionalPreferencesList
                                list={languages}
                                prefType="language"
                                className="col-span-2 h-8"
                            />
                        </div>
                        <div className="grid grid-cols-3 items-center gap-4">
                            <p className="font-medium">Currency:</p>
                            <RegionalPreferencesList
                                list={currencies}
                                prefType="currency"
                                className="col-span-2 h-8"
                            />
                        </div>
                    </div>
                    <Button className="primary-btn">Save</Button>
                </div>
            </PopoverContent>
        </Popover>
    );
}

export default RegionalSettings;
