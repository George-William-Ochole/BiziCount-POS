import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";


export function SettingsTab() {
  return (
    <div className="space-y-4">
      <Card className="bg-[#1a1625] border-gray-800 p-6">
        <h2 className="text-xl font-bold mb-4">Till Settings</h2>
        <div className="space-y-6">
          <div>
            <label className="text-sm font-semibold mb-2 block">Till Number</label>
            <Input
              defaultValue="Till #3"
              className="bg-[#0f0a1a] border-gray-700"
              disabled
            />
          </div>
          <div>
            <label className="text-sm font-semibold mb-2 block">Cashier Name</label>
            <Input
              defaultValue="Cashier Sarah"
              className="bg-[#0f0a1a] border-gray-700"
            />
          </div>
          <div>
            <label className="text-sm font-semibold mb-2 block">Receipt Printer</label>
            <Input
              defaultValue="EPSON TM-T20"
              className="bg-[#0f0a1a] border-gray-700"
            />
          </div>
        </div>
      </Card>

      <Card className="bg-[#1a1625] border-gray-800 p-6">
        <h2 className="text-xl font-bold mb-4">Preferences</h2>
        <div className="space-y-4">
          {[
            { label: 'Auto-print receipts', description: 'Automatically print after each transaction' },
            { label: 'Sound effects', description: 'Play sounds for scans and transactions' },
            { label: 'Offline mode', description: 'Enable offline transaction processing' },
            { label: 'Customer display', description: 'Show prices on customer-facing display' },
          ].map((setting, idx) => (
            <div key={idx} className="flex items-center justify-between py-3 border-b border-gray-800 last:border-0">
              <div>
                <p className="font-semibold">{setting.label}</p>
                <p className="text-sm text-gray-400">{setting.description}</p>
              </div>
              <Switch defaultChecked={idx < 2} />
            </div>
          ))}
        </div>
      </Card>

      <div className="flex gap-3">
        <Button className="bg-green-600 hover:bg-green-700">
          Save Changes
        </Button>
        <Button variant="outline" className="border-gray-700">
          Cancel
        </Button>
      </div>
    </div>
  );
}
