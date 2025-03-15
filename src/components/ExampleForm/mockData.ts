import { FormValues } from './index';

// Define a type for our mock data records
export interface MockDataRecord {
  id: number;
  name: string;
  email: string;
  status: 'active' | 'inactive' | 'pending';
  role: 'admin' | 'user' | 'editor';
  lastLogin: string;
  createdAt: string;
}

// Generate random dates within the last 30 days
const getRandomDate = (): string => {
  const date = new Date();
  date.setDate(date.getDate() - Math.floor(Math.random() * 30));
  return date.toISOString().split('T')[0];
};

// Generate random statuses
const statuses: Array<'active' | 'inactive' | 'pending'> = ['active', 'inactive', 'pending'];
const roles: Array<'admin' | 'user' | 'editor'> = ['admin', 'user', 'editor'];

export const generateMockData = (count: number, userValues: FormValues): MockDataRecord[] => {
  const results: MockDataRecord[] = [];
  
  // Add the current user to the list
  results.push({
    id: 1,
    name: userValues.name,
    email: userValues.email,
    status: 'active',
    role: 'user',
    lastLogin: new Date().toISOString().split('T')[0],
    createdAt: new Date().toISOString().split('T')[0]
  });
  
  // Generate additional mock data
  for (let i = 2; i <= count; i++) {
    results.push({
      id: i,
      name: `User ${i}`,
      email: `user${i}@example.com`,
      status: statuses[Math.floor(Math.random() * statuses.length)],
      role: roles[Math.floor(Math.random() * roles.length)],
      lastLogin: getRandomDate(),
      createdAt: getRandomDate()
    });
  }
  
  return results;
};
