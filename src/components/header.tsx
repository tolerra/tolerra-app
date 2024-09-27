import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Header() {
    return (
        <header className="top-0 flex h-16 items-center gap-4 bg-background px-2 sm:px-4 md:px-6 lg:px-12 lg:py-10 xl:px-20">
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
                        className="align-bottom"
                    />
                </div>
            </Link>
            <div className="ml-auto flex space-x-4 items-center">
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
            </div>
        </header>
    );
}
