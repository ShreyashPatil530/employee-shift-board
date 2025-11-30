import React, { useState, useContext } from 'react';
import { shiftAPI } from '../services/api';
import EmployeeSelect from './EmployeeSelect';
import { AuthContext } from '../context/AuthContext';

const ShiftForm = ({ onShiftCreated }) => {
  const [formData, setFormData] = useState({
    employeeId: '',
    date: '',
    startTime: '',
    endTime: '',
  });
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(AuthContext);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleEmployeeChange = (value) => {
    setFormData((prev) => ({ ...prev, employeeId: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      await shiftAPI.createShift(
        formData.employeeId,
        formData.date,
        formData.startTime,
        formData.endTime
      );

      setSuccess('✅ Shift created successfully!');
      setFormData({ employeeId: '', date: '', startTime: '', endTime: '' });
      onShiftCreated();

      setTimeout(() => setSuccess(null), 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to create shift');
    } finally {
      setLoading(false);
    }
  };

  if (user?.role !== 'admin') {
    return null;
  }

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-6">
      <h2 className="text-2xl font-bold mb-4">➕ Create New Shift</h2>

      {error && <div className="bg-red-100 text-red-700 p-4 rounded mb-4">{error}</div>}
      {success && <div className="bg-green-100 text-green-700 p-4 rounded mb-4">{success}</div>}

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-2">Employee</label>
          <EmployeeSelect
            value={formData.employeeId}
            onChange={handleEmployeeChange}
            adminOnly={true}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Start Time</label>
            <input
              type="time"
              name="startTime"
              value={formData.startTime}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">End Time</label>
            <input
              type="time"
              name="endTime"
              value={formData.endTime}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:bg-gray-400 transition font-medium"
        >
          {loading ? 'Creating...' : 'Create Shift'}
        </button>
      </form>
    </div>
  );
};

export default ShiftForm;