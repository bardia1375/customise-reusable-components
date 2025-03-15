import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  id: string;
  name: string;
  label?: string;
  type?: string;
  placeholder?: string;
  error?: string;
  helperText?: string;
  required?: boolean;
}

const Input: React.FC<InputProps> = ({
  id,
  name,
  label,
  type = 'text',
  placeholder = '',
  value,
  onChange,
  error = '',
  helperText = '',
  disabled = false,
  required = false,
  className = '',
  ...props
}) => {
  // Base input classes - modified to not depend on @tailwindcss/forms
  const baseClasses = 'block w-full px-3 py-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2';
  
  // Default border color classes
  const borderClasses = 'border-gray-300';
  
  // Focus classes
  const focusClasses = 'focus:ring-primary-500';
  
  // Error classes
  const errorClasses = error ? 'border-red-300 text-red-900 placeholder-red-300 focus:ring-red-500' : '';
  
  // Disabled classes
  const disabledClasses = disabled ? 'bg-gray-100 cursor-not-allowed opacity-75' : '';
  
  // Combine all classes
  const inputClasses = `${baseClasses} ${borderClasses} ${focusClasses} ${errorClasses} ${disabledClasses} ${className}`;
  
  return (
    <div>
      {label && (
        <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <input
        id={id}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        disabled={disabled}
        required={required}
        className={inputClasses}
        aria-invalid={error ? 'true' : 'false'}
        aria-describedby={error || helperText ? `${id}-description` : undefined}
        {...props}
      />
      {(error || helperText) && (
        <p id={`${id}-description`} className={`mt-1 text-sm ${error ? 'text-red-600' : 'text-gray-500'}`}>
          {error || helperText}
        </p>
      )}
    </div>
  );
};

export default Input;
