import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import ShiftForm from '../components/ShiftForm';
import ShiftTable from '../components/ShiftTable';

const DashboardPage = () => {
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleShiftCreated = () => {
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div>
      <Navbar />
      <div className="max-w-6xl mx-auto py-8 px-4">
        <ShiftForm onShiftCreated={handleShiftCreated} />
        <ShiftTable refreshTrigger={refreshTrigger} />
      </div>
    </div>
  );
};

export default DashboardPage;