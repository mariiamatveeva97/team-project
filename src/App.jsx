import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

import Layout from "./components/Layout";

import Home from "./pages/Home";
import Booking from "./pages/Booking";
import BookingConfirmation from "./pages/BookingConfirmation";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import MyBookings from "./pages/MyBookings";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";


function App() {
    return (
        <AuthProvider>
            <Router>
                <ScrollToTop />
                <Routes>
                    {/* Layout Wrapper */}
                    <Route element={<Layout />}>
                        {/* Pages */}
                        <Route path="/" element={<Home />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/login" element={<Login />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/confirmation" element={<BookingConfirmation />} />
                        <Route path="/contact" element={<Contact />} />
                        {/* Protected Routes */}
                        <Route path="/my-bookings" element={<ProtectedRoute><MyBookings /></ProtectedRoute>} />
                        <Route path="/booking" element={<ProtectedRoute><Booking /></ProtectedRoute>} />
                    </Route>
                </Routes>
            </Router>
        </AuthProvider>
    );
}

export default App;
