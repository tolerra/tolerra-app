import { getThreadById } from "@/app/actions/student/thread-action";
import CommentList from "@/components/thread/comment-list";
import ReplyForm from "@/components/thread/replay-form";

interface ThreadDetailPageProps {
    params: { id: string };
}

export default async function ThreadDetailPage({
    params,
}: ThreadDetailPageProps) {
    const threadId = parseInt(params.id);
    const threadData = await getThreadById(threadId);

    if (!threadData) {
        return <div>Thread not found</div>;
    }

    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-2">Thread #{threadData.id}</h1>
            <p className="text-gray-600 mb-4">User {threadData.user_id}</p>
            <p className="text-gray-500 mb-8">
                {new Date(threadData.created_at).toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                })}
            </p>
            <p className="text-lg mb-8">{threadData.content}</p>

            <ReplyForm threadId={threadId} />

            <CommentList comments={threadData.comments} />
        </div>
    );
}
