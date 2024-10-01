import ThreadList from "@/components/thread/thread-list";

export default function ThreadPage() {
  return (
    <div className="min-h-[85vh] flex flex-col justify-between">
      <main className="flex-grow flex flex-col justify-start items-center p-6 space-y-8 mt-12">
        <h1 className="text-3xl font-medium text-center">Discussions</h1>
        <ThreadList />
      </main>
    </div>
  );
}
