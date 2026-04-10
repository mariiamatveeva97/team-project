#SmartBooking 💅✨
**SmartBooking** is a modern, full-stack appointment scheduling application designed to make beauty and wellness bookings seamless. Built with React for the frontend and a Node.js/Express backend, it allows users to browse services, register/login, and manage their personal appointments in real-time.

## Key Features
**User Authentication:** Secure registration and login with JWT-based sessions.

**Service Catalog:** Browse through available beauty services with a real-time search filter.

Booking Management:

Book appointments for your favorite services.

Reschedule appointments with ease.

Cancel bookings directly from the user dashboard.

**Responsive UI:** A sleek, mobile-friendly design using Tailwind CSS.

**Professional UX:** Integrated with SweetAlert2 for elegant notifications and alerts.

## Versatility (Multi-Purpose Engine)
One of the core strengths of this project is its **highly adaptable architecture.** While the default theme is set for beauty services, the underlying engine can be easily repurposed for any booking-based business, such as:

**Medical Clinics:** Appointment scheduling for doctors.

**Auto Repair:** Booking time slots for car maintenance.

**Tutoring/Education:** Managing private lessons.

**Real Estate:** Scheduling property viewings.

**Fitness:** Reserving slots for gym classes or personal training.

## Tech Stack
**Frontend:** React, React Router, Tailwind CSS, Lucide Icons, Axios.

**Backend:** Node.js, Express, MongoDB.

**Authentication:** JWT (JSON Web Tokens).

**Alerts:** SweetAlert2.

---

## Getting Started
### Prerequisites
* Node.js installed on your machine.

* MongoDB running (local or cloud).

### Installation
1. **Clone the repository:**
```Bash
git clone https://github.com/mariiamatveeva97/team-project.git
cd team-project
```
2. **Setup Frontend:**
```Bash
cd client
npm install
npm start
```

3. **Setup Backend:**
```Bash
cd server
npm install
npm run dev
```

---

## Security Features
* **Protected Routes:** Only authenticated users can access the booking and dashboard pages via ProtectedRoute wrappers.

* **Axios Interceptors:** Automatic injection of `Authorization: Bearer <token> headers for every API request.`

* **Token Expiration:** Automatic logout and redirect if the server returns a 401 Unauthorized status.

## Preview
* **Dashboard:** View all upcoming appointments.

* **Service List:** Filter by keywords or categories instantly.

* **Booking Flow:** Select date and time with a user-friendly modal.

---

*Built with passion for scalability and user experience.*
