import { Filter, Download, Eye } from 'lucide-react';
import { auditLogs } from './mockData';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export function AuditTab() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Select defaultValue="all">
            <SelectTrigger className="w-40 bg-[#1a1625] border-gray-700">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Actions</SelectItem>
              <SelectItem value="created">Created</SelectItem>
              <SelectItem value="updated">Updated</SelectItem>
              <SelectItem value="deleted">Deleted</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="border-gray-700">
            <Filter className="w-4 h-4 mr-2" />
            Advanced Filter
          </Button>
        </div>
        <Button variant="outline" className="border-gray-700">
          <Download className="w-4 h-4 mr-2" />
          Export Logs
        </Button>
      </div>

      <Card className="bg-[#1a1625] border-gray-800 p-6">
        <h2 className="text-xl font-bold mb-4">Audit Trail</h2>
        <div className="space-y-3">
          {auditLogs.map((log) => (
            <div
              key={log.id}
              className="bg-[#0f0a1a] border border-gray-800 rounded-lg p-4 hover:border-purple-500/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <div className="w-10 h-10 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <span className="text-xs font-semibold">
                      {log.user.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold">{log.user}</p>
                    <p className="text-sm text-gray-400">
                      <span className="text-purple-400">{log.action}</span> - {log.target}
                    </p>
                    <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                      <span>{log.timestamp}</span>
                      <span>•</span>
                      <span>IP: {log.ip}</span>
                    </div>
                  </div>
                </div>
                <Button size="sm" variant="outline" className="border-gray-700">
                  <Eye className="w-4 h-4 mr-1" />
                  Details
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
