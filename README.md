# 📋 Employee Shift Board

> **Full-Stack HR Utility Application** - A production-ready shift management system with JWT authentication, role-based access control, and custom business rules.

[![GitHub License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18+-blue)](https://reactjs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Latest-green)](https://www.mongodb.com/)

---

## 🎯 Project Overview

Employee Shift Board is a **full-stack web application** designed to manage employee shifts efficiently with real-world business rules. It validates shift creation, prevents overlaps, enforces minimum duration, and implements role-based access control for different user types.

### Key Highlights
- ✅ JWT-based secure authentication
- ✅ Admin and User role-based access control
- ✅ Real-time shift validation with business rules
- ✅ Responsive React frontend with Tailwind CSS
- ✅ RESTful API backend with Express.js
- ✅ MongoDB Atlas cloud database
- ✅ Production-ready error handling

---

## 🌟 Features

### 🔐 Authentication & Security
- JWT token-based authentication
- Secure password hashing with bcryptjs
- Protected API endpoints
- Token refresh mechanism
- Session management with localStorage

### 👥 Role-Based Access Control
- **Admin Role:**
  - Create shifts for any employee
  - View all employee shifts
  - Delete shifts
  - Full dashboard access
  
- **User Role:**
  - View only their own shifts
  - Cannot create or delete shifts
  - Limited dashboard access

### 📊 Shift Management
- Create, read, and delete shifts
- Real-time shift validation
- View shifts by employee or date
- Interactive shift table
- Responsive shift form

### ✅ Custom Business Rules (Critical)

#### 1️⃣ No Overlapping Shifts
- Validates that an employee cannot have two shifts that overlap on the same date
- Checks time conflicts before creating new shifts
- Clear error messages for overlap detection

#### 2️⃣ Minimum 4-Hour Duration
- Ensures shift duration is at least 4 hours (240 minutes)
- Calculates duration from start and end times
- Prevents invalid short shifts

#### 3️⃣ Role-Based Visibility
- Normal users see only their assigned shifts
- Admins see all shifts in the system
- Automatic filtering based on user role
- Secure API filtering on backend

---

## 🛠 Tech Stack

### Backend
| Technology | Version | Purpose |
|-----------|---------|---------|
| Node.js | 18+ | Runtime environment |
| Express.js | 5.x | Web framework |
| MongoDB | Latest | NoSQL database |
| Mongoose | 9.x | ODM for MongoDB |
| JWT | 9.x | Authentication |
| bcryptjs | 3.x | Password hashing |
| CORS | 2.x | Cross-origin requests |
| dotenv | 17.x | Environment variables |

### Frontend
| Technology | Version | Purpose |
|-----------|---------|---------|
| React | 18.x | UI framework |
| React Router | 6.x | Client-side routing |
| Axios | 1.x | HTTP client |
| Tailwind CSS | 3.x | CSS framework |
| date-fns | 2.x | Date utilities |

### Database
- **MongoDB Atlas** (Cloud) - MongoDB hosting
- **MongoDB Compass** (Optional) - GUI for database management

---

## 📁 Project Structure

```
employee-shift-board/
│
├── shift-board-backend/          # Backend application
│   ├── config/
│   │   ├── db.js                # MongoDB connection
│   │   └── seedData.js           # Initial demo data
│   ├── controllers/
│   │   ├── authController.js     # Login logic
│   │   ├── employeeController.js # Employee management
│   │   └── shiftController.js    # Shift management
│   ├── middleware/
│   │   ├── auth.js               # JWT verification
│   │   └── validation.js         # Input validation
│   ├── models/
│   │   ├── User.js               # User schema
│   │   ├── Employee.js           # Employee schema
│   │   └── Shift.js              # Shift schema
│   ├── routes/
│   │   ├── auth.js               # Auth endpoints
│   │   ├── employees.js          # Employee endpoints
│   │   └── shifts.js             # Shift endpoints
│   ├── services/
│   │   ├── authService.js        # Auth logic
│   │   ├── employeeService.js    # Employee logic
│   │   └── shiftService.js       # Shift logic
│   ├── .env                      # Environment variables
│   ├── app.js                    # Express app setup
│   ├── server.js                 # Server entry point
│   └── package.json              # Dependencies
│
├── shift-board-frontend/         # Frontend application
│   ├── public/                   # Static files
│   ├── src/
│   │   ├── pages/
│   │   │   ├── LoginPage.jsx     # Login page
│   │   │   ├── DashboardPage.jsx # Main dashboard
│   │   │   └── NotFoundPage.jsx  # 404 page
│   │   ├── components/
│   │   │   ├── Navbar.jsx        # Navigation bar
│   │   │   ├── ProtectedRoute.jsx # Route protection
│   │   │   ├── ShiftForm.jsx     # Shift creation form
│   │   │   ├── ShiftTable.jsx    # Shifts display
│   │   │   └── EmployeeSelect.jsx # Employee selector
│   │   ├── services/
│   │   │   └── api.js            # API calls
│   │   ├── context/
│   │   │   └── AuthContext.jsx   # Auth state management
│   │   ├── App.jsx               # Main app component
│   │   ├── index.css             # Global styles
│   │   └── index.js              # React entry point
│   ├── .env                      # Environment variables
│   ├── tailwind.config.js        # Tailwind config
│   ├── postcss.config.js         # PostCSS config
│   └── package.json              # Dependencies
│
└── README.md                     # This file
```

---

## 🚀 Installation & Setup

### Prerequisites
- **Node.js** 18+ ([Download](https://nodejs.org/))
- **npm** 9+ (comes with Node.js)
- **MongoDB Atlas Account** ([Sign up free](https://www.mongodb.com/cloud/atlas))
- **Git** ([Download](https://git-scm.com/))

### Step 1: Clone Repository

```bash
git clone https://github.com/ShreyashPatil530/employee-shift-board.git
cd employee-shift-board
```

### Step 2: Setup Backend

```bash
# Navigate to backend
cd shift-board-backend

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
MONGODB_URI=mongodb+srv://shreyashpatil530_db_user:YMaEOp9V36DfHWYi@cluster0.9alzg2r.mongodb.net/?appName=Cluster0
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production_12345
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
EOF

# Start backend server
npm run dev
```

Backend will run on: **http://localhost:5000**

### Step 3: Setup Frontend

```bash
# Navigate to frontend (in new terminal)
cd shift-board-frontend

# Install dependencies
npm install

# Create .env file
cat > .env << EOF
REACT_APP_API_URL=http://localhost:5000/api
EOF

# Start frontend server
npm start
```

Frontend will run on: **http://localhost:3000**

---

## 📡 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Authentication Endpoints

#### Login
```http
POST /auth/login
Content-Type: application/json

{
  "email": "hire-me@anshumat.org",
  "password": "HireMe@2025!"
}
```

**Response:**
```json
{
  "success": true,
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "507f1f77bcf86cd799439011",
    "email": "hire-me@anshumat.org",
    "role": "admin"
  }
}
```

### Employee Endpoints

#### Get All Employees
```http
GET /employees
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Admin User",
      "code": "EMP001",
      "department": "Management",
      "userId": {
        "_id": "507f1f77bcf86cd799439012",
        "email": "hire-me@anshumat.org",
        "role": "admin"
      }
    }
  ]
}
```

#### Create Employee (Admin Only)
```http
POST /employees
Authorization: Bearer {token}
Content-Type: application/json

{
  "name": "John Doe",
  "code": "EMP003",
  "department": "Sales",
  "userId": "507f1f77bcf86cd799439012"
}
```

### Shift Endpoints

#### Create Shift (Admin Only)
```http
POST /shifts
Authorization: Bearer {token}
Content-Type: application/json

{
  "employeeId": "507f1f77bcf86cd799439011",
  "date": "2025-12-15",
  "startTime": "09:00",
  "endTime": "17:00"
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439013",
    "employeeId": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Admin User",
      "code": "EMP001"
    },
    "date": "2025-12-15T00:00:00.000Z",
    "startTime": "09:00",
    "endTime": "17:00",
    "createdAt": "2025-11-30T08:00:00.000Z"
  }
}
```

#### Get Shifts
```http
GET /shifts?employeeId={employeeId}&date={date}
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "data": [
    {
      "_id": "507f1f77bcf86cd799439013",
      "employeeId": {
        "_id": "507f1f77bcf86cd799439011",
        "name": "Admin User",
        "code": "EMP001"
      },
      "date": "2025-12-15T00:00:00.000Z",
      "startTime": "09:00",
      "endTime": "17:00"
    }
  ]
}
```

#### Delete Shift (Admin Only)
```http
DELETE /shifts/{shiftId}
Authorization: Bearer {token}
```

**Response:**
```json
{
  "success": true,
  "message": "Shift deleted"
}
```

### Error Responses

```json
{
  "success": false,
  "message": "Shift must be at least 4 hours"
}
```

```json
{
  "success": false,
  "message": "Employee has overlapping shift on this date"
}
```

```json
{
  "success": false,
  "message": "Admin access required"
}
```

---

## 🔑 Demo Credentials

| Role | Email | Password |
|------|-------|----------|
| **Admin** | `hire-me@anshumat.org` | `HireMe@2025!` |
| **User** | `user@example.com` | `Password@123` |

> These credentials are pre-seeded in the database on first connection.

---

## 📊 Business Rules Validation

### Rule 1: No Overlapping Shifts
```
Employee: John Doe
Date: 2025-12-15

❌ INVALID:
- Shift 1: 09:00 - 13:00
- Shift 2: 12:00 - 17:00 (Overlap detected)

✅ VALID:
- Shift 1: 09:00 - 13:00
- Shift 2: 13:00 - 17:00 (No overlap)
```

### Rule 2: Minimum 4 Hours
```
❌ INVALID:
- Start: 09:00, End: 12:00 (3 hours - Too short)

✅ VALID:
- Start: 09:00, End: 13:00 (4 hours - Minimum met)
- Start: 09:00, End: 17:00 (8 hours - Valid)
```

### Rule 3: Role-Based Visibility
```
Admin User (hire-me@anshumat.org):
- Can see all shifts in system
- Can create/delete shifts
- Can manage all employees

Normal User (user@example.com):
- Can only see their own shifts
- Cannot create/delete shifts
- Limited access
```

---

## 🧪 Testing with Postman

### Import Collection
1. Download `Shift-Board-API.postman_collection.json` (if provided)
2. Open Postman
3. Click `Import` → Select the collection
4. All API endpoints are ready to test

### Manual Testing Steps

1. **Login as Admin**
   - POST `/auth/login`
   - Use admin credentials
   - Copy the token

2. **Create a Shift**
   - POST `/shifts`
   - Add `Authorization: Bearer {token}`
   - Fill shift details
   - Submit

3. **View Shifts**
   - GET `/shifts`
   - Add token
   - View all shifts

4. **Delete a Shift**
   - DELETE `/shifts/{shiftId}`
   - Add token
   - Confirm deletion

---

## 🐛 Known Issues

None currently reported. If you find any issues, please open a GitHub issue.

---

## 🚀 Deployment

### Deploy Backend (Heroku/Render)
```bash
# Ensure .env is not pushed
# Push to hosting platform
git push heroku main
```

### Deploy Frontend (Vercel/Netlify)
```bash
# Build
npm run build

# Deploy
# Upload 'build' folder to Vercel/Netlify
```

---

## 📝 Environment Variables

### Backend (.env)
```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=7d
PORT=5000
NODE_ENV=development
CORS_ORIGIN=http://localhost:3000
```

### Frontend (.env)
```env
REACT_APP_API_URL=http://localhost:5000/api
```

---

## 🔒 Security Features

- ✅ JWT token-based authentication
- ✅ Bcryptjs password hashing
- ✅ CORS enabled for secure cross-origin requests
- ✅ Protected API endpoints with middleware
- ✅ Input validation and sanitization
- ✅ Role-based access control (RBAC)
- ✅ Environment variables for sensitive data

---

## 📚 Learning Resources

- [Express.js Documentation](https://expressjs.com/)
- [MongoDB Documentation](https://docs.mongodb.com/)
- [React Documentation](https://react.dev/)
- [JWT Authentication](https://jwt.io/)
- [Tailwind CSS](https://tailwindcss.com/)

---

## 📄 License

This project is licensed under the **MIT License** - see the [LICENSE](LICENSE) file for details.

---

## 👤 Author

**Shreyash Patil**
- GitHub: [@ShreyashPatil530](https://github.com/ShreyashPatil530)
- Email: shreyashpatil530@gmail.com

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## ✨ Acknowledgments

- JWT authentication patterns
- REST API best practices
- MongoDB best practices
- React hooks patterns
- Tailwind CSS framework

---

## 📞 Support

For support, email shreyashpatil530@gmail.com or open an issue on GitHub.

---

**Last Updated:** November 30, 2025

**Status:** ✅ Production Ready
