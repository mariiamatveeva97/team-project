import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";
import Swal from "sweetalert2";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/auth/login", { email, password });
            login(response.data);
            if (response.data.user.role === "admin") {
                navigate("/admin"); 
            } else {
                Swal.fire({ title: "Welcome back!", icon: "success", timer: 1500, showConfirmButton: false });
                navigate("/my-bookings");
            }
        } catch (err) {
            Swal.fire({ title: "Error", text: err.response?.data.message || "Invalid credentials", icon: "error" });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6 font-sans">
            <div className="bg-white shadow-2xl rounded-[40px] p-10 w-full max-w-md text-center border border-gray-100">
                <h1 className="text-3xl font-black text-gray-900 mb-2">Welcome Back</h1>
                <p className="text-gray-400 mb-8 font-medium">Log in to manage your appointments</p>

                <form className="space-y-4" onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full bg-gray-50 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-pink-500"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full bg-gray-50 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-pink-500"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button className="w-full bg-pink-600 text-white py-4 rounded-2xl font-black text-lg hover:bg-pink-700 transition shadow-xl active:scale-95">
                        Sign In
                    </button>
                </form>

                <p className="text-gray-500 text-sm mt-6">
                    Don't have an account?{" "}
                    <Link to="/signup" className="text-pink-600 font-bold hover:underline">
                        Register
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Login;