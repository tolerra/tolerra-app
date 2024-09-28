"use client";
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
import React from "react";
import Link from "next/link";

export default function SignIn() {
    return (
        <Card className="w-[500px]">
            <CardHeader>
                <CardTitle className="text-2xl font-bold mb-8 mt-6 text-center text-black">
                    Login
                </CardTitle>
            </CardHeader>
            <CardContent className="max-w-md w-full mx-auto items-center">
                <form className="space-y-6">
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
                            className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 bg-gray-100 text-black"
                            placeholder="Masukkan Email"
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
                            className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 bg-gray-100 text-black mb-36"
                            placeholder="Masukkan Kata Sandi"
                        />
                    </div>
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
