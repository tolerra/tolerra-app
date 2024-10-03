"use client";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Navbar({
    isSignedIn,
    userRole,
}: {
    isSignedIn: boolean;
    userRole: string | null;
}) {
    console.log("APAKAH ANDA LOGIN:", isSignedIn);

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
                                    : "/student/dashboard"
                            }
                        >
                            <p className={`font-medium`}>Dashboard</p>
                        </Link>
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
                        <Link href="/dashboard">
                            <Button className="w-32">Get Started</Button>
                        </Link>
                    </>
                )}
            </div>
        </header>
    );
}
