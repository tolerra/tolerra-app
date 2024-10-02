"use client";
import React, { FormEvent, useState } from "react";
import axios from "axios";
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
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { getCsrfToken } from "@/app/actions/auth/auth-action";

export default function SignupForm() {
    const [role, setRole] = useState("student");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [fileName, setFileName] = useState("");
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFile(selectedFile);
            setFileName(selectedFile.name);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const csrfToken = await getCsrfToken();

            const formData = new FormData();
            formData.append("name", name);
            formData.append("email", email);
            formData.append("password", password);
            formData.append("role", role);

            if (role === "student" && file) {
                formData.append("disability_card", file);
            }

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_BASE_URL}/register/${role}`,
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        "X-XSRF-TOKEN": csrfToken,
                    },
                    withCredentials: true,
                }
            );
            console.log("Registration successful:", response.data);
            alert(
                "Registration successful! Please wait for admin verification."
            );
        } catch (error) {
            console.error("Error during registration:", error);
            if (axios.isAxiosError(error) && error.response) {
                alert(
                    `Error during registration: ${error.response.status} - ${error.response.statusText}`
                );
            } else {
                alert("Error during registration. Please try again.");
            }
        } finally {
            setLoading(false);
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
                            <TabsTrigger value="student">Student</TabsTrigger>
                            <TabsTrigger value="instructor">
                                Instructor
                            </TabsTrigger>
                        </TabsList>

                        {/* STUDENT */}
                        <TabsContent value="student">
                            <Input type="hidden" name="role" value={role} />
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
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 bg-gray-100 text-black"
                                    placeholder="Nama"
                                    required
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
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 bg-gray-100 text-black"
                                    placeholder="Masukkan email"
                                    required
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
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 bg-gray-100 text-black"
                                    placeholder="Masukkan kata sandi"
                                    required
                                />
                            </div>
                            <div>
                                <Label
                                    htmlFor="file"
                                    className="block text-sm font-semibold text-[#071952] mb-1"
                                >
                                    Unggah Foto Kartu Disabilitas
                                </Label>
                                <div className="flex">
                                    <input
                                        type="text"
                                        readOnly
                                        className="w-full flex-grow px-3 py-2 border border-gray-300 rounded-l-md placeholder-gray-400 bg-gray-100 text-gray-400"
                                        value={fileName}
                                        placeholder="No file selected"
                                        required
                                    />
                                    <Label
                                        htmlFor="file-upload"
                                        className="px-4 py-2 bg-white text-black rounded-r-md hover:bg-gray-100 text-sm border border-gray-300 flex justify-center items-center whitespace-nowrap cursor-pointer"
                                    >
                                        PNG
                                    </Label>
                                    <Input
                                        id="file-upload"
                                        type="file"
                                        accept=".png, .jpeg, .jpg"
                                        className="hidden"
                                        onChange={handleFileChange}
                                        required
                                    />
                                </div>
                            </div>
                        </TabsContent>

                        {/* INSTRUCTOR */}
                        <TabsContent value="instructor">
                            <Input type="hidden" name="role" value={role} />
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
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 bg-gray-100 text-black"
                                    placeholder="Nama"
                                    required
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
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 bg-gray-100 text-black"
                                    placeholder="Masukkan email"
                                    required
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
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 bg-gray-100 text-black"
                                    placeholder="Masukkan kata sandi"
                                    required
                                />
                            </div>
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
                    <CardDescription className="mt-6 w-full max-w-[420px] text-center">
                        By signing up, you agree to our{" "}
                        <Link
                            href="#"
                            className="text-[#071952] hover:underline"
                        >
                            Terms and Conditions
                        </Link>{" "}
                        and{" "}
                        <Link
                            href="#"
                            className="text-[#071952] hover:underline"
                        >
                            Privacy Policy
                        </Link>
                        .
                    </CardDescription>
                </CardFooter>
            </form>
        </Card>
    );
}
