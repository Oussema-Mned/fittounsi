import React from 'react';

interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'outline';
}

export const Badge = React.forwardRef<HTMLDivElement, BadgeProps>(
  ({ className = '', variant = 'default', ...props }, ref) => {
    const variants = {
      default: 'bg-primary text-primary-foreground hover:bg-primary/80',
      secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
      outline: 'text-foreground border border-input hover:bg-accent hover:text-accent-foreground',
    };

    return (
      <div
        ref={ref}
        className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 ${variants[variant]} ${className}`}
        {...props}
      />
    );
  }
); 