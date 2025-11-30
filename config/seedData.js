const User = require('../models/User');
const Employee = require('../models/Employee');

const seedData = async () => {
  try {
    const adminExists = await User.findOne({ email: 'hire-me@anshumat.org' });
    if (!adminExists) {
      const admin = await User.create({
        username: 'admin',
        email: 'hire-me@anshumat.org',
        password: 'HireMe@2025!',
        role: 'admin'
      });

      await Employee.create({
        name: 'Admin User',
        code: 'EMP001',
        department: 'Management',
        userId: admin._id
      });

      console.log('Admin user seeded successfully');
    }

    const userExists = await User.findOne({ email: 'user@example.com' });
    if (!userExists) {
      const user = await User.create({
        username: 'user',
        email: 'user@example.com',
        password: 'Password@123',
        role: 'user'
      });

      await Employee.create({
        name: 'Normal User',
        code: 'EMP002',
        department: 'Operations',
        userId: user._id
      });

      console.log('Normal user seeded successfully');
    }
  } catch (error) {
    console.error('Error seeding data:', error);
  }
};

seedData();
