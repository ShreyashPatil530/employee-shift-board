import React, { useEffect, useState, useContext } from 'react';
import { shiftAPI } from '../services/api';
import { AuthContext } from '../context/AuthContext';

const ShiftTable = ({ refreshTrigger }) => {
  const [shifts, setShifts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchShifts = async () => {
      setLoading(true);
      try {
        const response = await shiftAPI.getShifts();
        setShifts(response.data.data || []);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load shifts');
      } finally {
        setLoading(false);
      }
    };

    fetchShifts();
  }, [refreshTrigger]);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this shift?')) {
      try {
        await shiftAPI.deleteShift(id);
        setShifts((prev) => prev.filter((shift) => shift._id !== id));
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to delete shift');
      }
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading shifts...</div>;
  }

  if (error) {
    return <div className="bg-red-100 text-red-700 p-4 rounded">{error}</div>;
  }

  if (shifts.length === 0) {
    return <div className="text-center py-8 text-gray-500">No shifts found</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <h2 className="text-2xl font-bold p-6 bg-gray-50 border-b">📊 Shifts</h2>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-100 border-b">
            <tr>
              <th className="px-6 py-3 text-left text-sm font-medium">Employee</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Code</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Date</th>
              <th className="px-6 py-3 text-left text-sm font-medium">Start Time</th>
              <th className="px-6 py-3 text-left text-sm font-medium">End Time</th>
              {user?.role === 'admin' && (
                <th className="px-6 py-3 text-left text-sm font-medium">Action</th>
              )}
            </tr>
          </thead>
          <tbody>
            {shifts.map((shift) => (
              <tr key={shift._id} className="border-b hover:bg-gray-50 transition">
                <td className="px-6 py-4 text-sm">{shift.employeeId.name}</td>
                <td className="px-6 py-4 text-sm">{shift.employeeId.code}</td>
                <td className="px-6 py-4 text-sm">
                  {new Date(shift.date).toLocaleDateString()}
                </td>
                <td className="px-6 py-4 text-sm font-semibold">{shift.startTime}</td>
                <td className="px-6 py-4 text-sm font-semibold">{shift.endTime}</td>
                {user?.role === 'admin' && (
                  <td className="px-6 py-4 text-sm">
                    <button
                      onClick={() => handleDelete(shift._id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShiftTable;