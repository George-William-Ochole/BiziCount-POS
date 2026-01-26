
import { Card } from '@/components/ui/card';
import { taxSettings } from './mockData';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Button } from '@/components/ui/button';

export function SettingsTab() {
  return (
    <div className="space-y-4">
      <Card className="bg-[#1a1625] border-gray-800 p-6">
        <h2 className="text-xl font-bold mb-4">Company Information</h2>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold mb-2 block">Company Name</label>
            <Input
              defaultValue="RetailHub Inc."
              className="bg-[#0f0a1a] border-gray-700"
            />
          </div>
          <div>
            <label className="text-sm font-semibold mb-2 block">Business Address</label>
            <Textarea
              defaultValue="123 Business Ave, Suite 100, New York, NY 10001"
              className="bg-[#0f0a1a] border-gray-700"
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-semibold mb-2 block">Phone</label>
              <Input
                defaultValue="+1 (555) 123-4567"
                className="bg-[#0f0a1a] border-gray-700"
              />
            </div>
            <div>
              <label className="text-sm font-semibold mb-2 block">Email</label>
              <Input
                defaultValue="info@retailhub.com"
                className="bg-[#0f0a1a] border-gray-700"
              />
            </div>
          </div>
        </div>
      </Card>

      <Card className="bg-[#1a1625] border-gray-800 p-6">
        <h2 className="text-xl font-bold mb-4">Tax Settings</h2>
        <div className="space-y-3">
          {taxSettings.map((tax) => (
            <div
              key={tax.id}
              className="bg-[#0f0a1a] border border-gray-800 rounded-lg p-4"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{tax.name}</p>
                  <p className="text-sm text-gray-400">{tax.rate}% - {tax.type}</p>
                </div>
                <Switch defaultChecked={tax.status === 'active'} />
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="bg-[#1a1625] border-gray-800 p-6">
        <h2 className="text-xl font-bold mb-4">System Preferences</h2>
        <div className="space-y-4">
          {[
            { label: 'Email Notifications', description: 'Receive system notifications via email' },
            { label: 'Two-Factor Authentication', description: 'Require 2FA for admin accounts' },
            { label: 'Automatic Backups', description: 'Schedule daily automatic backups' },
            { label: 'Audit Logging', description: 'Track all system activities' },
          ].map((setting, idx) => (
            <div key={idx} className="flex items-center justify-between py-3 border-b border-gray-800 last:border-0">
              <div>
                <p className="font-semibold">{setting.label}</p>
                <p className="text-sm text-gray-400">{setting.description}</p>
              </div>
              <Switch defaultChecked={true} />
            </div>
          ))}
        </div>
      </Card>

      <div className="flex gap-3">
        <Button className="bg-purple-600 hover:bg-purple-700">
          Save All Changes
        </Button>
        <Button variant="outline" className="border-gray-700">
          Cancel
        </Button>
      </div>
    </div>
  );
}
