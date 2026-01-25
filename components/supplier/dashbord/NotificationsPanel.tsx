import { Button } from "@/components/ui/button";


interface Notification {
  id: number;
  type: string;
  title: string;
  message: string;
  time: string;
  unread: boolean;
}

interface NotificationsPanelProps {
  notifications: Notification[];
  show: boolean;
}

export function NotificationsPanel({ notifications, show }: NotificationsPanelProps) {
  if (!show) return null;

  return (
    <div className="absolute right-6 top-20 w-96 bg-[#1a1625] border border-gray-800 rounded-lg shadow-xl z-50">
      <div className="p-4 border-b border-gray-800 flex items-center justify-between">
        <h3 className="font-semibold">Notifications</h3>
        <Button variant="ghost" size="sm" className="text-xs text-gray-400">
          Mark all read
        </Button>
      </div>
      <div className="max-h-96 overflow-y-auto">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 border-b border-gray-800 hover:bg-gray-800/50 cursor-pointer ${
              notification.unread ? 'bg-gray-800/30' : ''
            }`}
          >
            <div className="flex items-start gap-3">
              <div
                className={`w-2 h-2 rounded-full mt-2 ${
                  notification.unread ? 'bg-pink-600' : 'bg-transparent'
                }`}
              ></div>
              <div className="flex-1">
                <p className="font-semibold text-sm">{notification.title}</p>
                <p className="text-sm text-gray-400">{notification.message}</p>
                <p className="text-xs text-gray-500 mt-1">{notification.time}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-3 border-t border-gray-800">
        <Button variant="ghost" size="sm" className="w-full text-sm text-pink-500">
          View all notifications
        </Button>
      </div>
    </div>
  );
}
