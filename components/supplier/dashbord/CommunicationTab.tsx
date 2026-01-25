import { useState } from 'react';
import { MessageSquare, Upload } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { storeManagers } from './MockData';


export function CommunicationTab() {
  const [messageText, setMessageText] = useState('');

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="bg-[#1a1625] border-gray-800 p-6">
          <h2 className="text-xl font-bold mb-4">Store Managers</h2>
          <div className="space-y-3">
            {storeManagers.map((manager, idx) => (
              <div
                key={idx}
                className="bg-[#0f0a1a] border border-gray-800 rounded-lg p-3 hover:border-pink-500/50 transition-colors cursor-pointer"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
                        <span className="text-sm font-semibold">
                          {manager.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div
                        className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-[#0f0a1a] ${
                          manager.status === 'online' ? 'bg-green-500' : 'bg-gray-500'
                        }`}
                      ></div>
                    </div>
                    <div>
                      <p className="font-semibold">{manager.name}</p>
                      <p className="text-sm text-gray-400">{manager.store}</p>
                    </div>
                  </div>
                  {manager.unread > 0 && (
                    <Badge className="bg-pink-600">{manager.unread}</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="lg:col-span-2 bg-[#1a1625] border-gray-800 p-6">
          <h2 className="text-xl font-bold mb-4">Message Center</h2>
          <div className="space-y-4">
            <div className="bg-[#0f0a1a] rounded-lg p-4 h-80 overflow-y-auto space-y-3">
              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs">JS</span>
                </div>
                <div className="bg-gray-800 rounded-lg p-3 max-w-xs">
                  <p className="text-sm">Hi! Can you confirm the delivery time for order PO-001?</p>
                  <p className="text-xs text-gray-400 mt-1">10:30 AM</p>
                </div>
              </div>

              <div className="flex gap-3 justify-end">
                <div className="bg-pink-600 rounded-lg p-3 max-w-xs">
                  <p className="text-sm">Yes, we&apos;ll have it delivered by tomorrow 2 PM.</p>
                  <p className="text-xs text-pink-200 mt-1">10:35 AM</p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                  <span className="text-xs">JS</span>
                </div>
                <div className="bg-gray-800 rounded-lg p-3 max-w-xs">
                  <p className="text-sm">Perfect! Thank you.</p>
                  <p className="text-xs text-gray-400 mt-1">10:36 AM</p>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <Textarea
                placeholder="Type your message..."
                className="bg-[#0f0a1a] border-gray-700 resize-none"
                rows={3}
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
              />
              <div className="flex gap-2">
                <Button className="bg-pink-600 hover:bg-pink-700 flex-1">
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
                <Button variant="outline" className="border-gray-700">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Document
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
