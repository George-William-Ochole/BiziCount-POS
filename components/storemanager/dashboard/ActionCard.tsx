import { LucideIcon, Plus } from 'lucide-react';

interface ActionCardProps {
  title: string;
  icon: LucideIcon;
  iconColor?: string;
}

export function ActionCard({ title, icon: Icon, iconColor = '#ec4899' }: ActionCardProps) {
  return (
    <button className="bg-[#0d0d0d] border border-gray-800 rounded-xl p-6 hover:bg-[#1a1a1a] transition-colors group">
      <div className="flex flex-col items-center gap-4">
        <div className="relative">
          <Icon className="w-12 h-12" style={{ color: iconColor, strokeWidth: 1.5 }} />
          <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-[#1a1a1a] rounded-full flex items-center justify-center border border-gray-800 group-hover:bg-[#2a2a2a]">
            <Plus className="w-4 h-4 text-gray-400" />
          </div>
        </div>
        <span className="text-gray-300 text-sm font-medium">{title}</span>
      </div>
    </button>
  );
}
