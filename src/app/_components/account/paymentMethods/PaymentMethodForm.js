import { Button } from "@/src/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/src/components/ui/dialog";
import { Input } from "@/src/components/ui/input";
import { Label } from "@/src/components/ui/label";

function PaymentMethodForm({ children, title, btnText }) {
    return (
        <Dialog>
            <DialogTrigger asChild>{children}</DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{title}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div>
                        <Label
                            htmlFor="fullName"
                            className="text-right mb-1 text-sm text-text-300"
                        >
                            Name on card
                        </Label>
                        <Input id="fullName" value="Pedro Duarte" />
                    </div>
                    <div>
                        <Label
                            htmlFor="cardNumber"
                            className="text-right mb-1 text-sm text-text-300"
                        >
                            Card number
                        </Label>
                        <Input id="cardNumber" value="**** **** **** ****" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                        <div>
                            <Label
                                htmlFor="cvv"
                                className="text-right mb-1 text-sm text-text-300"
                            >
                                CVV number
                            </Label>
                            <Input id="cvv" value="***" />
                        </div>
                        <div>
                            <Label
                                htmlFor="expireAt"
                                className="text-right mb-1 text-sm text-text-300"
                            >
                                Expiration date
                            </Label>
                            <Input id="expireAt" value="08/27" />
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button type="submit" className="primary-btn w-full">
                        {btnText}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default PaymentMethodForm;
