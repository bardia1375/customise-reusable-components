import React, { forwardRef } from 'react';

interface Option {
  value: string | number;
  label: string;
  disabled?: boolean;
}

interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'size'> {
  options: Option[];
  label?: string;
  helperText?: string;
  error?: string;
  fullWidth?: boolean;
  size?: 'sm' | 'md' | 'lg';
  containerClassName?: string;
  labelClassName?: string;
  selectClassName?: string;
  helperTextClassName?: string;
  errorClassName?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({
    options,
    label,
    helperText,
    error,
    fullWidth = true,
    size = 'md',
    containerClassName = '',
    labelClassName = '',
    selectClassName = '',
    helperTextClassName = '',
    errorClassName = '',
    id,
    disabled = false,
    ...props
  }, ref) => {
    const selectId = id || `select-${Math.random().toString(36).substring(2, 9)}`;
    
    const containerClasses = `${fullWidth ? 'w-full' : ''} ${containerClassName}`;
    
    const labelClasses = `block text-sm font-medium text-gray-700 mb-1 ${labelClassName}`;
    
    const baseSelectClasses = 'block bg-white border rounded-lg shadow-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500';
    const errorSelectClasses = error ? 'border-red-500 text-red-900 focus:ring-red-500 focus:border-red-500' : 'border-gray-300';
    const disabledClasses = disabled ? 'bg-gray-100 cursor-not-allowed' : '';
    
    const sizeClasses = {
      sm: 'py-1.5 text-sm',
      md: 'py-2 text-base',
      lg: 'py-2.5 text-lg',
    };
    
    const selectClasses = `${baseSelectClasses} ${errorSelectClasses} ${disabledClasses} ${sizeClasses[size]} px-3 w-full appearance-none ${selectClassName}`;
    
    const helperTextClasses = `mt-1 text-sm text-gray-500 ${helperTextClassName}`;
    const errorClasses = `mt-1 text-sm text-red-600 ${errorClassName}`;
    
    return (
      <div className={containerClasses}>
        {label && (
          <label htmlFor={selectId} className={labelClasses}>
            {label}
          </label>
        )}
        <div className="relative">
          <select
            ref={ref}
            id={selectId}
            className={selectClasses}
            disabled={disabled}
            aria-invalid={error ? 'true' : 'false'}
            aria-describedby={error ? `${selectId}-error` : helperText ? `${selectId}-helper` : undefined}
            {...props}
          >
            {options.map((option) => (
              <option 
                key={option.value} 
                value={option.value} 
                disabled={option.disabled}
              >
                {option.label}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
            <svg className="h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
            </svg>
          </div>
        </div>
        {helperText && !error && (
          <p className={helperTextClasses} id={`${selectId}-helper`}>
            {helperText}
          </p>
        )}
        {error && (
          <p className={errorClasses} id={`${selectId}-error`}>
            {error}
          </p>
        )}
      </div>
    );
  }
);

Select.displayName = 'Select';

export default Select;
