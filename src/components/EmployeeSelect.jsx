import React, { useEffect, useState, useContext } from 'react';
import { employeeAPI } from '../services/api';
import { AuthContext } from '../context/AuthContext';

const EmployeeSelect = ({ value, onChange, adminOnly = false }) => {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await employeeAPI.getAllEmployees();
        setEmployees(response.data.data);
        setError(null);
      } catch (err) {
        setError(err.response?.data?.message || 'Failed to load employees');
      } finally {
        setLoading(false);
      }
    };

    fetchEmployees();
  }, []);

  if (loading) return <p className="text-gray-500">Loading employees...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const filtered = adminOnly ? employees : employees.filter(emp => emp.userId._id === user?.id);

  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    >
      <option value="">Select Employee</option>
      {filtered.map((emp) => (
        <option key={emp._id} value={emp._id}>
          {emp.name} ({emp.code})
        </option>
      ))}
    </select>
  );
};

export default EmployeeSelect;