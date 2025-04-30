import { Button } from "@/components/ui/button";
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MapPinHouse } from "lucide-react";

function AddressInput({ form }) {
    return (
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
                            <Button className="cursor-pointer outline-btn">
                                <MapPinHouse />
                            </Button>
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
}

export default AddressInput;
