import React from 'react';
import { Input } from '../../components';
import { FormValues, FormErrors } from './index';

interface FormFieldsProps {
  formValues: FormValues;
  errors: FormErrors;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export const FormFields: React.FC<FormFieldsProps> = ({ formValues, errors, handleChange }) => {
  return (
    <>
      <Input
        id="name"
        name="name"
        label="Full Name"
        placeholder="Enter your full name"
        value={formValues.name}
        onChange={handleChange}
        error={errors.name}
        required
      />
      
      <Input
        id="email"
        name="email"
        type="email"
        label="Email Address"
        placeholder="Enter your email"
        value={formValues.email}
        onChange={handleChange}
        error={errors.email}
        required
      />
    </>
  );
};
