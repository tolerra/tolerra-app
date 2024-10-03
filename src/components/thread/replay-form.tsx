"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { addThreadComment } from "@/app/actions/student/thread-action";
import toast from "react-hot-toast";
import { getUserId, getUserToken } from "@/app/actions/auth/auth-action";
import { useRouter } from "next/navigation";

interface ReplyFormProps {
    threadId: number;
}

export default function ReplyForm({ threadId }: ReplyFormProps) {
    const [reply, setReply] = useState("");
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const token = await getUserToken();
            const userId = await getUserId();
            await addThreadComment(
                {
                    user_id: userId,
                    content: reply,
                },
                threadId,
                token
            );

            toast.success("Reply posted successfully!");
            setReply("");
            router.refresh();
        } catch (error) {
            toast.error("An error occurred while posting the reply");
            console.error("Error posting reply:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="mb-8">
            <textarea
                className="w-full p-2 mb-1 border rounded"
                rows={4}
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Post a reply"
                required
            />
            <Button type="submit" disabled={loading}>
                {loading ? "Posting..." : "Post Reply"}
            </Button>
        </form>
    );
}
