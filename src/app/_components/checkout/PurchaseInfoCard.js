"use client";

import { useState } from "react";

import ErrorMsg from "@/src/app/_components/shared/ErrorMsg";
import { Button } from "@/src/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/src/components/ui/dialog";
import { MapPin, Phone, User } from "lucide-react";
import PersonalInfoEditForm from "@/src/app/_components/account/personalInfo/PersonalInfoEditForm";

function PurchaseInfoCard({ user }) {
    const [open, setOpen] = useState(false);

    return (
        <div className="border border-text-700 px-6 py-4 rounded-md mb-4 grid grid-cols-[1fr_auto] grid-rows-[auto_auto] gap-2 items-center">
            <h3 className="font-semibold text-lg mb-2">Shipping info</h3>
            <div className="flex flex-col col-start-1 gap-2">
                <div className="flex items-center gap-2">
                    <User size={20} className="font-light" />
                    <span>
                        {user.firstName} {user.lastName}
                    </span>
                </div>
                <div className="flex items-center gap-4">
                    {!user.phoneNumber ? (
                        <ErrorMsg className="flex-row">
                            No phone number found. Please add your phone number
                            to contact you.
                        </ErrorMsg>
                    ) : (
                        <>
                            <Phone size={20} />
                            <span>{user.phoneNumber}</span>
                        </>
                    )}
                </div>
                <div className="flex items-center gap-4">
                    {!user.address ? (
                        <ErrorMsg className="flex-row">
                            No address found. Please add your address
                        </ErrorMsg>
                    ) : (
                        <>
                            <MapPin size={20} />
                            <span>{user.address}</span>
                        </>
                    )}
                </div>
            </div>

            <Dialog open={open} onOpenChange={(isOpen) => setOpen(!isOpen)}>
                <Button
                    onClick={() => setOpen(true)}
                    className="primary-btn col-start-2 row-span-full my-auto"
                >
                    Change
                </Button>
                <DialogContent className="w-full max-w-[700px]">
                    <DialogHeader>
                        <DialogTitle>Update your shipping info</DialogTitle>
                    </DialogHeader>

                    <PersonalInfoEditForm
                        user={user}
                        path="/checkout"
                        onOpenChange={setOpen}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
}

export default PurchaseInfoCard;
