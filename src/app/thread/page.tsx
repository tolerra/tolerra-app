import ThreadList from "@/components/thread/thread-list";
import { getThreads } from "@/app/actions/student/thread-action";

export default async function ThreadPage() {
    const threads = await getThreads();

    return (
        <div className="min-h-[85vh] flex flex-col justify-between">
            <main className="flex-grow flex flex-col justify-start items-center p-6 space-y-8 mt-12">
                <h1 className="text-3xl font-medium text-center">
                    Discussions
                </h1>
                <ThreadList initialThreads={threads} />
            </main>
        </div>
    );
}
