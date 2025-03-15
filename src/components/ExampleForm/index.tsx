import React, { useState } from 'react';
import { Button } from '../../components';
import { FormFields } from './FormFields';
import { validateForm } from './validation';
import { DataTable } from '../DataTable';
import { generateMockData } from './mockData';
import { MockDataRecord } from './mockData';

export interface FormValues {
  name: string;
  email: string;
}

export interface FormErrors {
  name: string;
  email: string;
}

export const ExampleForm: React.FC = () => {
  const [formValues, setFormValues] = useState<FormValues>({
    name: '',
    email: ''
  });
  
  const [errors, setErrors] = useState<FormErrors>({
    name: '',
    email: ''
  });
  
  const [submitted, setSubmitted] = useState(false);
  const [tableData, setTableData] = useState<MockDataRecord[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setFormValues(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear errors when user starts typing
    if (errors[name as keyof typeof errors]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    
    // Validate form
    const newErrors = validateForm(formValues);
    setErrors(newErrors);
    
    // If no errors, proceed with form submission
    if (!newErrors.name && !newErrors.email) {
      console.log('Form submitted:', formValues);
      // Generate more mock data for testing scrolling (50 rows)
      const mockData = generateMockData(50, formValues);
      setTableData(mockData);
      setSubmitted(true);
    }
  };

  const resetForm = (): void => {
    setFormValues({ name: '', email: '' });
    setErrors({ name: '', email: '' });
    setSubmitted(false);
    setTableData([]);
  };

  // Define columns for the DataTable
  const columns = [
    {
      key: 'id',
      header: 'ID',
      width: '60px',
      sortable: true
    },
    {
      key: 'name',
      header: 'Name',
      sortable: true,
      filterable: true
    },
    {
      key: 'email',
      header: 'Email',
      sortable: true,
      filterable: true
    },
    {
      key: 'status',
      header: 'Status',
      sortable: true,
      filterable: true,
      render: (value: string) => (
        <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
          value === 'active' ? 'bg-green-100 text-green-800' :
          value === 'pending' ? 'bg-yellow-100 text-yellow-800' :
          'bg-red-100 text-red-800'
        }`}>
          {value}
        </span>
      )
    },
    {
      key: 'role',
      header: 'Role',
      sortable: true,
      filterable: true,
      render: (value: string) => (
        <span className="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
          {value}
        </span>
      )
    },
    {
      key: 'lastLogin',
      header: 'Last Login',
      sortable: true
    },
    {
      key: 'createdAt',
      header: 'Created At',
      sortable: true
    }
  ];

  if (submitted) {
    return (
      <div className="flex flex-col h-full">
        <div className="mb-4">
          <h3 className="text-lg font-medium text-gray-900">
            Thank you for your submission, {formValues.name}!
          </h3>
          <p className="text-sm text-gray-500 mt-1">
            Here's a list of sample user data:
          </p>
        </div>
        
        {/* Fix the height to ensure scrolling */}
        <div className="flex-1" style={{ height: "calc(100% - 100px)" }}>
          <DataTable 
            data={tableData} 
            columns={columns}
            title="User Data"
            initialItemsPerPage={20}
            itemsPerPageOptions={[10, 20, 50]}
            onRowClick={(row) => console.log('Row clicked:', row)}
            emptyMessage="No user data available"
            className="h-full"
          />
        </div>
        
        <div className="mt-4 pt-4 border-t flex justify-end">
          <Button variant="outline" onClick={resetForm}>
            Start Over
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center h-full">
      <form id="example-form" onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="space-y-6">
          <FormFields 
            formValues={formValues}
            errors={errors}
            handleChange={handleChange}
          />
          
          <div className="flex space-x-4 pt-4">
            <Button type="button" variant="outline" onClick={resetForm}>
              Reset
            </Button>
            <Button variant="primary" fullWidth type="submit">
              Submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
};
