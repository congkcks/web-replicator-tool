
import React from 'react';
import { cn } from '@/lib/utils';

interface FeatureCardProps {
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  iconBg: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ 
  title, 
  subtitle, 
  description, 
  icon, 
  iconBg,
  delay
}) => {
  return (
    <div 
      className="feature-card animate-fade-in"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className={cn("feature-icon mx-auto", iconBg)}>
        {icon}
      </div>
      <h2 className="feature-title">{title}</h2>
      <p className="feature-subtitle">{subtitle}</p>
      <p className="feature-description">{description}</p>
    </div>
  );
};

export default FeatureCard;
