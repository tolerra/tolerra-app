"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

interface ReplyFormProps {
    threadId: number;
}

export default function ReplyForm({ threadId }: ReplyFormProps) {
    const [reply, setReply] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log(`Submitting reply to thread ${threadId}: ${reply}`);
        setReply("");
    };

    return (
        <form onSubmit={handleSubmit} className="mb-8">
            <textarea
                className="w-full p-2 mb-1 border rounded"
                rows={4}
                value={reply}
                onChange={(e) => setReply(e.target.value)}
                placeholder="Post a reply"
            />
            <Button>Post Reply</Button>
        </form>
    );
}
