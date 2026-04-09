import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { LogOut, User } from "lucide-react";

function Header() {
    const { user, logout } = useContext(AuthContext);

    return (
        <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                <Link to="/" className="text-xl font-bold tracking-tight text-slate-900">
                    Smart<span className="text-pink-600">Booking</span>
                </Link>

                <nav className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
                    <Link to="/services" className="hover:text-pink-600 transition">Services</Link>
                    <Link to="/booking" className="hover:text-pink-600 transition">Booking</Link>
                </nav>

                <div className="flex items-center gap-3">
                    {user ? (
                        <div className="flex items-center gap-6">
                            <Link to="/my-bookings" className="group flex items-center gap-2">
                                <span className="text-sm font-medium text-slate-600 group-hover:text-pink-600 transition">
                                    Hi, <span className="text-pink-600 font-bold">{user.fullName}</span>
                                </span>
                                <div className="w-8 h-8 bg-pink-50 rounded-full flex items-center justify-center text-pink-600 font-bold text-xs uppercase">
                                    {user?.fullName ? user.fullName.charAt(0) : <User size={16} />}
                                </div>
                            </Link>
                            <button
                                onClick={logout}
                                className="text-slate-400 hover:text-red-500 transition-colors"
                                title="Logout"
                            >
                                <LogOut size={20} />
                            </button>
                        </div>
                    ) : (
                        <Link
                            to="/login"
                            className="px-6 py-2.5 bg-pink-600 text-white rounded-xl font-bold text-sm hover:bg-pink-700 transition shadow-lg shadow-pink-100"
                        >
                            Login
                        </Link>
                    )}
                </div>
            </div>
        </header>
    );
}

export default Header;