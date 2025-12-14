# Sweet Shop Management System

## 1. Project Explanation

The Sweet Shop Management System is a full-stack MERN application developed using MongoDB, Express.js, React.js, and Node.js. The project is designed to manage sweets inventory and user interactions through a secure and role-based system.

The backend provides RESTful APIs for authentication, authorization, and business logic, while the frontend (built with React + Vite) consumes these APIs to deliver a responsive and user-friendly interface.

The system supports two roles:

User: Can register, log in, view sweets, search/filter, and purchase sweets.

Admin: Can add, update, delete, and restock sweets.

Security is handled using JWT-based authentication, and the application follows clean architecture with proper separation of concerns between frontend and backend.

Backend Overview

The backend is built using Node.js and Express.js and is responsible for:

User registration and login

JWT-based authentication and authorization

Role-based access control (Admin/User)

CRUD operations for sweets

Database interaction and validation

The backend runs independently and exposes REST APIs that are consumed by the frontend.

Frontend Overview

The frontend is built using React.js with Vite, providing a fast and modern development experience.

Key frontend features include:

Login and Registration pages

Sweets listing with search and filter

Purchase functionality for users

Admin dashboard for managing sweets

Protected routes based on authentication state

The frontend communicates with the backend using Axios and environment-based configuration.

## 2. Tech Stack

### Frontend

* React.js
* Vite
* JavaScript
* Axios

### Backend

* Node.js
* Express.js
* Database (MongoDB / SQL – as implemented)
* JWT Authentication

### My AI-Usage

* GitHub Copilot

* **Frontend:** React.js, Vite, JavaScript

* **State Management:** React Context API

* **HTTP Client:** Axios

* **Backend:** Node.js + Express (separate repository/folder)

* **Authentication:** JWT

* **AI Tool Used:** GitHub Copilot

---

## 3. Folder Structure (Frontend)

frontend/
│
├── public/
├── src/
│   ├── api/
│   ├── assets/
│   ├── components/
│   ├── context/
│   ├── pages/
│   ├── styles/
│   ├── App.jsx
│   ├── main.jsx
│   ├── App.css
│   └── index.css
│
├── package.json
└── vite.config.jsv

backend/
│
├── src/
│   ├── config/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   └── routes/
│
├── server.js
├── seed.js
├── db-check.js
├── .env
├── .env.example
├── package.json
└── README.md
```

---

## 4. Environment Configuration

Create a `.env` file in the frontend root:

```env
VITE_API_URL=http://localhost:5000/api
```

---

## 5. How to Run the Project Locally

### Backend Setup

```bash
cd backend
npm install
```

#### Environment Variables (Backend)

Create a `.env` file in the backend root:

```env
PORT=5000
DATABASE_URL=your_database_url
JWT_SECRET=your_jwt_secret
```

#### Run Backend

```bash
docker compose up -d
npm run seed
npm run dev
```

Backend will run at:

```
http://localhost:5000
```

```bash
cd backend
npm install
docker compose up -d
npm run seed
npm run dev
```

Backend will run at:

```
http://localhost:5000
```

---

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will run at:

```
http://localhost:5173
```

The frontend uses Vite proxy to forward `/api` requests to the backend.

---

## 6. Application Screenshots

> 📸 Add screenshots of your final application below

* **Login Page:**

  *(Insert Screenshot Here)*

* **Dashboard / Sweets List:**

  *(Insert Screenshot Here)*

* **Admin Panel:**

  *(Insert Screenshot Here)*

---

## 7. My AI Usage (Mandatory)

### AI Tool Used

* **GitHub Copilot**

### How I Used AI

**Frontend:**

* Generated initial React component boilerplate
* Assisted with Axios service structure and hooks

**Backend:**

* Generated boilerplate for Express routes, controllers, and services
* Helped with basic JWT authentication structure and middleware patterns

All AI-generated code was reviewed, modified, and validated manually.

### Reflection on AI Usage

GitHub Copilot significantly improved development speed for both frontend and backend by reducing repetitive coding effort. I ensured complete ownership of the solution by understanding every line of code, adding custom business logic, validations, and security checks. AI was used responsibly as an assistant, not as a source of copied solutions.

### AI Tool Used

* **GitHub Copilot**

### How I Used AI

* Used GitHub Copilot to generate initial boilerplate code for React components and service files.
* Assisted in writing repetitive code patterns such as API calls and basic component structure.
* Used suggestions as a reference, then manually modified logic, validations, and UI behavior.

### Reflection on AI Usage

GitHub Copilot helped improve development speed and reduced time spent on repetitive tasks. However, I ensured complete ownership of the code by reviewing, understanding, and customizing every AI-generated suggestion. AI was used as a productivity tool, not as a replacement for my own problem-solving and development skills.

---

## 8. Git Commit Co-Author Declaration

Some commits include AI disclosure using a co-author trailer:

```text
feat: Implement user registration endpoint

Used GitHub Copilot to generate the initial boilerplate for the controller and service, then manually added validation logic.

Co-authored-by: GitHub Copilot <copilot@users.noreply.github.com>
```

This ensures transparency and responsible AI usage.

---

## 9. Test Report

### Test Summary

* Unit tests executed successfully for core components and services.
* API integration tested using mocked responses.
* Authentication and protected routes validated.

**Overall Result:** ✅ All tests passed without critical issues.

Screen-Shots:

All Screen-Shots are in below folderlink

📁 [src/assets](./src/assets)