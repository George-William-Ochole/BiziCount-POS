import { Database, Activity, HardDrive, Zap, Download, Upload, RefreshCw } from 'lucide-react';

import { systemHealth, paymentGateways } from './mockData';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';

export function SystemTab() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-[#1a1625] border-gray-800 p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">System Uptime</p>
              <p className="text-3xl font-bold text-green-400">{systemHealth.uptime}</p>
            </div>
            <div className="bg-green-500/20 p-3 rounded-lg">
              <Activity className="w-6 h-6 text-green-400" />
            </div>
          </div>
        </Card>

        <Card className="bg-[#1a1625] border-gray-800 p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">API Response</p>
              <p className="text-3xl font-bold text-blue-400">{systemHealth.apiResponseTime}</p>
            </div>
            <div className="bg-blue-500/20 p-3 rounded-lg">
              <Zap className="w-6 h-6 text-blue-400" />
            </div>
          </div>
        </Card>

        <Card className="bg-[#1a1625] border-gray-800 p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Database Size</p>
              <p className="text-3xl font-bold text-purple-400">{systemHealth.databaseSize}</p>
            </div>
            <div className="bg-purple-500/20 p-3 rounded-lg">
              <HardDrive className="w-6 h-6 text-purple-400" />
            </div>
          </div>
        </Card>

        <Card className="bg-[#1a1625] border-gray-800 p-5">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-gray-400 text-sm mb-1">Active Users</p>
              <p className="text-3xl font-bold text-yellow-400">{systemHealth.activeUsers}</p>
            </div>
            <div className="bg-yellow-500/20 p-3 rounded-lg">
              <Activity className="w-6 h-6 text-yellow-400" />
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="bg-[#1a1625] border-gray-800 p-6">
          <h2 className="text-xl font-bold mb-4">Backup & Restore</h2>
          <div className="space-y-4">
            <div className="bg-[#0f0a1a] rounded-lg p-4">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-semibold">Last Backup</p>
                  <p className="text-sm text-gray-400">{systemHealth.lastBackup}</p>
                </div>
                <Badge className="bg-green-600">{systemHealth.backupStatus}</Badge>
              </div>
              <Progress value={100} className="h-2" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Button className="bg-purple-600 hover:bg-purple-700">
                <Download className="w-4 h-4 mr-2" />
                Backup Now
              </Button>
              <Button variant="outline" className="border-gray-700">
                <Upload className="w-4 h-4 mr-2" />
                Restore
              </Button>
            </div>

            <div className="bg-orange-500/20 border border-orange-500 rounded-lg p-3">
              <p className="text-sm text-orange-400">
                ⚠️ Automatic backups run daily at 2:00 AM
              </p>
            </div>
          </div>
        </Card>

        <Card className="bg-[#1a1625] border-gray-800 p-6">
          <h2 className="text-xl font-bold mb-4">Payment Gateways</h2>
          <div className="space-y-3">
            {paymentGateways.map((gateway) => (
              <div
                key={gateway.id}
                className="bg-[#0f0a1a] border border-gray-800 rounded-lg p-4"
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <p className="font-semibold">{gateway.name}</p>
                    <p className="text-xs text-gray-400">Fee: {gateway.fee}</p>
                  </div>
                  <Badge className={gateway.status === 'active' ? 'bg-green-600' : 'bg-gray-600'}>
                    {gateway.status}
                  </Badge>
                </div>
                <p className="text-sm text-gray-400">{gateway.transactions} transactions</p>
              </div>
            ))}
          </div>
        </Card>
      </div>

      <Card className="bg-[#1a1625] border-gray-800 p-6">
        <h2 className="text-xl font-bold mb-4">System Maintenance</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Button variant="outline" className="border-gray-700">
            <RefreshCw className="w-4 h-4 mr-2" />
            Clear Cache
          </Button>
          <Button variant="outline" className="border-gray-700">
            <Database className="w-4 h-4 mr-2" />
            Optimize Database
          </Button>
          <Button variant="outline" className="border-gray-700">
            <Activity className="w-4 h-4 mr-2" />
            System Health Check
          </Button>
        </div>
      </Card>
    </div>
  );
}
