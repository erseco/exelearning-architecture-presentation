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

export interface Integration {
  name: string;
  plugin: string;
  color: string;
  logoColor: string;
  type: string;
  description: string;
  features: string[];
  useCase: string;
}

export interface Improvement {
  title: string;
  before: string;
  after: string;
  why: string;
}
