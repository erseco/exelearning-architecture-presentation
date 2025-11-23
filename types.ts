import { LucideIcon } from 'lucide-react';

export interface SectionProps {
  id: string;
  title: string;
  icon?: LucideIcon;
  children: React.ReactNode;
}

export interface NavItem {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface Principle {
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

export interface Metric {
  label: string;
  before: string;
  after: string;
  improvement: string;
}
