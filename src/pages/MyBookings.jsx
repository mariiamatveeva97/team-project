import React, { useEffect, useState, useCallback, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Clock, Calendar, Trash2, Edit3 } from "lucide-react";
import Swal from "sweetalert2";

function MyBookings() {
    const [bookings, setBookings] = useState([]);
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const fetchBookings = useCallback(async () => {
        if (!user?.id) return;
        try {
            const response = await api.get("/bookings/my");
            setBookings(response.data);
        } catch (err) {
            console.error("Download error:", err);
        }
    }, [user?.id]);

    useEffect(() => {
        fetchBookings();
    }, [fetchBookings]);

    const handleLogout = () => {
        Swal.fire({ title: 'Logging out...', timer: 1500, showConfirmButton: false })
            .then(() => logout());
    };

    const handleCancel = async (id) => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#db2777',
            confirmButtonText: 'Yes, cancel it!',
        });

        if (result.isConfirmed) {
            try {
                await api.delete(`/bookings/${id}`);
                await Swal.fire({ title: 'Deleted!', icon: 'success', timer: 1500 });
                fetchBookings();
            } catch (err) {
                console.error("Delete error:", err);
            }
        }
    };

    const handleReschedule = async (id) => {
        const { value: newTime } = await Swal.fire({
            title: 'Select New Time',
            input: 'select',
            inputOptions: { '10:00 AM': '10:00 AM', '12:00 PM': '12:00 PM', '02:00 PM': '02:00 PM' },
            showCancelButton: true,
            confirmButtonColor: '#db2777',
        });

        if (newTime) {
            try {
                await api.put(`/bookings/${id}`, { time: newTime });
                await Swal.fire({ title: 'Updated!', icon: 'success', timer: 1500 });
                fetchBookings();
            } catch (err) {
                console.error("Update error:", err);
            }
        }
    };
    return (
        <div className="min-h-screen bg-gray-50 py-12 px-6">
            <div className="max-w-4xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-3xl font-black text-slate-900">My Appointments</h1>
                    <button
                        onClick={handleLogout}
                        className="px-5 py-2.5 bg-white text-slate-400 text-xs font-bold uppercase tracking-widest rounded-xl border border-gray-100 hover:text-pink-600 hover:border-pink-100 transition shadow-sm"
                    >
                        Logout
                    </button>
                </div>

                <div className="grid gap-4">
                    {bookings.length > 0 ? (
                        bookings.map((b) => (
                            <div key={b._id} className="bg-white p-6 rounded-[32px] shadow-sm border flex justify-between items-center">
                                <div>
                                    <h3 className="text-xl font-bold text-pink-600">{b.serviceName}</h3>
                                    <div className="flex gap-4 mt-2 text-gray-500">
                                        <span className="flex items-center gap-1"><Calendar size={14} /> {b.date}</span>
                                        <span className="flex items-center gap-1"><Clock size={14} /> {b.time}</span>
                                    </div>
                                </div>

                                <div className="flex gap-2">
                                    <button
                                        onClick={() => handleReschedule(b._id)}
                                        className="p-3 bg-gray-50 text-gray-600 rounded-2xl hover:bg-pink-50 hover:text-pink-600 transition"
                                    >
                                        <Edit3 size={18} />
                                    </button>
                                    <button
                                        onClick={() => handleCancel(b._id)}
                                        className="p-3 bg-gray-50 text-gray-400 rounded-2xl hover:bg-red-50 hover:text-red-600 transition"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="text-center py-20 bg-white rounded-[40px] shadow-sm">
                            <p className="text-gray-400 mb-6">You don't have any bookings yet.</p>
                            <button
                                onClick={() => navigate("/services")}
                                className="px-8 py-4 bg-pink-600 text-white rounded-2xl font-bold hover:bg-pink-700 transition"
                            >
                                Explore Services
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export default MyBookings;