import { FormValues, FormErrors } from './index';

export const validateForm = (values: FormValues): FormErrors => {
  return {
    name: !values.name ? 'Name is required' : '',
    email: !values.email ? 'Email is required' : 
           !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email) ? 
           'Email is invalid' : ''
  };
};
