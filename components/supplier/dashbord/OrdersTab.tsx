import { useState } from 'react';
import { Filter, Download, RefreshCw, Truck, Eye, Upload, CheckCircle, Clock, Calendar, Archive, MapPin, Phone, Mail, LucideIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { ordersData } from './MockData';


export function OrdersTab() {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null);

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: 'default' | 'secondary' | 'destructive' | 'outline'; icon: LucideIcon }> = {
      pending: { variant: 'outline', icon: Clock },
      shipped: { variant: 'default', icon: Truck },
      delivered: { variant: 'secondary', icon: CheckCircle },
    };
    
    const config = variants[status] || variants.pending;
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className="gap-1">
        <Icon className="w-3 h-3" />
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  const updateOrderStatus = (orderId: string, newStatus: string) => {
    console.log(`Updating order ${orderId} to ${newStatus}`);
    // In a real app, this would update the backend
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Select defaultValue="all">
            <SelectTrigger className="w-40 bg-[#1a1625] border-gray-700">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Orders</SelectItem>
              <SelectItem value="pending">Pending</SelectItem>
              <SelectItem value="shipped">Shipped</SelectItem>
              <SelectItem value="delivered">Delivered</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" className="border-gray-700">
            <Filter className="w-4 h-4 mr-2" />
            Filter
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-gray-700">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
          <Button className="bg-pink-600 hover:bg-pink-700">
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2 bg-[#1a1625] border-gray-800 p-6">
          <h2 className="text-xl font-bold mb-4">All Purchase Orders</h2>
          <div className="space-y-3">
            {ordersData.map((order) => (
              <div
                key={order.id}
                className="bg-[#0f0a1a] border border-gray-800 rounded-lg p-4 hover:border-pink-500/50 transition-colors cursor-pointer"
                onClick={() => setSelectedOrder(order.id)}
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold text-lg">{order.id}</p>
                    <p className="text-gray-400 text-sm">{order.storeName}</p>
                    <div className="flex items-center gap-1 text-xs text-gray-500 mt-1">
                      <MapPin className="w-3 h-3" />
                      {order.location}
                    </div>
                  </div>
                  <div className="text-right">
                    {getStatusBadge(order.status)}
                    <p className="text-xs text-gray-400 mt-1">Manager: {order.manager}</p>
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-4 text-sm">
                  <div>
                    <p className="text-gray-400">Items</p>
                    <p className="font-semibold">{order.items}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Total</p>
                    <p className="font-semibold text-green-400">${order.total}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Delivery Date</p>
                    <p className="font-semibold">{order.deliveryDate}</p>
                  </div>
                </div>
                
                <div className="flex gap-2 mt-3 pt-3 border-t border-gray-800">
                  {order.status === 'pending' && (
                    <>
                      <Button
                        size="sm"
                        className="bg-pink-600 hover:bg-pink-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          updateOrderStatus(order.id, 'shipped');
                        }}
                      >
                        <Truck className="w-4 h-4 mr-1" />
                        Mark as Shipped
                      </Button>
                      <Button size="sm" variant="outline" className="border-gray-700">
                        <Eye className="w-4 h-4 mr-1" />
                        View Details
                      </Button>
                    </>
                  )}
                  
                  {order.status === 'shipped' && (
                    <>
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={(e) => {
                          e.stopPropagation();
                          updateOrderStatus(order.id, 'delivered');
                        }}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Confirm Delivery
                      </Button>
                      <Button size="sm" variant="outline" className="border-gray-700">
                        <Upload className="w-4 h-4 mr-1" />
                        Upload Docs
                      </Button>
                    </>
                  )}
                  
                  {order.status === 'delivered' && (
                    <Button size="sm" variant="outline" className="border-gray-700 flex-1">
                      <Archive className="w-4 h-4 mr-1" />
                      Archive Order
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="bg-[#1a1625] border-gray-800 p-6">
          <h3 className="text-lg font-bold mb-4">Order Timeline</h3>
          <div className="space-y-4">
            <div className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div className="w-0.5 h-12 bg-gray-700"></div>
              </div>
              <div>
                <p className="font-semibold">Order Received</p>
                <p className="text-sm text-gray-400">Nov 15, 2023 - 09:30 AM</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-green-500 flex items-center justify-center">
                  <CheckCircle className="w-4 h-4" />
                </div>
                <div className="w-0.5 h-12 bg-gray-700"></div>
              </div>
              <div>
                <p className="font-semibold">Processing</p>
                <p className="text-sm text-gray-400">Nov 15, 2023 - 02:15 PM</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-pink-500 flex items-center justify-center animate-pulse">
                  <Truck className="w-4 h-4" />
                </div>
                <div className="w-0.5 h-12 bg-gray-700"></div>
              </div>
              <div>
                <p className="font-semibold">Ready to Ship</p>
                <p className="text-sm text-gray-400">Current Status</p>
              </div>
            </div>

            <div className="flex gap-3">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center">
                  <Calendar className="w-4 h-4" />
                </div>
              </div>
              <div>
                <p className="font-semibold text-gray-500">Expected Delivery</p>
                <p className="text-sm text-gray-400">Nov 18, 2023</p>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-800">
            <h4 className="font-semibold mb-3">Quick Actions</h4>
            <div className="space-y-2">
              <Button size="sm" variant="outline" className="w-full border-gray-700">
                <Phone className="w-4 h-4 mr-2" />
                Call Store Manager
              </Button>
              <Button size="sm" variant="outline" className="w-full border-gray-700">
                <Mail className="w-4 h-4 mr-2" />
                Send Email
              </Button>
              <Button size="sm" variant="outline" className="w-full border-gray-700">
                <MapPin className="w-4 h-4 mr-2" />
                View on Map
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
