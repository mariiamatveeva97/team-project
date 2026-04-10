import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";
import Swal from "sweetalert2";

function Signup() {
    const [formData, setFormData] = useState({ fullName: "", email: "", password: "" });
    const navigate = useNavigate();

    const { login } = useContext(AuthContext);

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await api.post("/auth/register", formData);
            login(response.data);

            Swal.fire({
                title: "Success!",
                text: "Account created! Log in now.",
                icon: "success",
                confirmButtonColor: "#db2777",
            }).then(() => navigate("/my-bookings"));
        } catch (err) {
            Swal.fire({
                title: "Error",
                text: err.response?.data.message || "Failed to register",
                icon: "error",
            });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">
            <div className="bg-white shadow-2xl rounded-[40px] p-10 w-full max-w-md text-center border border-gray-100">
                <h1 className="text-3xl font-black text-gray-900 mb-6">Create Account</h1>
                <form className="space-y-4" onSubmit={handleSignup}>
                    <input
                        type="text"
                        placeholder="Full Name"
                        className="w-full bg-gray-50 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-pink-500"
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full bg-gray-50 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-pink-500"
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full bg-gray-50 rounded-2xl p-4 outline-none focus:ring-2 focus:ring-pink-500"
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        required
                    />
                    <button className="w-full bg-pink-600 text-white py-4 rounded-2xl font-black text-lg hover:bg-pink-700 transition shadow-xl active:scale-95">
                        Register Now
                    </button>
                </form>

                <p className="text-gray-500 text-sm mt-6">
                    Already have an account?{" "}
                    <Link to="/login" className="text-pink-600 font-bold hover:underline">
                        Login
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default Signup;