# SmartBooking

**SmartBooking** is a modern, full-stack appointment scheduling application designed to make beauty and wellness bookings seamless. Built with React for the frontend and a Node.js/Express backend, it allows users to browse services, register/login, and manage their personal appointments in real-time.

## Key Features

**User Authentication:** Secure registration and login with JWT-based sessions.

**Service Catalog:** Browse through available beauty services with a real-time search filter.

**Booking Management:**
- Book appointments for your favorite services.
- Reschedule appointments with ease.
- Cancel bookings directly from the user dashboard.

**Admin Dashboard:** Manage all bookings and read contact messages, with read/unread tracking.

**Responsive UI:** A sleek, mobile-friendly design using Tailwind CSS.

**Professional UX:** Integrated with SweetAlert2 for elegant notifications and alerts.

## Tech Stack

**Frontend:** React, React Router, Tailwind CSS, Lucide Icons, Axios.

**Backend:** Node.js, Express, MongoDB.

**Authentication:** JWT (JSON Web Tokens) with rate-limited login (10 attempts per 15 min).

**Alerts:** SweetAlert2.

---

## Getting Started

### Prerequisites

- Node.js installed on your machine.
- MongoDB running (local or cloud via MongoDB Atlas).

### Installation

1. **Clone the repository:**
```bash
git clone https://github.com/mariiamatveeva97/team-project.git
cd team-project
```

2. **Setup Backend:**
```bash
cd backend
cp .env.example .env       # then edit .env with your values
npm install
npm run dev
```

3. **Setup Frontend** (open a new terminal from the repo root):
```bash
# from the repo root (not the backend folder)
npm install
npm start
```

The app will open at `http://localhost:3000`. The backend runs on port `7123`.

---

## Environment Variables

Backend — create `backend/.env` based on `backend/.env.example`:

| Variable | Description |
|---|---|
| `MONGO_URI` | MongoDB connection string |
| `JWT_SECRET` | Long random secret for signing tokens |
| `PORT` | Port for the backend server (default: 7123) |
| `ALLOWED_ORIGIN` | Comma-separated frontend origins (default: http://localhost:3000) |

Frontend — create `.env` in the repo root (optional):

| Variable | Description |
|---|---|
| `REACT_APP_API_URL` | Backend API URL (default: http://localhost:7123/api) |

---

## Security Features

- **Protected Routes:** Only authenticated users can access booking and dashboard pages via ProtectedRoute wrappers.
- **Rate Limiting:** Login endpoint is limited to 10 attempts per 15 minutes to prevent brute force.
- **Input Validation:** Email format, password length (min 6), and required fields are validated on both frontend and backend.
- **CORS:** Restricted to configured origins only.
- **Axios Interceptors:** Automatic injection of `Authorization: Bearer <token>` headers and auto-logout on 401.
- **Token Expiration:** Automatic logout and redirect if the server returns a 401 Unauthorized status.

---

*Built with passion for scalability and user experience.*
