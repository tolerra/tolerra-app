"use client";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    Select,
    SelectContent,
    SelectTrigger,
    SelectValue,
    SelectItem,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { useState } from "react";
import { addThread } from "@/app/actions/student/thread-action";
import { useRouter } from "next/navigation";
import { getUserToken } from "@/app/actions/auth/auth-action";
import { Category } from "@/app/type";

interface AddThreadDialog {
    userId: number;
    categories: Category[];
}

export default function AddThreadDialog({
    userId,
    categories,
}: AddThreadDialog) {
    const [loading, setLoading] = useState(false);
    const [isOpen, setIsOpen] = useState(false);
    const router = useRouter();

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setLoading(true);

        const form = event.currentTarget;
        const formData = new FormData(form);

        try {
            const token = await getUserToken();
            await addThread(
                {
                    category_id: 1,
                    user_id: userId,
                    title: formData.get("title") as string,
                    content: formData.get("content") as string,
                },
                token
            );

            toast.success("Thread created successfully!");
            setIsOpen(false);
            router.refresh();
        } catch (error) {
            toast.error("An error occurred while creating the thread");
            console.error("Error creating new thread:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button>Add Thread</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle className="text-primary font-semibold text-xl text-center">
                        Add Thread
                    </DialogTitle>
                </DialogHeader>
                <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 items-center gap-2">
                        <Label htmlFor="title" className="text-left">
                            Thread Title
                        </Label>
                        <input
                            id="title"
                            name="title"
                            className="w-full p-2 mb-1 border rounded"
                            required
                        />
                    </div>
                    <div className="flex items-center gap-2">
                        <Select name="category_id">
                            <SelectTrigger id="category_id">
                                <SelectValue placeholder="Select Category" />
                            </SelectTrigger>
                            <SelectContent position="popper">
                                {categories.map((category: Category) => (
                                    <SelectItem
                                        value={category.id.toString()}
                                        key={category.id}
                                    >
                                        {category.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="grid grid-cols-1 items-center gap-2">
                        <Label htmlFor="content" className="text-left">
                            Thread Content
                        </Label>
                        <textarea
                            id="content"
                            name="content"
                            className="w-full p-2 mb-1 border rounded"
                            required
                        />
                    </div>
                    <div className="flex justify-end">
                        <Button type="submit" disabled={loading}>
                            {loading ? "Creating..." : "Create Thread"}
                        </Button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
}
