"use client";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signIn } from "@/app/actions/auth/auth-action";
import toast from "react-hot-toast";

export default function SignIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const result = await signIn(email, password);
        if (result.success) {
            toast.success("Signed in successfully!");
            router.push("/");
        } else {
            setError(result.error || "An error occurred");
        }
    };

    return (
        <Card className="w-[500px]">
            <CardHeader>
                <CardTitle className="text-2xl font-bold mb-8 mt-6 text-center text-black">
                    Login
                </CardTitle>
            </CardHeader>
            <CardContent className="max-w-md w-full mx-auto items-center">
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <Label
                            htmlFor="email"
                            className="block text-sm font-semibold text-[#071952] mb-2"
                        >
                            Email
                        </Label>
                        <Input
                            type="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 bg-gray-100 text-black"
                            placeholder="Masukkan Email"
                            required
                        />
                    </div>
                    <div>
                        <Label
                            htmlFor="password"
                            className="block text-sm font-semibold text-[#071952] mb-2"
                        >
                            Sandi
                        </Label>
                        <Input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 bg-gray-100 text-black mb-8"
                            placeholder="Masukkan Kata Sandi"
                            required
                        />
                    </div>
                    {error && <p className="text-red-500 text-sm">{error}</p>}
                    <div className="pt-4">
                        <Button
                            type="submit"
                            className="w-full bg-[#071952] text-white py-3 px-4 rounded-md hover:bg-[#31406f] font-semibold"
                        >
                            Masuk
                        </Button>
                    </div>
                </form>
            </CardContent>
            <CardFooter className="flex justify-center">
                <CardDescription className="text-center">
                    Belum punya akun?{" "}
                    <Link
                        href="/auth/sign-up"
                        className="text-[#071952] hover:underline"
                    >
                        Sign up
                    </Link>
                </CardDescription>
            </CardFooter>
        </Card>
    );
}
