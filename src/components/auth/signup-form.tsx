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
import Link from "next/link";
import { FormEvent, useState } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

export default function SignupForm() {
    const [loading, setLoading] = useState(false);
    const [role, setRole] = useState("user");

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target as HTMLFormElement);
        const role = formData.get("role") as string;
        console.log(role);
    };

    const [fileName, setFileName] = useState("No file selected");

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFileName(file.name);
        } else {
            setFileName("No file selected");
        }
    };
    return (
        <Card className="w-full max-w-[500px] mx-auto p-4 md:p-6 lg:w-[500px]">
            <CardHeader>
                <CardTitle className="text-center pb-2 mt-6">Sign Up</CardTitle>
                <CardDescription className="text-center">
                    Already have an account?{" "}
                    <Link
                        href="/auth/sign-in"
                        className="text-[#071952] hover:underline"
                    >
                        log in
                    </Link>
                </CardDescription>
            </CardHeader>
            <form onSubmit={handleSubmit}>
                <CardContent>
                    <Tabs
                        className="flex w-full justify-center flex-col"
                        value={role}
                        onValueChange={setRole}
                    >
                        <TabsList className="justify-center flex w-full mb-6">
                            <TabsTrigger value="user">User</TabsTrigger>
                            <TabsTrigger value="instructor">
                                Instructor
                            </TabsTrigger>
                        </TabsList>
                        <TabsContent value="user">
                            <Input type="hidden" name="role" value={role} />
                            <form>
                                <div className="mb-4">
                                    <Label
                                        htmlFor="nama"
                                        className="block text-sm font-semibold text-[#071952] mb-1"
                                    >
                                        Nama Lengkap
                                    </Label>
                                    <Input
                                        type="text"
                                        id="nama"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 bg-gray-100 text-black"
                                        placeholder="Nama"
                                    />
                                </div>
                                <div className="mb-4">
                                    <Label
                                        htmlFor="email"
                                        className="block text-sm font-semibold text-[#071952] mb-1"
                                    >
                                        Email
                                    </Label>
                                    <Input
                                        type="email"
                                        id="email"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 bg-gray-100 text-black"
                                        placeholder="Masukkan email"
                                    />
                                </div>
                                <div className="mb-5">
                                    <Label
                                        htmlFor="password"
                                        className="block text-sm font-semibold text-[#071952] mb-1"
                                    >
                                        Sandi
                                    </Label>
                                    <Input
                                        type="password"
                                        id="password"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 bg-gray-100 text-black"
                                        placeholder="Masukkan kata sandi"
                                    />
                                </div>
                                <div>
                                    <Label
                                        htmlFor="file"
                                        className="block text-sm font-semibold text-[#071952] mb-1"
                                    >
                                        Unggah Kartu Disabilitas
                                    </Label>
                                    <div className="flex">
                                        <input
                                            type="text"
                                            readOnly
                                            className="w-full flex-grow px-3 py-2 border border-gray-300 rounded-l-md placeholder-gray-400 bg-gray-100 text-gray-400"
                                            value={fileName}
                                            placeholder="No file selected"
                                        />
                                        <Label
                                            htmlFor="file-upload"
                                            className="px-4 py-2 bg-white text-black rounded-r-md hover:bg-gray-100 text-sm border border-gray-300 flex justify-center items-center whitespace-nowrap cursor-pointer"
                                        >
                                            Upload PDF
                                        </Label>
                                        <Input
                                            id="file-upload"
                                            type="file"
                                            accept="application/pdf"
                                            className="hidden"
                                            onChange={handleFileChange}
                                        />
                                    </div>
                                </div>
                            </form>
                        </TabsContent>

                        <TabsContent value="instructor">
                            <Input type="hidden" name="role" value={role} />
                            <form>
                                <div className="mb-4">
                                    <Label
                                        htmlFor="nama"
                                        className="block text-sm font-semibold text-[#071952] mb-1"
                                    >
                                        Nama Lengkap
                                    </Label>
                                    <Input
                                        type="text"
                                        id="nama"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 bg-gray-100 text-black"
                                        placeholder="Nama"
                                    />
                                </div>
                                <div className="mb-4">
                                    <Label
                                        htmlFor="email"
                                        className="block text-sm font-semibold text-[#071952] mb-1"
                                    >
                                        Email
                                    </Label>
                                    <Input
                                        type="email"
                                        id="email"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 bg-gray-100 text-black"
                                        placeholder="Masukkan email"
                                    />
                                </div>
                                <div className="mb-[85px]">
                                    <Label
                                        htmlFor="password"
                                        className="block text-sm font-semibold text-[#071952] mb-1"
                                    >
                                        Sandi
                                    </Label>
                                    <Input
                                        type="password"
                                        id="password"
                                        className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 bg-gray-100 text-black"
                                        placeholder="Masukkan kata sandi"
                                    />
                                </div>
                            </form>
                        </TabsContent>
                    </Tabs>
                </CardContent>
                <CardFooter className="flex flex-col items-center">
                    <Button
                        type="submit"
                        className="w-full max-w-[420px] md:w-[420px]"
                        disabled={loading}
                    >
                        Create Account
                    </Button>
                    <CardDescription className="mt-6 w-full max-w-[420px] text-xs text-gray-600 text-center">
                        By clicking &apos;Continue&apos;, you acknowledge that
                        you have read and accept the{" "}
                        <a href="#" className="font-bold">
                            Terms of Service
                        </a>{" "}
                        and{" "}
                        <a href="#" className="font-bold">
                            Privacy Policy
                        </a>
                        .
                    </CardDescription>
                </CardFooter>
            </form>
        </Card>
    );
}
