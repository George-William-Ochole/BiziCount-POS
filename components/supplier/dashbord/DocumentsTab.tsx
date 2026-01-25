import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Upload, Eye, Download, FileText } from 'lucide-react';
import { documentsData } from './MockData';
import { Card } from '@/components/ui/card';


export function DocumentsTab() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Select defaultValue="all">
            <SelectTrigger className="w-40 bg-[#1a1625] border-gray-700">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Documents</SelectItem>
              <SelectItem value="invoices">Invoices</SelectItem>
              <SelectItem value="delivery">Delivery Notes</SelectItem>
              <SelectItem value="contracts">Contracts</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button className="bg-pink-600 hover:bg-pink-700">
          <Upload className="w-4 h-4 mr-2" />
          Upload Document
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {documentsData.map((doc, idx) => (
          <Card key={idx} className="bg-[#1a1625] border-gray-800 p-4 hover:border-pink-500/50 transition-colors">
            <div className="flex items-start gap-4">
              <div className="bg-pink-500/20 p-3 rounded-lg">
                <FileText className="w-6 h-6 text-pink-500" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-semibold truncate">{doc.name}</p>
                <p className="text-sm text-gray-400">{doc.type}</p>
                <div className="flex items-center gap-3 mt-2 text-xs text-gray-500">
                  <span>{doc.size}</span>
                  <span>•</span>
                  <span>{doc.date}</span>
                </div>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                  <Eye className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
