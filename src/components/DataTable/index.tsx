import React, { useState, useMemo, useEffect } from 'react';
import { Input, Button } from '../../components';
import { TableHeader } from './TableHeader';
import { TablePagination } from './TablePagination';
import { FilterDropdown } from './FilterDropdown';

export interface Column {
  key: string;
  header: string;
  render?: (value: any, row: any) => React.ReactNode;
  sortable?: boolean;
  filterable?: boolean;
  width?: string;
}

interface DataTableProps<T> {
  data: T[];
  columns: Column[];
  title?: string;
  initialItemsPerPage?: number;
  itemsPerPageOptions?: number[];
  loading?: boolean;
  emptyMessage?: string;
  onRowClick?: (row: T) => void;
  className?: string;
}

export const DataTable = <T extends Record<string, any>>({
  data = [], // Provide default empty array
  columns = [], // Provide default empty array
  title = 'Data Table',
  initialItemsPerPage = 8, // Changed from 10 to 8
  itemsPerPageOptions = [8, 16, 24, 48], // Updated options to include 8 as default
  loading = false,
  emptyMessage = 'No data available',
  onRowClick,
  className = ''
}: DataTableProps<T>) => {
  // State for search
  const [searchTerm, setSearchTerm] = useState('');
  
  // State for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(initialItemsPerPage);
  
  // State for sorting
  const [sortConfig, setSortConfig] = useState<{
    key: string | null;
    direction: 'asc' | 'desc' | null;
  }>({ key: null, direction: null });
  
  // State for filtering
  const [filters, setFilters] = useState<Record<string, string>>({});
  
  // Reset to first page when search term changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters]);
  
  // Apply search filter
  const filteredData = useMemo(() => {
    if (!data || data.length === 0) return [];
    
    return data.filter(row => {
      // First apply search term filtering across all fields
      const matchesSearch = searchTerm === '' || 
        Object.entries(row).some(([key, value]) => {
          // Only search through string or number values
          if (typeof value === 'string' || typeof value === 'number') {
            return String(value).toLowerCase().includes(searchTerm.toLowerCase());
          }
          return false;
        });
      
      // Then apply column-specific filters
      const matchesFilters = Object.entries(filters).every(([key, filterValue]) => {
        if (!filterValue) return true;
        
        const rowValue = row[key];
        if (rowValue === undefined) return false;
        
        return String(rowValue).toLowerCase().includes(filterValue.toLowerCase());
      });
      
      return matchesSearch && matchesFilters;
    });
  }, [data, searchTerm, filters]);
  
  // Apply sorting
  const sortedData = useMemo(() => {
    if (!sortConfig.key || !sortConfig.direction) return filteredData;
    
    return [...filteredData].sort((a, b) => {
      if (a[sortConfig.key!] < b[sortConfig.key!]) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (a[sortConfig.key!] > b[sortConfig.key!]) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);
  
  // Apply pagination
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedData, currentPage, itemsPerPage]);
  
  // Handle sorting
  const handleSort = (key: string) => {
    let direction: 'asc' | 'desc' | null = 'asc';
    
    if (sortConfig.key === key) {
      if (sortConfig.direction === 'asc') {
        direction = 'desc';
      } else if (sortConfig.direction === 'desc') {
        direction = null;
      }
    }
    
    setSortConfig({ key, direction });
  };
  
  // Handle filter change
  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [key]: value
    }));
    setCurrentPage(1); // Reset to first page when filter changes
  };
  
  // Get filterable columns - Fix the issue by ensuring columns is an array
  const filterableColumns = useMemo(() => {
    if (!columns || !Array.isArray(columns)) return [];
    return columns.filter(col => col.filterable !== false);
  }, [columns]);
  
  // Clear all filters
  const clearFilters = () => {
    setFilters({});
    setSearchTerm('');
    setCurrentPage(1);
    setSortConfig({ key: null, direction: null });
  };
  
  return (
    <div className={`bg-white rounded-lg shadow flex flex-col ${className}`} style={{ height: '100%' }}>
      {/* Table header with search and filters */}
      <div className="p-4 border-b border-gray-200 bg-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
        <h2 className="text-lg font-medium text-gray-900">{title}</h2>
        
        <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <svg className="h-5 w-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
              </svg>
            </div>
            <Input
              id="search"
              name="search"
              placeholder="Search..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            {filterableColumns.length > 0 && (
              <FilterDropdown
                columns={filterableColumns}
                filters={filters}
                onFilterChange={handleFilterChange}
              />
            )}
            
            {(Object.keys(filters).length > 0 || searchTerm) && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
              >
                Clear
              </Button>
            )}
          </div>
        </div>
      </div>
      
      {/* Table - This is the part that needs to be scrollable */}
      <div className="flex-1 overflow-auto" style={{ minHeight: '200px' }}>
        <table className="min-w-full divide-y divide-gray-200">
          <TableHeader 
            columns={columns}
            sortConfig={sortConfig}
            onSort={handleSort}
            className="sticky top-0 z-10 bg-gray-50"
          />
          
          <tbody className="bg-white divide-y divide-gray-200">
            {loading ? (
              <tr>
                <td colSpan={columns.length} className="px-6 py-4 text-center text-gray-500">
                  <div className="flex justify-center items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    <span>Loading...</span>
                  </div>
                </td>
              </tr>
            ) : paginatedData.length > 0 ? (
              paginatedData.map((row, rowIndex) => (
                <tr 
                  key={rowIndex} 
                  className={`hover:bg-gray-50 ${onRowClick ? 'cursor-pointer' : ''}`}
                  onClick={() => onRowClick && onRowClick(row)}
                >
                  {columns.map((column, colIndex) => (
                    <td 
                      key={`${rowIndex}-${colIndex}`}
                      className="px-6 py-4 whitespace-nowrap"
                      style={{ width: column.width }}
                    >
                      {column.render ? (
                        column.render(row[column.key], row)
                      ) : (
                        <div className="text-sm text-gray-900">
                          {row[column.key] !== undefined ? String(row[column.key]) : '—'}
                        </div>
                      )}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="px-6 py-4 text-center text-gray-500">
                  {emptyMessage}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Pagination */}
      <div className="border-t border-gray-200">
        <TablePagination
          currentPage={currentPage}
          itemsPerPage={itemsPerPage}
          totalItems={filteredData.length}
          onPageChange={setCurrentPage}
          onItemsPerPageChange={setItemsPerPage}
          itemsPerPageOptions={itemsPerPageOptions}
        />
      </div>
    </div>
  );
};
