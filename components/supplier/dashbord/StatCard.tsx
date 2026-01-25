import { Card } from '@/components/ui/card';
import { LucideIcon } from 'lucide-react';


interface StatCardProps {
  label: string;
  value: string;
  change?: string;
  changeType?: 'positive' | 'negative' | 'neutral';
  icon: LucideIcon;
  iconColor: string;
  iconBgColor: string;
  subtitle?: string;
}

export function StatCard({
  label,
  value,
  change,
  changeType = 'neutral',
  icon: Icon,
  iconColor,
  iconBgColor,
  subtitle,
}: StatCardProps) {
  const changeColorClass =
    changeType === 'positive' ? 'text-green-500' : changeType === 'negative' ? 'text-red-500' : 'text-gray-400';

  return (
    <Card className="bg-[#1a1625] border-gray-800 p-5">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-400 text-sm mb-1">{label}</p>
          <p className={`text-3xl font-bold ${iconColor}`}>{value}</p>
          {(change || subtitle) && (
            <p className={`text-sm mt-1 flex items-center gap-1 ${change ? changeColorClass : 'text-gray-400'}`}>
              {change && <span>{change}</span>}
              {subtitle && <span>{subtitle}</span>}
            </p>
          )}
        </div>
        <div className={`${iconBgColor} p-3 rounded-lg`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
      </div>
    </Card>
  );
}
