import ThreadList from "@/components/thread/thread-list";
import {
    getAllCategories,
    getThreads,
} from "@/app/actions/student/thread-action";
import AddThreadDialog from "@/components/thread/add-thread-dialog";
import { getUserId } from "@/app/actions/auth/auth-action";

export default async function ThreadPage() {
    const threads = await getThreads();
    const categories = await getAllCategories();
    const userId = await getUserId();

    return (
        <div className="min-h-[85vh] flex flex-col">
            <div className="flex justify-end p-4">
                <AddThreadDialog userId={userId} categories={categories} />
            </div>
            <main className="flex-grow flex flex-col justify-start items-center p-6 space-y-8">
                <h1 className="text-3xl font-medium text-center">
                    Discussions
                </h1>
                <ThreadList initialThreads={threads} />
            </main>
        </div>
    );
}
