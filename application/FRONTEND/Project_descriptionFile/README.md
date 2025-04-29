## Hodoor

## 📌 Project Description

**Hudoorr** is a full-stack web application designed to streamline student attendance management in educational institutions. It serves three main user roles:

🧑‍🎓 **Students**: Can view their attendance history and receive notifications when marked absent.

🧑‍🏫 **Teachers**: Can view attendance reports and access saved records.

🛂 **Attendance Officers**: Responsible for recording daily attendance, sending absence notifications, and exporting reports.

The frontend is built with React.js, using JWT authentication to handle secure logins and protected routes. It communicates with a Django REST Framework backend, and the entire app is Dockerized for smooth deployment and scalability.

---
## 🛠️ Frontend Technology Stack

- **React.js** – JavaScript library for building user interfaces.

---
## 🔗 Backend Repository

[Visit Backend Repository ]()

---

## 🐳 Docker Instructions

---

## 👥 User Roles and Permissions

| Role                | Permissions |
|---------------------|-------------|
| Attendance Officer   | Full CRUD access to classrooms, users, attendance, and reports. |
| Teacher              | Read-only access to their assigned classrooms and students’ attendance. |
| Student              | Read-only access to their personal attendance summary and notifications. |

---

## 🛣️ Routing Table

### 1. User Routes
| Route                   | Method | Description                   | Role Required      |
|--------------------------|--------|-------------------------------|--------------------|
| `/api/users`             | GET    | Get all users                 | Officer            |
| `/api/users/:id`         | GET    | Get user by ID                | Officer, Teacher   |
| `/api/users`             | POST   | Create new user               | Officer            |
| `/api/users/:id`         | PUT    | Update user                   | Officer, Self-update |
| `/api/users/:id`         | DELETE | Delete user                   | Officer            |

---

### 2. RoleModel Routes
| Route                   | Method | Description                   | Role Required      |
|--------------------------|--------|-------------------------------|--------------------|
| `/api/roles`             | GET    | Get all roles                 | Officer            |
| `/api/roles/:id`         | GET    | Get role by ID                | Officer            |
| `/api/roles`             | POST   | Create new role               | Officer            |
| `/api/roles/:id`         | PUT    | Update role                   | Officer            |
| `/api/roles/:id`         | DELETE | Delete role                   | Officer            |

> **Note:** There are only 3 role types: Officer, Teacher, Student.

---

### 3. ClassRoom Routes
| Route                   | Method | Description                   | Role Required      |
|--------------------------|--------|-------------------------------|--------------------|
| `/api/classrooms`        | GET    | Get all classrooms            | Officer, Teacher   |
| `/api/classrooms/:id`    | GET    | Get classroom by ID           | Officer, Teacher   |
| `/api/classrooms`        | POST   | Create new classroom          | Officer            |
| `/api/classrooms/:id`    | PUT    | Update classroom              | Officer            |
| `/api/classrooms/:id`    | DELETE | Delete classroom              | Officer            |

---

### 4. AttendanceProcess Routes
| Route                   | Method | Description                          | Role Required      |
|--------------------------|--------|--------------------------------------|--------------------|
| `/api/attendance`        | GET    | Get all attendance records          | Officer, Teacher   |
| `/api/attendance/:id`    | GET    | Get attendance record by ID          | Officer, Teacher   |
| `/api/attendance`        | POST   | Mark attendance for a classroom      | Officer            |
| `/api/attendance/:id`    | PUT    | Update attendance status             | Officer            |
| `/api/attendance/:id`    | DELETE | Delete attendance record             | Officer            |

---

### 5. Report Routes
| Route                   | Method | Description                   | Role Required      |
|--------------------------|--------|-------------------------------|--------------------|
| `/api/reports`           | GET    | Get all reports               | Officer, Teacher   |
| `/api/reports/:id`       | GET    | Get report by ID              | Officer, Teacher   |
| `/api/reports`           | POST   | Create new report             | Officer            |
| `/api/reports/:id`       | DELETE | Delete report                 | Officer            |

---

## 🏗️ Database Diagram (ERD)

![ERD Diagram](/application/FRONTEND/Project_descriptionFile/ERD.png)

---

## 📦 Future Icebox Features

- Add **Guardian Portal** to notify parents about attendance.
- Admin Dashboard with advanced filters and statistics.
- SMS / Email notifications for absentees.
- Export attendance reports to PDF/Excel.
- Dark Mode and Theme Customization.

---

## ✨ Final Notes

This project is being prepared for official submission to the **Ministry of Education** after the completion of the software development bootcamp.  
Thanks for following the journey of **Hodoor**! 
