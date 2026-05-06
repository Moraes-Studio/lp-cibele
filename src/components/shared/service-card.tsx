import { User, Compass, Users, Heart, type LucideIcon } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';

type ServiceIconName = 'user' | 'compass' | 'users' | 'heart';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: ServiceIconName;
}

const iconByName: Record<ServiceIconName, LucideIcon> = {
  user: User,
  compass: Compass,
  users: Users,
  heart: Heart,
};

export function ServiceCard({ title, description, icon }: ServiceCardProps) {
  const Icon = iconByName[icon];

  return (
    <Card>
      <CardHeader>
        <div
          className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-brand-sand text-brand-forest"
          aria-hidden="true"
        >
          <Icon className="h-5 w-5" />
        </div>
        <CardTitle>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <CardDescription>{description}</CardDescription>
      </CardContent>
    </Card>
  );
}
