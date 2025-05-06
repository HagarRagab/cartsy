"use client";

import { useState } from "react";

import { useAuth } from "@/app/_context/AuthContext";
import { Button } from "@/components/ui/button";
import PersonalInfoGrid from "@/app/_components/account/personalInfo/PersonalInfoGrid";
import PersonalInfoEditForm from "@/app/_components/account/personalInfo/PersonalInfoEditForm";

function Page() {
    const { user } = useAuth();
    const [isEditing, setIsEditing] = useState(false);

    return (
        <div>
            <h1 className="text-2xl font-semibold mb-3">
                Personal Information
            </h1>
            <p className="text-text-300 text-sm">
                Manage your personal information, including phone numbers and
                email address where you can be contacted.
            </p>
            <PersonalInfoGrid user={user} />
            <div className="w-full text-right">
                <Button
                    className={`mt-8 w-20 ${
                        isEditing ? "cancel-btn" : "primary-btn"
                    }`}
                    onClick={() => setIsEditing((editing) => !editing)}
                >
                    {isEditing ? "Cancel" : "Edit"}
                </Button>
            </div>
            {isEditing && <PersonalInfoEditForm user={user} />}
        </div>
    );
}

export default Page;
