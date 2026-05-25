# HRMS — Human Resource Management System

A full-stack HR management platform built with Next.js, Express, Prisma, PostgreSQL, Socket.IO, and Gemini AI. It brings core HR workflows into a single role-based web application: employee management, attendance tracking, leave management, payroll processing, recruitment, performance reviews, announcements, real-time notifications, reports, and an AI-powered HR assistant.

![Dashboard](frontend/src/assets/dashboard.png)

## Features

### Authentication & Access Control
- Secure login, registration, logout, forgot password, and reset password
- JWT-based API sessions with custom HMAC-SHA256 signing
- Four-tier role system: Super Admin, HR Admin, Manager, Employee
- Granular permission-based authorization on both backend and frontend
- Role-aware sidebar navigation and protected pages

### Employee Management
- Full employee CRUD with employee codes, statuses, and contact details
- Department and designation management
- Manager/reporting hierarchy
- Employee profile self-service
- Emergency contacts and document metadata

### Attendance & Time
- Clock in / clock out with work mode (office / work-from-home)
- Attendance history and organization-wide reports
- Shift settings with late and half-day thresholds
- Holiday management

### Leave Management
- Configurable leave types
- Employee leave applications with day-type selection
- Manager/HR approval and rejection workflows
- Leave balance tracking per employee, type, and year
- Automatic balance updates on approval and rejection
- Real-time leave notifications

### Payroll
- Salary setup with base pay, allowances, deductions, and effective dates
- Monthly payroll generation
- Per-employee payroll items and payslip records
- Payslip download support
- Payroll reports
- Real-time payslip notifications

### Recruitment
- Job opening management with status tracking
- Candidate profiles
- Job applications with pipeline stages
- Interview scheduling with mode selection
- Offer tracking and management
- Real-time interviewer notifications

### Performance Management
- Goal setting and progress tracking
- Performance review cycles
- Peer and manager feedback
- Appraisal history
- Employee and manager scoped views

### Dashboard & Reports
- Role-aware dashboard with KPI cards
- Employee, attendance, leave, and payroll reports
- In-app notifications with read state
- Published announcements filtered by audience
- Optional Redis caching for dashboard data

### Real-Time Notifications
- Socket.IO-based notification push to individual users
- Events for leave decisions, payslips, interviews, announcements
- TanStack Query cache sync without page refresh

### AI HR Assistant
- Floating chat widget powered by Gemini API
- Tool-calling functions backed by real employee data:
  - `get_leave_balance` — Query leave balances
  - `get_next_payroll` — Query upcoming payroll info
  - `get_manager` — Query reporting manager
- Responses scoped to the authenticated employee
- Clear setup hint when Gemini is not configured

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Frontend | Next.js 15, React 19, TypeScript |
| Styling | Tailwind CSS |
| Forms | React Hook Form |
| API State | TanStack Query |
| Icons | Lucide React |
| Backend | Node.js, Express, TypeScript |
| Database | PostgreSQL |
| ORM | Prisma |
| Real-time | Socket.IO |
| AI | Gemini API with function calling |
| Validation | Zod |
| Security | Custom JWT, Helmet, CORS, scrypt password hashing |
| Cache | Optional Redis |
| Tooling | npm workspaces, Docker Compose, ESLint |

## Architecture

### System Overview

```mermaid
flowchart TD
    Browser["🌐 Browser"]
    NextJS["Next.js Frontend<br/>Port 3000"]
    Express["Express API<br/>Port 5000"]
    SocketIO["Socket.IO Server"]
    Prisma["Prisma ORM"]
    Postgres[("PostgreSQL")]
    Redis[("Redis Cache<br/>(Optional)")]
    Gemini["Gemini API"]

    Browser -->|REST + JWT| NextJS
    Browser -->|Socket.IO + JWT| SocketIO
    NextJS -->|HTTP Requests| Express
    Express --> Prisma
    Prisma --> Postgres
    Express -->|Dashboard Cache| Redis
    Express -->|Tool Calls| Gemini
    Express --- SocketIO
    SocketIO -->|Push Notifications| Browser
```

### API Request Flow

```mermaid
sequenceDiagram
    participant C as Client
    participant A as Auth Middleware
    participant P as Permission Middleware
    participant R as Route Handler
    participant DB as PostgreSQL
    participant S as Socket.IO

    C->>A: Request with Bearer token
    A->>A: Verify JWT signature + expiry
    A->>DB: Load user roles & permissions
    A->>P: Attach auth context
    P->>P: Check required permissions
    P->>R: Authorized request

    R->>DB: Prisma query
    DB-->>R: Data

    alt Notification event
        R->>S: Emit to user room
        S-->>C: Real-time update
    end

    R-->>C: JSON response
```

### Real-Time Notification Flow

```mermaid
sequenceDiagram
    participant FE as Frontend
    participant SO as Socket.IO
    participant BE as Backend
    participant DB as PostgreSQL

    FE->>SO: Connect with JWT
    SO->>SO: Verify token, join user room

    Note over BE: Leave approved / Payslip created / etc.
    BE->>DB: Save notification record
    BE->>SO: Emit to user room
    SO->>FE: Push notification event
    FE->>FE: Update TanStack Query cache
    FE->>FE: UI updates without refresh
```

### Database Schema

```mermaid
erDiagram
    User ||--o{ UserRole : has
    Role ||--o{ UserRole : assigned
    Role ||--o{ RolePermission : grants
    Permission ||--o{ RolePermission : granted_by
    User ||--o| Employee : "linked 1:1"

    Employee }o--o| Department : belongs_to
    Employee }o--o| Designation : holds
    Employee }o--o| Employee : "reports_to"

    Employee ||--o{ Attendance : records
    Employee ||--o{ LeaveRequest : submits
    Employee ||--o{ LeaveBalance : tracks
    Employee ||--o{ Salary : earns
    Employee ||--o{ Goal : sets
    Employee ||--o{ PerformanceReview : reviewed_in
    Employee ||--o{ Feedback : receives

    LeaveType ||--o{ LeaveRequest : categorizes
    LeaveType ||--o{ LeaveBalance : balances

    Payroll ||--o{ PayrollItem : contains
    PayrollItem ||--o| Payslip : generates

    Job ||--o{ JobApplication : receives
    Candidate ||--o{ JobApplication : applies
    JobApplication ||--o{ Interview : schedules
    JobApplication ||--o| Offer : results_in
```

## Project Structure

```
HRMS/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma
│   │   ├── seed.ts
│   │   └── migrations/
│   ├── scripts/
│   │   └── smoke-test.ts
│   └── src/
│       ├── config/
│       ├── lib/
│       ├── middleware/
│       ├── modules/
│       │   ├── auth/
│       │   ├── attendance/
│       │   ├── dashboard/
│       │   ├── employees/
│       │   ├── hr-assistant/
│       │   ├── leaves/
│       │   ├── notifications/
│       │   ├── payroll/
│       │   ├── performance/
│       │   ├── recruitment/
│       │   └── reports/
│       ├── types/
│       └── utils/
├── frontend/
│   └── src/
│       ├── app/
│       ├── assets/
│       ├── components/
│       ├── hooks/
│       ├── lib/
│       ├── providers/
│       └── types/
├── docker-compose.yml
├── package.json
├── plan.md
└── README.md
```

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+
- Docker Desktop (or a local PostgreSQL instance)
- Optional: Gemini API key for the HR assistant

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Windows:
```bash
copy backend\.env.example backend\.env
copy frontend\.env.example frontend\.env.local
```

macOS / Linux:
```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env.local
```

Key environment variables:

| File | Variable | Purpose |
|------|----------|---------|
| `backend/.env` | `DATABASE_URL` | PostgreSQL connection string |
| `backend/.env` | `JWT_SECRET` | Token signing key (32+ chars) |
| `backend/.env` | `CORS_ORIGIN` | Frontend URL for CORS |
| `backend/.env` | `GEMINI_API_KEY` | Optional, enables AI assistant |
| `backend/.env` | `REDIS_URL` | Optional, enables dashboard caching |
| `frontend/.env.local` | `NEXT_PUBLIC_API_URL` | Backend API URL |

### 3. Start PostgreSQL

```bash
npm run db:up
```

Or use your own PostgreSQL instance — create a database named `hrms` and update `DATABASE_URL`.

### 4. Prepare the Database

```bash
npm run prisma:generate
npm run prisma:migrate
npm run db:seed
```

Or use the shortcut for a fresh setup:
```bash
npm run setup:db
```

### 5. Start the Application

```bash
npm run dev
```

This starts both backend (port 5000) and frontend (port 3000) simultaneously.

```
Frontend:  http://localhost:3000
Backend:   http://localhost:5000/api
Health:    http://localhost:5000/api/health
```

## Demo Accounts

| Role | Email | Password |
|------|-------|----------|
| Super Admin | admin@hrms.local | Admin@12345 |
| HR Admin | hr@hrms.local | Hr@12345 |
| Manager | manager@hrms.local | Manager@12345 |
| Employee | employee@hrms.local | Employee@12345 |
| Employee | harsh@hrms.local | Employee@12345 |

These are for local development only. Replace all demo credentials before any production deployment.

## Validation

```bash
npm run typecheck    # TypeScript checks
npm run lint         # ESLint
npm run build        # Production build
npm run test:smoke   # End-to-end smoke test
npm run verify       # All of the above
```

## Inspecting Data

```bash
# Prisma Studio (visual database browser)
cd backend && npx prisma studio

# Or connect directly
psql "postgresql://postgres:postgres@localhost:5432/hrms"
```

## Deployment

### Backend → Render

The `render.yaml` blueprint creates a web service and PostgreSQL database. Set `CORS_ORIGIN` to your Vercel frontend URL.

### Frontend → Vercel

Import the repository, set root directory to `frontend`, and add:
```
NEXT_PUBLIC_API_URL=https://<your-render-service>.onrender.com/api
```

## Useful Commands

```bash
npm run dev              # Start both servers
npm run dev:frontend     # Frontend only
npm run dev:backend      # Backend only
npm run db:up            # Start PostgreSQL container
npm run db:down          # Stop PostgreSQL container
npm run db:seed          # Seed demo data
npm run prisma:migrate   # Run migrations
npm run prisma:generate  # Regenerate Prisma client
```

## Troubleshooting

| Problem | Solution |
|---------|----------|
| `npm run db:up` fails | Make sure Docker Desktop is running |
| Prisma can't connect | Check `DATABASE_URL` in `backend/.env` |
| Login fails for demo accounts | Re-run `npm run db:seed` |
| Frontend can't reach API | Verify `NEXT_PUBLIC_API_URL` is `http://localhost:5000/api` |
| HR assistant not working | Set `GEMINI_API_KEY` in `backend/.env` and restart |
| Real-time not updating | Verify backend is running and user is logged in |

## Author

Harsh
