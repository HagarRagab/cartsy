import { useState } from "react";
import { LoaderCircle, MapPinHouse } from "lucide-react";

import { getAddressByCoords } from "@/app/_utils/helper";
import { Button } from "@/components/ui/button";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

function AddressInput({ form, language }) {
    const [isLoading, setIsLoading] = useState(false);

    function handleGeoLocation(e) {
        e.preventDefault();

        navigator.geolocation.getCurrentPosition(async (position) => {
            const { latitude: lat, longitude: lng } = position.coords;
            setIsLoading(true);
            const address = await getAddressByCoords(lat, lng, language);
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
                        <FormLabel>Address</FormLabel>
                        <FormControl>
                            <div className="flex items-center gap-2">
                                <Input
                                    className="bg-bg-100"
                                    placeholder="Address"
                                    {...field}
                                />
                                <Button
                                    onClick={handleGeoLocation}
                                    className="cursor-pointer outline-btn"
                                    title="Get your location"
                                >
                                    {isLoading ? (
                                        <LoaderCircle
                                            className="animate-spin"
                                            size={20}
                                        />
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
