import { Comment } from "@/app/type";

interface CommentListProps {
    comments?: Comment[];
}

export default function CommentList({ comments }: CommentListProps) {
    if (!comments || comments.length === 0) {
        return (
            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Comments</h2>
                <p>No comments yet.</p>
            </div>
        );
    }

    return (
        <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Comments</h2>
            {comments.map((comment) => (
                <div key={comment.id} className="mb-4 p-4 bg-gray-100 rounded">
                    <p className="text-sm text-gray-500 mb-1 mt-2">
                        {new Date(comment.created_at).toLocaleDateString(
                            "en-US",
                            {
                                year: "numeric",
                                month: "long",
                                day: "numeric",
                            }
                        )}
                    </p>
                    <p className="text-gray-800">{comment.content}</p>
                </div>
            ))}
        </div>
    );
}
