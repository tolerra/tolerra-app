"use client";
import React, { FormEvent, useState } from "react";
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
import { SignUp } from "@/app/actions/auth/auth-action";
import { useRouter } from "next/navigation";

export default function SignupForm() {
    const [role, setRole] = useState("student");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [passwordConfirmation, setPasswordConfirmation] = useState("");
    const [disabilityCard, setDisabilityCard] = useState<string | null>(null);
    const [fileName, setFileName] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = e.target.files?.[0];
        if (selectedFile) {
            setFileName(selectedFile.name);
            const reader = new FileReader();
            reader.onloadend = () => {
                const base64String = reader.result as string;
                setDisabilityCard(base64String.split(",")[1]);
            };
            reader.readAsDataURL(selectedFile);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        if (password !== passwordConfirmation) {
            setError("Passwords do not match");
            setLoading(false);
            return;
        }

        try {
            const signupData = {
                name,
                email,
                password,
                password_confirmation: passwordConfirmation,
                role,
                disability_card: disabilityCard,
            };

            const result = await SignUp(signupData);
            if (result.success) {
                router.push("/dashboard");
            } else {
                setError(
                    result.error || "An error occurred during registration"
                );
            }
        } catch (error) {
            console.log("Error:", error);
            setError("An unexpected error occurred");
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
                            <div className="mb-4">
                                <Label
                                    htmlFor="passwordConfirmation"
                                    className="block text-sm font-semibold text-[#071952] mb-1"
                                >
                                    Confirm Password
                                </Label>
                                <Input
                                    type="password"
                                    id="passwordConfirmation"
                                    value={passwordConfirmation}
                                    onChange={(e) =>
                                        setPasswordConfirmation(e.target.value)
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 bg-gray-100 text-black"
                                    placeholder="Confirm your password"
                                    required
                                />
                            </div>
                            <div>
                                <Label
                                    htmlFor="file"
                                    className="block text-sm font-semibold text-[#071952] mb-1"
                                >
                                    Upload Disability Card Photo
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
                                        Choose File
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
                            <div className="mb-4">
                                <Label
                                    htmlFor="passwordConfirmation"
                                    className="block text-sm font-semibold text-[#071952] mb-1"
                                >
                                    Confirm Password
                                </Label>
                                <Input
                                    type="password"
                                    id="passwordConfirmation"
                                    value={passwordConfirmation}
                                    onChange={(e) =>
                                        setPasswordConfirmation(e.target.value)
                                    }
                                    className="w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 bg-gray-100 text-black"
                                    placeholder="Confirm your password"
                                    required
                                />
                            </div>
                        </TabsContent>
                    </Tabs>
                </CardContent>
                {error && (
                    <p className="text-red-500 text-sm text-center">{error}</p>
                )}
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
