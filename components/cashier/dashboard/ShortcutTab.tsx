
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { keyboardShortcuts } from './mockData';

export function ShortcutsTab() {
  return (
    <div className="space-y-4">
      <Card className="bg-[#1a1625] border-gray-800 p-6">
        <h2 className="text-xl font-bold mb-4">Keyboard Shortcuts</h2>
        <p className="text-gray-400 mb-6">
          Use these keyboard shortcuts to speed up your checkout process
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {keyboardShortcuts.map((shortcut, idx) => (
            <div
              key={idx}
              className="bg-[#0f0a1a] border border-gray-800 rounded-lg p-4 hover:border-green-500/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <span className="text-gray-400">{shortcut.action}</span>
                <Badge className="bg-green-600 font-mono">{shortcut.key}</Badge>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="bg-[#1a1625] border-gray-800 p-6">
        <h2 className="text-xl font-bold mb-4">Quick Tips</h2>
        <div className="space-y-3">
          <div className="bg-[#0f0a1a] border border-gray-800 rounded-lg p-4">
            <h3 className="font-semibold mb-2">🔍 Fast Product Search</h3>
            <p className="text-sm text-gray-400">
              Start typing the product name or barcode in the search box. Press Enter to add the first result to cart.
            </p>
          </div>
          <div className="bg-[#0f0a1a] border border-gray-800 rounded-lg p-4">
            <h3 className="font-semibold mb-2">💳 Quick Payment</h3>
            <p className="text-sm text-gray-400">
              Use F5-F7 for instant payment method selection. No need to click payment buttons.
            </p>
          </div>
          <div className="bg-[#0f0a1a] border border-gray-800 rounded-lg p-4">
            <h3 className="font-semibold mb-2">📱 Offline Mode</h3>
            <p className="text-sm text-gray-400">
              When internet is down, transactions are saved locally and will auto-sync when connection is restored.
            </p>
          </div>
          <div className="bg-[#0f0a1a] border border-gray-800 rounded-lg p-4">
            <h3 className="font-semibold mb-2">🎯 Barcode Scanner</h3>
            <p className="text-sm text-gray-400">
              Keep your cursor in the barcode field. Scan products directly without clicking anywhere.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
