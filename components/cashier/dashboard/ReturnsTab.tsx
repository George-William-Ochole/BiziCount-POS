import { CheckCircle, X, Search } from 'lucide-react';
import { pendingReturns } from './mockData';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';

export function ReturnsTab() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="relative flex-1 max-w-md">
          <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            placeholder="Search by transaction ID..."
            className="pl-10 bg-[#1a1625] border-gray-700"
          />
        </div>
        <Button className="bg-green-600 hover:bg-green-700">
          Process New Return
        </Button>
      </div>

      <Card className="bg-[#1a1625] border-gray-800 p-6">
        <h2 className="text-xl font-bold mb-4">Pending Returns</h2>
        <div className="space-y-3">
          {pendingReturns.map((returnItem) => (
            <div
              key={returnItem.id}
              className="bg-[#0f0a1a] border border-gray-800 rounded-lg p-4"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold text-lg">{returnItem.id}</p>
                  <p className="text-sm text-gray-400">Transaction: {returnItem.txnId}</p>
                  <p className="text-sm text-gray-400">Customer: {returnItem.customer}</p>
                </div>
                <Badge variant="outline">{returnItem.status}</Badge>
              </div>
              
              <div className="grid grid-cols-3 gap-4 mb-3">
                <div>
                  <p className="text-gray-400 text-sm">Items</p>
                  <p className="font-semibold">{returnItem.items}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Amount</p>
                  <p className="font-semibold text-red-400">${returnItem.amount}</p>
                </div>
                <div>
                  <p className="text-gray-400 text-sm">Reason</p>
                  <p className="font-semibold text-xs">{returnItem.reason}</p>
                </div>
              </div>

              <div className="flex gap-2">
                <Button size="sm" className="bg-green-600 hover:bg-green-700 flex-1">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  Approve Return
                </Button>
                <Button size="sm" variant="destructive" className="flex-1">
                  <X className="w-4 h-4 mr-1" />
                  Reject
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>

      <Card className="bg-[#1a1625] border-gray-800 p-6">
        <h2 className="text-xl font-bold mb-4">Process New Return</h2>
        <div className="space-y-4">
          <div>
            <label className="text-sm font-semibold mb-2 block">Transaction ID</label>
            <Input
              placeholder="Enter transaction ID"
              className="bg-[#0f0a1a] border-gray-700"
            />
          </div>
          <div>
            <label className="text-sm font-semibold mb-2 block">Reason for Return</label>
            <Textarea
              placeholder="Enter reason..."
              className="bg-[#0f0a1a] border-gray-700"
              rows={3}
            />
          </div>
          <div className="bg-orange-500/20 border border-orange-500 rounded-lg p-3">
            <p className="text-sm text-orange-400">
              ⚠️ Manager approval required for returns over $50
            </p>
          </div>
          <Button className="w-full bg-green-600 hover:bg-green-700">
            Submit Return Request
          </Button>
        </div>
      </Card>
    </div>
  );
}
