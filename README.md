# CET Counselling & Seat Allocation Platform

A full-stack application for managing college counselling and student seat allotments. Administrators can maintain colleges, branches, students, and course preferences, run a rank-based seat-allocation process, and email provisional allotment letters as PDF attachments.

The project combines a React front end with a FastAPI backend and a PostgreSQL database. It demonstrates a layered application structure, cookie-based authentication, data management, seat allocation, and automated email reporting.

## Project Overview

The application supports:
- User registration and login
- College and branch management
- Student record management and lookup
- Student course and branch preferences
- Counselling rounds and seat allocation
- Rank- and preference-based allocation against available branch seats
- Seat-allocation lookup
- PDF allotment-letter generation and email delivery
- Separate student and administrator dashboard experiences

## Tech Stack

### Frontend
- React 19
- Vite
- React Router DOM
- Axios
- Custom CSS

### Backend
- Python
- FastAPI
- SQLAlchemy
- PostgreSQL with Psycopg2
- JWT authentication stored in an HTTP-only cookie
- Matplotlib for PDF allotment letters
- SMTP for email delivery

### Tools and Infrastructure
- Python-dotenv for environment configuration
- Uvicorn ASGI server
- npm for frontend dependencies and scripts
- Vercel and Render URLs configured for hosted frontend and API use

## Architecture

The project follows a layered application design:

- Frontend: React pages, components, hooks, and API services under `front-end/src`
- Backend: FastAPI application and database setup under `app/`
- Models: SQLAlchemy entities under `app/models/`
- Repositories: database access under `app/repositories/`
- Services: application logic under `app/services/`
- Controllers: FastAPI routers under `app/controllers/`
- Schemas: request and response validation under `app/schemas/`
- Middleware: authentication and request authorization under `app/middleware/`

## Features

### 1. User Authentication
- Register users and sign in with a username and password
- Hash passwords before storing them
- Issue JWT access tokens in HTTP-only cookies
- Require authentication for application data and management endpoints

### 2. College and Branch Management
- Create and search colleges
- Create, search, update, and delete college branches
- Track total and available seats for each branch

### 3. Student and Preference Management
- Create, search, update, and delete student records
- Record student preferences for college branches
- Update or remove saved preferences

### 4. Counselling and Seat Allocation
- Execute the allocation process using student rank, preference order, and available branch seats
- Store successful allotments and update remaining seat counts
- Look up allocations by counselling or student ID

### 5. Allotment Letters and Email
- Generate a provisional seat-allotment letter as a PDF
- Email eligible students their allotment letters for a counselling round
- Submit the email dispatch operation as a background task

## Application Workflow

1. A user registers or signs in through the React application.
2. The frontend sends requests to the FastAPI backend, including the authentication cookie when available.
3. Administrators manage colleges, branches, students, and student preferences.
4. The backend processes student ranks and preferences against branch seat availability.
5. Allocation results are stored and can be retrieved through the dashboard or API.
6. An administrator can initiate email delivery of PDF allotment letters for a counselling round.

## Project Structure

```text
Centralized-College-Counseling-Seat-Allocation-Platform/
├── app/
│   ├── controllers/
│   ├── middleware/
│   ├── models/
│   ├── repositories/
│   ├── schemas/
│   ├── services/
│   ├── cors_config.py
│   ├── database.py
│   ├── main.py
│   ├── security.py
│   └── user_auth.py
├── front-end/
│   ├── src/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── middleware/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   ├── package.json
│   ├── package-lock.json
│   ├── vite.config.js
│   └── index.html
├── .env
├── .gitignore
├── requirements.txt
└── README.md
```

## Backend API Highlights

The API is organized around these endpoint groups:

- Authentication: `/auth/register`, `/auth/login`, `/auth/logout`, `/auth/user`
- Colleges: `/colleges/`, `/colleges/search`, `/colleges/{college_id}`
- Branches: `/branches/`, `/branches/search`, `/branches/{branch_id}`
- Students: `/students/`, `/students/search`, `/students/{student_id}`
- Course preferences: `/course_preferences/`, `/course_preferences/{student_preferences_id}`
- Counselling: `/counselling_details/execute`
- Seat allocations: `/seat_allocations/{counselling_id}`, `/seat_allocations/search/student/{student_id}`
- Email: `/Email/execute/{round_id}`

The interactive API documentation is available at `/docs` when the backend is running.

## Frontend Highlights

The frontend includes:
- Login and registration
- Home and navigation pages
- Student dashboard, student details, and preference management
- Administrator dashboard
- College, branch, student, preference, and counselling management
- Seat-allocation lookup and management
- Email dispatch controls

The frontend uses React Router for navigation and Axios services to communicate with the backend.

## Environment Configuration

Create a root `.env` file for backend configuration:

```env
DATABASE_URL=postgresql+psycopg2://USER:PASSWORD@HOST:5432/DATABASE
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USERNAME=your-sender@example.com
SMTP_PASSWORD=your-email-app-password

# Optional: comma-separated allowed browser origins
CORS_ALLOWED_ORIGINS=http://localhost:5173,http://127.0.0.1:5173
```

`DATABASE_URL` must point to a PostgreSQL database. SMTP credentials are needed to send allotment emails. The application also supports `CORS_ALLOWED_ORIGIN_REGEX` for configuring an allowed-origin pattern.

For local frontend development, create `front-end/.env` and set the API URL:

```env
VITE_API_BASE_URL=http://127.0.0.1:8000
```

When `VITE_API_BASE_URL` is not set, the frontend uses the hosted API URL configured in its client. Never commit real database or email credentials; keep local `.env` files private and use deployment environment settings for hosted environments.

## Setup Instructions

### 1. Clone the repository

```bash
git clone https://github.com/Harsha4576dks/Centralized-College-Counseling-Seat-Allocation-Platform.git
cd Centralized-College-Counseling-Seat-Allocation-Platform
```

### 2. Set up the backend

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
pip install -r requirements.txt
```

Create the root `.env` file with a valid database URL. Add SMTP settings if you plan to use allotment email delivery.

Run the API from the repository root:

```powershell
python -m uvicorn app.main:app --reload --host 127.0.0.1 --port 8000
```

### 3. Set up the frontend

In a second terminal:

```powershell
cd front-end
npm ci
npm run dev
```

The local application is available at:
- Frontend: `http://localhost:5173`
- Backend API: `http://127.0.0.1:8000`
- API documentation: `http://127.0.0.1:8000/docs`

## Local Development Notes

- The backend reads configuration from the root `.env` file.
- SQLAlchemy creates tables from the registered models at application startup.
- CORS allows the local Vite development origins by default; configure `CORS_ALLOWED_ORIGINS` when using a different frontend origin.
- The frontend API client includes credentials so browser requests can send the authentication cookie.
- The login cookie is HTTP-only and marked secure; use an HTTPS deployment for production.
- The hosted frontend and backend URLs are configured in the CORS and frontend API-client settings and may change independently of this README.

## Project Strengths

This project demonstrates:
- Full-stack development with React and FastAPI
- Layered backend architecture with repositories and services
- Relational data modeling for students, colleges, branches, preferences, and allocations
- Authentication, database-backed workflows, and API integration
- Rank- and preference-based seat allocation
- PDF generation and SMTP email delivery
- Separate dashboard workflows for students and administrators

## Potential Future Enhancements

- Add role-based authorization for administrator and student operations
- Use database migrations instead of creating tables automatically at startup
- Add automated backend and frontend test coverage
- Support pagination, sorting, and richer search filters
- Add allocation audit history and configurable counselling-round handling
- Improve validation, error reporting, and email-delivery status tracking
- Document and automate production deployment

## Summary

The CET Counselling & Seat Allocation Platform brings college and student data management, course preferences, seat allocation, and allotment-letter delivery into one full-stack application. Its React frontend and layered FastAPI backend provide an end-to-end counselling workflow that can be run locally and configured for hosted use.
