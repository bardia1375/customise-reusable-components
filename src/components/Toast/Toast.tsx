import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

type ToastType = 'success' | 'error' | 'warning' | 'info';
type ToastPosition = 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';

interface ToastProps {
  id: string;
  type: ToastType;
  title?: string;
  message: string;
  position?: ToastPosition;
  duration?: number;
  onClose: (id: string) => void;
  showIcon?: boolean;
}

const Toast: React.FC<ToastProps> = ({
  id,
  type,
  title,
  message,
  duration = 5000,
  onClose,
  showIcon = true,
}) => {
  const [isVisible, setIsVisible] = useState(true);
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(() => onClose(id), 300); // Allow time for exit animation
    }, duration);
    
    return () => clearTimeout(timer);
  }, [id, duration, onClose]);
  
  const handleClose = () => {
    setIsVisible(false);
    setTimeout(() => onClose(id), 300);
  };
  
  const baseClasses = 'rounded-lg p-4 shadow-lg max-w-xs w-full flex items-start transition-all duration-300';
  const visibilityClasses = isVisible ? 'opacity-100 transform translate-y-0' : 'opacity-0 transform translate-y-2';
  
  const typeClasses = {
    success: 'bg-green-50 border-l-4 border-green-500 text-green-800',
    error: 'bg-red-50 border-l-4 border-red-500 text-red-800',
    warning: 'bg-yellow-50 border-l-4 border-yellow-500 text-yellow-800',
    info: 'bg-blue-50 border-l-4 border-blue-500 text-blue-800',
  };
  
  const icons = {
    success: (
      <svg className="w-5 h-5 text-green-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"></path>
      </svg>
    ),
    error: (
      <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd"></path>
      </svg>
    ),
    warning: (
      <svg className="w-5 h-5 text-yellow-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd"></path>
      </svg>
    ),
    info: (
      <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd"></path>
      </svg>
    ),
  };
  
  return (
    <div className={`${baseClasses} ${typeClasses[type]} ${visibilityClasses}`}>
      {showIcon && <div className="flex-shrink-0 mr-3">{icons[type]}</div>}
      <div className="flex-grow">
        {title && <h4 className="text-sm font-medium mb-1">{title}</h4>}
        <div className="text-sm">{message}</div>
      </div>
      <button
        onClick={handleClose}
        className="ml-3 text-gray-500 hover:text-gray-800 focus:outline-none"
        aria-label="Close"
      >
        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path>
        </svg>
      </button>
    </div>
  );
};

// Toast Container component to manage multiple toasts
interface ToastContainerProps {
  position?: ToastPosition;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({ position = 'top-right' }) => {
  const positionClasses = {
    'top-right': 'top-4 right-4',
    'top-left': 'top-4 left-4',
    'bottom-right': 'bottom-4 right-4',
    'bottom-left': 'bottom-4 left-4',
    'top-center': 'top-4 left-1/2 -translate-x-1/2',
    'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
  };
  
  return createPortal(
    <div className={`fixed z-50 flex flex-col gap-2 ${positionClasses[position]}`} id="toast-container">
      {/* Toasts will be injected here */}
    </div>,
    document.body
  );
};

export default Toast;
