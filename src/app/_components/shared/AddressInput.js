import { MapPinHouse } from "lucide-react";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";

import { useAuth } from "@/src/app/_context/AuthContext";
import { getAddressByCoords } from "@/src/app/_utils/helper";
import { Button } from "@/src/components/ui/button";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/src/components/ui/form";
import { Input } from "@/src/components/ui/input";
import SpinnerIcon from "@/src/app/_components/shared/SpinnerIcon";

function AddressInput({ form }) {
    const [isLoading, setIsLoading] = useState(false);

    const t = useTranslations("personalInfo");
    const locale = useLocale();

    function handleGeoLocation(e) {
        e.preventDefault();

        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude: lat, longitude: lng } = position.coords;
            setIsLoading(true);
            const address = await getAddressByCoords(lat, lng, locale);
            form.setValue("address", address?.results[0]?.formatted);
            form.setValue("city", address?.results[0]?.components?.city);
            setIsLoading(false);
        });
    }

    return (
        <>
            <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>{t("address")}</FormLabel>
                        <FormControl>
                            <div className="flex items-center gap-2">
                                <Input
                                    className="bg-bg-100"
                                    placeholder={t("address")}
                                    {...field}
                                />
                                <Button
                                    onClick={handleGeoLocation}
                                    className="cursor-pointer outline-btn"
                                    title={t("locationLabel")}
                                >
                                    {isLoading ? (
                                        <SpinnerIcon />
                                    ) : (
                                        <MapPinHouse />
                                    )}
                                </Button>
                            </div>
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                    <FormItem>
                        <FormControl>
                            <Input type="hidden" {...field} />
                        </FormControl>
                    </FormItem>
                )}
            />
        </>
    );
}

export default AddressInput;
