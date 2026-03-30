import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Booking from "./pages/Booking";
import Confirmation from "./pages/Confirmation";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/confirmation" element={<Confirmation />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;