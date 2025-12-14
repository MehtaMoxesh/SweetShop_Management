# Sweet Shop Management System

## 1. Project Explanation

This is a **full-stack Sweet Shop Management System** consisting of both **frontend and backend**, developed and integrated by me. The backend provides RESTful APIs for authentication, business logic, and data persistence, while the frontend (React + Vite) consumes these APIs to deliver a smooth user experience.

The system supports role-based access (User/Admin) and secure operations using JWT authentication.

---

## Backend Overview

The backend is built using **Node.js and Express.js** and is responsible for:

* User authentication (Register & Login)
* JWT-based authorization
* CRUD operations for sweets
* Role-based access control (Admin/User)
* Database interaction

The backend runs independently and exposes APIs consumed by the frontend.

---

## 1. Project Explanation

This project is the **frontend application** for the Sweet Shop Management System, built using **React.js with Vite**. It provides a fast, modern UI for users and admins to interact with the system.

Key features:

* User authentication (Login & Register)
* View sweets list
* Search and filter sweets
* Purchase sweets (user role)
* Admin dashboard for managing sweets (add, update, delete, restock)

The frontend communicates with a backend REST API using Axios and environment-based configuration.

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

---

## 10. Repository Link

> 🔗 Add your public Git repository link here

```
https://github.com/your-username/your-repo-name
```

---

## 11. Plagiarism Declaration

All code in this project is written by me. AI tools were used only for assistance and productivity. No code was copied from external repositories or developers. The final implementation reflects my own understanding and work.
