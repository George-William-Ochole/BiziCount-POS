import { useState } from 'react';
import {Edit, Trash2, Eye, Search, Filter, UserPlus } from 'lucide-react';

import { systemUsers } from './mockData';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

export function UsersTab() {
  const [showCreateModal, setShowCreateModal] = useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              placeholder="Search users..."
              className="pl-10 w-80 bg-[#1a1625] border-gray-700"
            />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-40 bg-[#1a1625] border-gray-700">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="manager">Store Manager</SelectItem>
              <SelectItem value="cashier">Cashier</SelectItem>
              <SelectItem value="supplier">Supplier</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="border-gray-700">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
        <Button className="bg-purple-600 hover:bg-purple-700" onClick={() => setShowCreateModal(true)}>
          <UserPlus className="w-4 h-4 mr-2" />
          Add User
        </Button>
      </div>

      <Card className="bg-[#1a1625] border-gray-800 p-6">
        <h2 className="text-xl font-bold mb-4">System Users</h2>
        <div className="space-y-3">
          {systemUsers.map((user) => (
            <div
              key={user.id}
              className="bg-[#0f0a1a] border border-gray-800 rounded-lg p-4 hover:border-purple-500/50 transition-colors"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-indigo-600 flex items-center justify-center">
                    <span className="text-sm font-semibold">
                      {user.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div>
                    <p className="font-semibold text-lg">{user.name}</p>
                    <p className="text-sm text-gray-400">{user.email}</p>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge
                        className={
                          user.role === 'Admin'
                            ? 'bg-purple-600'
                            : user.role === 'Store Manager'
                            ? 'bg-blue-600'
                            : user.role === 'Cashier'
                            ? 'bg-green-600'
                            : 'bg-orange-600'
                        }
                      >
                        {user.role}
                      </Badge>
                      <Badge variant={user.status === 'active' ? 'secondary' : 'destructive'}>
                        {user.status}
                      </Badge>
                    </div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-400 mb-2">Last Login</p>
                  <p className="font-semibold">{user.lastLogin}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {user.stores.join(', ')}
                  </p>
                  <div className="flex gap-2 mt-3">
                    <Button size="sm" variant="outline" className="border-gray-700">
                      <Eye className="w-4 h-4 mr-1" />
                      View
                    </Button>
                    <Button size="sm" variant="outline" className="border-gray-700">
                      <Edit className="w-4 h-4 mr-1" />
                      Edit
                    </Button>
                    <Button size="sm" variant="destructive">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Create User Modal */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
          <Card className="bg-[#1a1625] border-gray-800 p-6 w-full max-w-md">
            <h3 className="text-xl font-bold mb-4">Create New User</h3>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-semibold mb-2 block">Full Name</label>
                <Input
                  placeholder="Enter full name"
                  className="bg-[#0f0a1a] border-gray-700"
                />
              </div>
              <div>
                <label className="text-sm font-semibold mb-2 block">Email</label>
                <Input
                  type="email"
                  placeholder="user@example.com"
                  className="bg-[#0f0a1a] border-gray-700"
                />
              </div>
              <div>
                <label className="text-sm font-semibold mb-2 block">Role</label>
                <Select>
                  <SelectTrigger className="bg-[#0f0a1a] border-gray-700">
                    <SelectValue placeholder="Select role" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="admin">Admin</SelectItem>
                    <SelectItem value="manager">Store Manager</SelectItem>
                    <SelectItem value="cashier">Cashier</SelectItem>
                    <SelectItem value="supplier">Supplier</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-semibold mb-2 block">Assign Store</label>
                <Select>
                  <SelectTrigger className="bg-[#0f0a1a] border-gray-700">
                    <SelectValue placeholder="Select store" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Stores</SelectItem>
                    <SelectItem value="downtown">Downtown Store</SelectItem>
                    <SelectItem value="westside">Westside Market</SelectItem>
                    <SelectItem value="central">Central Plaza</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex gap-3 mt-6">
                <Button className="flex-1 bg-purple-600 hover:bg-purple-700">
                  Create User
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-gray-700"
                  onClick={() => setShowCreateModal(false)}
                >
                  Cancel
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
