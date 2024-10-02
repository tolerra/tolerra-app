"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { signOut, fetchUserProfile } from "@/app/actions/auth/auth-action";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

type UserProfile = {
    user: {
        id: number;
        name: string;
        email: string;
        role: string;
        created_at: string;
        updated_at: string;
    };
    disability_verification: boolean;
};

export default function ProfilePage() {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchProfile = async () => {
            const profileData = await fetchUserProfile();
            if (profileData) {
                setProfile(profileData);
            } else {
                router.push("/auth/sign-in");
            }
        };
        fetchProfile();
    }, [router]);

    const handleSignOut = async () => {
        await signOut();
        toast.success("Signed out successfully!");
        router.push("/auth/sign-in");
        router.refresh();
    };

    if (!profile) {
        return <div className="text-center">Loading...</div>;
    }

    const { user, disability_verification } = profile;

    return (
        <div className="container mx-auto px-4 py-8">
            <Card className="max-w-md mx-auto">
                <CardHeader>
                    <CardTitle>User Profile</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div>
                            <strong>Name:</strong> {user.name}
                        </div>
                        <div>
                            <strong>Email:</strong> {user.email}
                        </div>
                        <div>
                            <strong>Role:</strong> {user.role}
                        </div>
                        {user.role === "student" && (
                            <div>
                                <strong>Disability Verification:</strong>{" "}
                                {disability_verification
                                    ? "Validated"
                                    : "Pending"}
                                {!disability_verification && (
                                    <div className="outline-gray-700">
                                        <p className="text-sm text-red-500 mt-1">
                                            Note: While Pending, you cannot
                                            enroll in a course.
                                        </p>
                                    </div>
                                )}
                            </div>
                        )}
                        <div className="flex justify-center">
                            <Image
                                src="/assets/profile/profile-svg.svg"
                                alt="Profile Asset"
                                width={150}
                                height={150}
                                className="my-20"
                            />
                        </div>
                        <Button
                            className="w-full"
                            variant="destructive"
                            onClick={handleSignOut}
                        >
                            Sign Out
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
