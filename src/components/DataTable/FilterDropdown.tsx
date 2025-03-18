import React, { useState, useRef, useEffect } from 'react';
import { Button } from '../ui';
import { Column } from './index';

interface FilterDropdownProps {
  columns: Column[];
  filters: Record<string, string>;
  onFilterChange: (key: string, value: string) => void;
}

export const FilterDropdown: React.FC<FilterDropdownProps> = ({ 
  columns = [], // Provide default empty array
  filters = {}, // Provide default empty object
  onFilterChange 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [localFilters, setLocalFilters] = useState<Record<string, string>>(filters || {});
  const dropdownRef = useRef<HTMLDivElement>(null);
  
  // Detect clicks outside the dropdown to close it
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Update local filters when external filters change
  useEffect(() => {
    setLocalFilters(filters || {});
  }, [filters]);
  
  // Apply filters and close dropdown
  const applyFilters = () => {
    if (!onFilterChange) return;
    
    Object.entries(localFilters).forEach(([key, value]) => {
      onFilterChange(key, value);
    });
    setIsOpen(false);
  };
  
  // Handle input change for filter fields
  const handleFilterInputChange = (key: string, value: string) => {
    setLocalFilters(prev => ({
      ...prev,
      [key]: value
    }));
  };
  
  // Check if any filters are active - safely handle undefined filters
  const hasActiveFilters = Object.values(filters || {}).some(value => value && value.trim() !== '');
  
  // Safety check - if no columns or onFilterChange is not provided, don't render
  if (!columns?.length || !onFilterChange) return null;
  
  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <Button
        variant={hasActiveFilters ? 'primary' : 'outline'}
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className="flex items-center">
          <svg className="h-4 w-4 mr-1" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
          </svg>
          <span>{hasActiveFilters ? `Filters (${Object.values(filters).filter(Boolean).length})` : 'Filter'}</span>
        </div>
      </Button>
      
      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-72 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-10">
          <div className="p-4 space-y-3">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Filter by</h3>
            
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {columns.map((column, index) => (
                <div key={index} className="space-y-1">
                  <label htmlFor={`filter-${column.key}`} className="block text-xs font-medium text-gray-700">
                    {column.header}
                  </label>
                  <input
                    type="text"
                    id={`filter-${column.key}`}
                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm text-sm focus:ring-blue-500 focus:border-blue-500"
                    placeholder={`Filter by ${column.header.toLowerCase()}`}
                    value={localFilters[column.key] || ''}
                    onChange={(e) => handleFilterInputChange(column.key, e.target.value)}
                  />
                </div>
              ))}
            </div>
            
            <div className="pt-3 border-t border-gray-200 mt-3 flex justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  // Reset local filters
                  const emptyFilters: Record<string, string> = {};
                  columns.forEach(col => { emptyFilters[col.key] = ''; });
                  setLocalFilters(emptyFilters);
                  
                  // Apply empty filters to clear all
                  columns.forEach(col => { onFilterChange(col.key, ''); });
                }}
              >
                Clear All
              </Button>
              <Button
                variant="primary"
                size="sm"
                onClick={applyFilters}
              >
                Apply Filters
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
