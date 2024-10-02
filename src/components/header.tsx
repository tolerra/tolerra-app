"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { isLoggedIn, getUserRole } from "@/app/actions/auth/auth-action";

export default function Header() {
    const [isSignedIn, setIsSignedIn] = useState(false);
    const [userRole, setUserRole] = useState<string | null>(null);

    useEffect(() => {
        const checkAuthStatus = async () => {
            const loggedIn = await isLoggedIn();
            setIsSignedIn(loggedIn);
            if (loggedIn) {
                const role = await getUserRole();
                setUserRole(role);
            }
        };

        checkAuthStatus();
    }, []);

    return (
        <header className="top-0 flex h-20 items-center bg-background px-4 sm:px-6 md:px-8 lg:px-16 xl:px-20">
            <Link
                href="/"
                className="flex-col items-center gap-2 overflow-hidden"
            >
                <div className="flex items-center gap-2">
                    <Image
                        src="/tolerra-logo.svg"
                        alt="Logo"
                        width={32}
                        height={32}
                        className="align-bottom"
                    />
                    <Image
                        src="/tolerra-text.svg"
                        alt="Logo"
                        width={100}
                        height={32}
                        className="hidden md:block align-bottom"
                    />
                </div>
            </Link>
            <div className="ml-auto flex space-x-4 items-center">
                {isSignedIn ? (
                    <>
                        <Link
                            href={
                                userRole === "instructor"
                                    ? "/instructor/dashboard"
                                    : "/dashboard"
                            }
                        >
                            <p className={`font-medium`}>Dashboard</p>
                        </Link>
                        {userRole === "instructor" && (
                            <p>logged as instructor</p>
                        )}
                        {userRole === "admin" && <p>logged as admin</p>}
                        <Link href="/profile">
                            <Image
                                src="/assets/profile/default-profile.png"
                                alt="Profile"
                                width={30}
                                height={30}
                                className="rounded-full cursor-pointer"
                            />
                        </Link>
                    </>
                ) : (
                    <>
                        <Link href="/auth/sign-in">
                            <Button className="" variant={"outline"}>
                                Sign In
                            </Button>
                        </Link>
                        <Link href="/auth/sign-up">
                            <Button className="w-32">Get Started</Button>
                        </Link>
                    </>
                )}
            </div>
        </header>
    );
}
