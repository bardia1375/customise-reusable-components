import React from 'react';
import { Column } from './index';

interface TableHeaderProps {
  columns: Column[];
  sortConfig: {
    key: string | null;
    direction: 'asc' | 'desc' | null;
  };
  onSort: (key: string) => void;
  className?: string;
}

export const TableHeader: React.FC<TableHeaderProps> = ({ 
  columns = [], // Provide default empty array
  sortConfig = { key: null, direction: null }, 
  onSort,
  className = ''
}) => {
  // Render sort indicator
  const renderSortIndicator = (column: Column) => {
    if (!column?.sortable) return null;
    
    if (sortConfig.key !== column.key) {
      return (
        <svg className="w-4 h-4 text-gray-400 opacity-0 group-hover:opacity-100" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16V4m0 0L3 8m4-4l4 4m6 0v12m0 0l4-4m-4 4l-4-4" />
        </svg>
      );
    }
    
    if (sortConfig.direction === 'asc') {
      return (
        <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
        </svg>
      );
    }
    
    return (
      <svg className="w-4 h-4 text-blue-500" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
      </svg>
    );
  };

  return (
    <thead className={`bg-gray-50 ${className}`}>
      <tr>
        {(columns || []).map((column, index) => (
          <th
            key={index}
            scope="col"
            className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${
              column.sortable ? 'cursor-pointer select-none group' : ''
            }`}
            onClick={() => column.sortable && onSort && onSort(column.key)}
            style={{ width: column.width }}
          >
            <div className="flex items-center space-x-1">
              <span>{column.header}</span>
              {renderSortIndicator(column)}
            </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};
