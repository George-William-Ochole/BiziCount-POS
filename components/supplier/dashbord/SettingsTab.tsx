import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";


export function SettingsTab() {
  return (
    <div className="space-y-4">
      <Card className="bg-[#1a1625] border-gray-800 p-6">
        <h2 className="text-xl font-bold mb-4">Account Settings</h2>
        <div className="space-y-6">
          <div>
            <label className="text-sm font-semibold mb-2 block">Company Name</label>
            <Input
              defaultValue="Supplier Pro"
              className="bg-[#0f0a1a] border-gray-700"
            />
          </div>
          <div>
            <label className="text-sm font-semibold mb-2 block">Email</label>
            <Input
              defaultValue="supplier@example.com"
              className="bg-[#0f0a1a] border-gray-700"
            />
          </div>
          <div>
            <label className="text-sm font-semibold mb-2 block">Phone</label>
            <Input
              defaultValue="+1 (555) 123-4567"
              className="bg-[#0f0a1a] border-gray-700"
            />
          </div>
          <div>
            <label className="text-sm font-semibold mb-2 block">Address</label>
            <Textarea
              defaultValue="123 Supply Street, Business District, NY 10001"
              className="bg-[#0f0a1a] border-gray-700"
              rows={3}
            />
          </div>
        </div>
      </Card>

      <Card className="bg-[#1a1625] border-gray-800 p-6">
        <h2 className="text-xl font-bold mb-4">Notification Preferences</h2>
        <div className="space-y-4">
          {[
            { label: 'New Order Notifications', description: 'Get notified when you receive new orders', default: true },
            { label: 'Payment Updates', description: 'Receive alerts for payment confirmations', default: true },
            { label: 'Low Stock Alerts', description: 'Get notified when products are running low', default: true },
            { label: 'Customer Messages', description: 'Receive notifications for new messages', default: true },
            { label: 'Performance Reports', description: 'Weekly performance summary emails', default: false },
          ].map((setting, idx) => (
            <div key={idx} className="flex items-center justify-between py-3 border-b border-gray-800 last:border-0">
              <div>
                <p className="font-semibold">{setting.label}</p>
                <p className="text-sm text-gray-400">{setting.description}</p>
              </div>
              <Switch defaultChecked={setting.default} />
            </div>
          ))}
        </div>
      </Card>

      <div className="flex gap-3">
        <Button className="bg-pink-600 hover:bg-pink-700">
          Save Changes
        </Button>
        <Button variant="outline" className="border-gray-700">
          Cancel
        </Button>
      </div>
    </div>
  );
}
