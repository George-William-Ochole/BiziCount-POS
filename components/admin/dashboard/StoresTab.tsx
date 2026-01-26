import { Plus, Edit, MapPin, Phone, Mail, TrendingUp } from 'lucide-react';
import { storesData } from './mockData';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function StoresTab() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Store Locations</h2>
          <p className="text-gray-400 text-sm">Manage all store locations and settings</p>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          Add New Store
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {storesData.map((store) => (
          <Card key={store.id} className="bg-[#1a1625] border-gray-800 p-6 hover:border-purple-500/50 transition-colors">
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-bold mb-1">{store.name}</h3>
                <Badge variant="secondary">{store.id}</Badge>
              </div>
              <Badge className="bg-green-600">{store.status}</Badge>
            </div>

            <div className="space-y-3 mb-4">
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <MapPin className="w-4 h-4" />
                {store.location}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Phone className="w-4 h-4" />
                {store.phone}
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-400">
                <Mail className="w-4 h-4" />
                {store.email}
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4 p-4 bg-[#0f0a1a] rounded-lg mb-4">
              <div>
                <p className="text-gray-400 text-xs mb-1">Revenue</p>
                <p className="font-bold text-green-400">${(store.revenue / 1000).toFixed(1)}K</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs mb-1">Employees</p>
                <p className="font-bold">{store.employees}</p>
              </div>
              <div>
                <p className="text-gray-400 text-xs mb-1">Manager</p>
                <p className="font-bold text-sm truncate">{store.manager}</p>
              </div>
            </div>

            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="flex-1 border-gray-700">
                <Edit className="w-4 h-4 mr-1" />
                Edit
              </Button>
              <Button size="sm" variant="outline" className="flex-1 border-gray-700">
                <TrendingUp className="w-4 h-4 mr-1" />
                Analytics
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
