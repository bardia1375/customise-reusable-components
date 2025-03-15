import React from 'react';

type PaddingSize = 'none' | 'sm' | 'md' | 'lg';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  footer?: React.ReactNode;
  elevated?: boolean;
  bordered?: boolean;
  padding?: PaddingSize;
  className?: string;
}

const Card: React.FC<CardProps> = ({
  children,
  title,
  subtitle,
  footer,
  elevated = false,
  bordered = true,
  padding = 'md',
  className = '',
  ...props
}) => {
  // Base classes
  const baseClasses = 'bg-white overflow-auto';
  
  // Elevation classes
  const elevationClasses = elevated ? 'shadow-lg' : '';
  
  // Border classes
  const borderClasses = bordered ? 'border border-gray-200' : '';
  
  // Padding classes
  const paddingMap = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };
  const paddingClasses = paddingMap[padding];
  
  // Combine all classes
  const cardClasses = `${baseClasses} ${elevationClasses} ${borderClasses} rounded-lg ${className}`;
  
  return (
    <div className={cardClasses} {...props}>
      {title && (
        <div className={`border-b border-gray-200 ${paddingClasses}`}>
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          {subtitle && <p className="mt-1 text-sm text-gray-500">{subtitle}</p>}
        </div>
      )}
      <div className={paddingClasses}>{children}</div>
      {footer && (
        <div className={`border-t border-gray-200 ${paddingClasses}`}>
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
