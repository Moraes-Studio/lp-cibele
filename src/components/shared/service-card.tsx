import { User, Compass, Users, Heart, type LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { cn } from '@/lib/utils';

export type ServiceIconName = 'user' | 'compass' | 'users' | 'heart';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: ServiceIconName;
  iconBgClass?: string;
}

const iconByName: Record<ServiceIconName, LucideIcon> = {
  user: User,
  compass: Compass,
  users: Users,
  heart: Heart,
};

export function ServiceCard({ title, description, icon, iconBgClass }: ServiceCardProps) {
  const Icon = iconByName[icon];

  return (
    <Card className="group flex h-full flex-col transition-all duration-300 motion-safe:hover:-translate-y-1 hover:shadow-[0_8px_24px_rgba(47,74,63,0.10)]">
      <CardHeader className="flex flex-col gap-4">
        <div
          className={cn(
            'flex h-14 w-14 items-center justify-center rounded-full text-brand-forest transition-opacity group-hover:opacity-90',
            iconBgClass ?? 'bg-brand-sand'
          )}
          aria-hidden="true"
        >
          <Icon className="h-7 w-7" />
        </div>
        <CardTitle className="text-base leading-snug">{title}</CardTitle>
      </CardHeader>
      <CardContent className="flex-1 pt-0">
        <CardDescription className="text-sm leading-relaxed">{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
