import { Link } from "react-router-dom";

function Header() {
    return (
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

                <Link to="/" className="text-xl font-bold tracking-tight text-slate-900">
                    Smart<span className="text-pink-600">Booking</span>
                </Link>

                <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
                    <Link to="/services" className="hover:text-pink-600 transition">Services</Link>
                    <Link to="/booking" className="hover:text-pink-600 transition">Booking</Link>
                    <Link to="/contact" className="hover:text-pink-600 transition">Contact</Link>
                </nav>

                <div className="flex items-center gap-3">
                    <button className="text-sm font-bold text-slate-400 hover:text-slate-600 transition">NL</button>

                    <Link
                        to="/booking"
                        className="px-6 py-2.5 bg-pink-600 text-white text-sm font-bold rounded-xl hover:bg-pink-700 transition shadow-lg shadow-pink-100 active:scale-95"
                    >
                        Book Now
                    </Link>
                </div>
            </div>
        </header>
    );
}

export default Header;