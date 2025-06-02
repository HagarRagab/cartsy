"use client";

import PurchaseContactForm from "@/src/app/_components/checkout/PurchaseContactForm";
import { Button } from "@/src/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/src/components/ui/dialog";

function PurchaseInfoCard({ user }) {
    return (
        <div className="border border-bg-300 px-6 py-4 rounded-md mb-4 grid grid-cols-[1fr_auto] grid-rows-[auto_auto]">
            <h3 className="font-semibold text-lg mb-1">Shipping info</h3>
            <div className="flex flex-col col-start-1">
                <p>
                    {user.firstName} {user.lastName}
                </p>
                <p>{user.phoneNumber}</p>
                <div className="flex items-center gap-4">{user.address}</div>
            </div>

            <Dialog>
                <DialogTrigger asChild>
                    <Button className="primary-btn col-start-2 row-span-full my-auto">
                        Change
                    </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                        <DialogTitle>Update your shipping info</DialogTitle>
                    </DialogHeader>

                    <PurchaseContactForm user={user} />
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default PurchaseInfoCard;
