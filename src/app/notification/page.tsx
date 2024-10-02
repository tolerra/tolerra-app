import NotificationList from "@/components/notification/notification-list";

export default function NotificationPage() {
  return (
    <div className="flex justify-center mt-16">
      <div className="w-full max-w-4xl px-2">
        <h1 className="text-lg sm:text-2xl font-bold text-center mb-4">Newest Notifications</h1>
        <div className="border border-gray-200 p-6 rounded-lg">
          <NotificationList />
        </div>
      </div>
    </div>
  );
}
