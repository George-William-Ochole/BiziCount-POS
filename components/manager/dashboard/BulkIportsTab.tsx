import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Upload, Download, FileText, CheckCircle, AlertCircle } from 'lucide-react';

export function BulkImportTab() {
  return (
    <div className="space-y-4">
      <Card className="bg-[#1a1625] border-gray-800 p-6">
        <h2 className="text-xl font-bold mb-4">Bulk Import Products</h2>
        <div className="space-y-6">
          <div className="bg-blue-500/10 border border-blue-500/50 rounded-lg p-4">
            <h3 className="font-semibold mb-2 flex items-center gap-2">
              <FileText className="w-5 h-5 text-blue-500" />
              Download Template
            </h3>
            <p className="text-sm text-gray-400 mb-3">
              Download our Excel template to ensure your data is formatted correctly
            </p>
            <Button className="bg-blue-600 hover:bg-blue-700">
              <Download className="w-4 h-4 mr-2" />
              Download Excel Template
            </Button>
          </div>

          <div className="bg-[#0f0a1a] border-2 border-dashed border-gray-700 rounded-lg p-8 text-center">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="font-semibold mb-2">Upload your Excel file</h3>
            <p className="text-sm text-gray-400 mb-4">
              Drag and drop your file here, or click to browse
            </p>
            <input
              type="file"
              accept=".xlsx,.xls,.csv"
              className="hidden"
              id="file-upload"
            />
            <Button
              onClick={() => document.getElementById('file-upload')?.click()}
              className="bg-blue-600 hover:bg-blue-700"
            >
              Select File
            </Button>
          </div>

          <div className="space-y-3">
            <h3 className="font-semibold">Import Requirements</h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                <span className="text-gray-400">File must be in Excel (.xlsx, .xls) or CSV format</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                <span className="text-gray-400">Required fields: Product Name, SKU, Category, Cost Price, Retail Price</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <CheckCircle className="w-4 h-4 text-green-500 mt-0.5" />
                <span className="text-gray-400">Optional fields: Stock, Reorder Level, Supplier, Expiry Date, Batch Number</span>
              </div>
              <div className="flex items-start gap-2 text-sm">
                <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5" />
                <span className="text-gray-400">Duplicate SKUs will be skipped with a warning</span>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <Card className="bg-[#1a1625] border-gray-800 p-6">
        <h2 className="text-lg font-bold mb-4">Recent Imports</h2>
        <div className="space-y-3">
          {[
            { date: '2024-01-25', file: 'products_january.xlsx', records: 45, status: 'success' },
            { date: '2024-01-20', file: 'new_inventory.csv', records: 23, status: 'success' },
            { date: '2024-01-15', file: 'products_update.xlsx', records: 12, status: 'partial' },
          ].map((importRecord, idx) => (
            <div key={idx} className="bg-[#0f0a1a] border border-gray-800 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold">{importRecord.file}</p>
                  <p className="text-sm text-gray-400">{importRecord.date} - {importRecord.records} records</p>
                </div>
                <div className="flex items-center gap-2">
                  {importRecord.status === 'success' ? (
                    <CheckCircle className="w-5 h-5 text-green-500" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-orange-500" />
                  )}
                  <Button size="sm" variant="outline" className="border-gray-700">
                    View Log
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
