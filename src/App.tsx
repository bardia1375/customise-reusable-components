import React from 'react';
import { Card } from './components';
import { ExampleForm } from './components/ExampleForm';

const App: React.FC = () => {
  return (
    <div className="h-screen flex flex-col overflow-hidden bg-gray-100">
      <div className="flex-1 p-4 sm:p-6 lg:p-8 flex items-center justify-center overflow-hidden">
        <div className="w-full max-w-5xl h-full">
          <Card
            title="Example Form"
            subtitle="Demonstrating our reusable components"
            elevated
            className="h-full"
          >
            <ExampleForm />
          </Card>
        </div>
      </div>
    </div>
  );
};

export default App;
