import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { FileText, Download } from 'lucide-react';


export function ReportsTab() {
  const reports = [
    { name: 'Sales Report', description: 'Comprehensive sales data', format: 'PDF, Excel, CSV' },
    { name: 'Inventory Report', description: 'Stock levels across all stores', format: 'Excel, CSV' },
    { name: 'Financial Report', description: 'Revenue, expenses, and profit', format: 'PDF, Excel' },
    { name: 'User Activity Report', description: 'System usage and audit trail', format: 'PDF, CSV' },
    { name: 'Supplier Performance', description: 'Supplier ratings and metrics', format: 'Excel, PDF' },
    { name: 'Customer Analytics', description: 'Customer segments and behavior', format: 'Excel, CSV' },
  ];

  return (
    <div className="space-y-4">
      <Card className="bg-[#1a1625] border-gray-800 p-6">
        <h2 className="text-xl font-bold mb-4">Generate Reports</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {reports.map((report, idx) => (
            <div
              key={idx}
              className="bg-[#0f0a1a] border border-gray-800 rounded-lg p-4"
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="font-semibold">{report.name}</p>
                  <p className="text-sm text-gray-400">{report.description}</p>
                  <p className="text-xs text-gray-500 mt-1">Formats: {report.format}</p>
                </div>
                <FileText className="w-5 h-5 text-purple-500" />
              </div>
              <Button size="sm" className="w-full bg-purple-600 hover:bg-purple-700">
                <Download className="w-4 h-4 mr-2" />
                Generate
              </Button>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
