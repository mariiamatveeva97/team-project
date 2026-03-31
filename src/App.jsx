import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Layout from "./components/Layout";

import Home from "./pages/Home";
import Booking from "./pages/Booking";
import BookingConfirmation from "./pages/BookingConfirmation";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import HelpCenter from "./pages/HelpCenter";

function App() {
    return (
        <Router>
        <Routes>

            {/* Layout Wrapper */}
            <Route element={<Layout />}>

            {/* Pages */}
            <Route path="/" element={<Home />} />
            <Route path="/booking" element={<Booking />} />
            <Route path="/confirmation" element={<BookingConfirmation />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/help-center" element={<HelpCenter />} />

            </Route>

        </Routes>
        </Router>
    );
}

export default App;
