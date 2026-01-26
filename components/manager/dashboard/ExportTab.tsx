import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Download, FileText, Table, FileSpreadsheet } from 'lucide-react';


export function ExportTab() {
  const exportOptions = [
    { title: 'Product Catalog', description: 'All products with pricing and stock levels', icon: Table },
    { title: 'Inventory Report', description: 'Current stock levels and valuations', icon: FileSpreadsheet },
    { title: 'Sales Data', description: 'Transaction history and revenue', icon: FileText },
    { title: 'Purchase Orders', description: 'All purchase orders and supplier data', icon: FileText },
    { title: 'Low Stock Report', description: 'Products below reorder levels', icon: Table },
    { title: 'Expiry Report', description: 'Products expiring soon', icon: FileSpreadsheet },
  ];

  return (
    <div className="space-y-4">
      <Card className="bg-[#1a1625] border-gray-800 p-6">
        <h2 className="text-xl font-bold mb-4">Export Data</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {exportOptions.map((option, idx) => {
            const Icon = option.icon;
            return (
              <div
                key={idx}
                className="bg-[#0f0a1a] border border-gray-800 rounded-lg p-5 hover:border-blue-500/50 transition-colors"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="bg-blue-500/20 p-3 rounded-lg">
                    <Icon className="w-6 h-6 text-blue-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{option.title}</h3>
                    <p className="text-sm text-gray-400">{option.description}</p>
                  </div>
                </div>

                <div className="space-y-3">
                  <Select defaultValue="xlsx">
                    <SelectTrigger className="bg-[#1a1625] border-gray-700">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="xlsx">Excel (.xlsx)</SelectItem>
                      <SelectItem value="csv">CSV (.csv)</SelectItem>
                      <SelectItem value="pdf">PDF (.pdf)</SelectItem>
                    </SelectContent>
                  </Select>

                  <Button className="w-full bg-blue-600 hover:bg-blue-700">
                    <Download className="w-4 h-4 mr-2" />
                    Export
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </Card>

      <Card className="bg-[#1a1625] border-gray-800 p-6">
        <h2 className="text-lg font-bold mb-4">Recent Exports</h2>
        <div className="space-y-3">
          {[
            { name: 'product_catalog_2024_01_26.xlsx', date: '2024-01-26 14:30', size: '245 KB' },
            { name: 'inventory_report_2024_01_25.pdf', date: '2024-01-25 10:15', size: '156 KB' },
            { name: 'sales_data_january.csv', date: '2024-01-24 09:20', size: '89 KB' },
          ].map((file, idx) => (
            <div key={idx} className="bg-[#0f0a1a] border border-gray-800 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{file.name}</p>
                  <p className="text-sm text-gray-400">{file.date} - {file.size}</p>
                </div>
                <Button size="sm" variant="outline" className="border-gray-700">
                  <Download className="w-4 h-4 mr-1" />
                  Download
                </Button>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
