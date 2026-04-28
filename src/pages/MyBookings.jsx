import React, { useEffect, useState, useCallback, useContext } from "react";
import api from "../api/axios";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Clock, Calendar, Trash2, Edit3 } from "lucide-react";
import Swal from "sweetalert2";
import { TIME_SLOTS } from "../constants/timeSlots";

function MyBookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    const fetchBookings = useCallback(async () => {
        const userId = user?._id || user?.id;
        if (!userId) {
            setLoading(false);
            return;
        }
        try {
            const response = await api.get("/bookings/my");
            setBookings(Array.isArray(response.data) ? response.data : []);
        } catch (err) {
            console.error("Error fetching bookings:", err);
        } finally {
            setLoading(false);
        }
    }, [user]);

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
                Swal.fire('Error', 'Could not cancel booking', 'error');
            }
        }
    };

    const handleReschedule = async (booking) => {
        const now = new Date();
        const yyyy = now.getFullYear();
        const mm = String(now.getMonth() + 1).padStart(2, '0');
        const dd = String(now.getDate()).padStart(2, '0');
        const todayStr = `${yyyy}-${mm}-${dd}`;

        let availableSlots = TIME_SLOTS;

        if (booking.date === todayStr) {
            availableSlots = TIME_SLOTS.filter(slot => {
                const [time, modifier] = slot.split(' ');
                let [hours] = time.split(':');
                hours = parseInt(hours, 10);

                if (modifier === 'PM' && hours < 12) hours += 12;
                if (modifier === 'AM' && hours === 12) hours = 0;

                const slotTime = new Date();
                slotTime.setHours(hours, 0, 0, 0);

                return slotTime.getTime() > (now.getTime() + 30 * 60 * 1000);
            });
        }

        if (availableSlots.length === 0) {
            return Swal.fire({
                title: 'No more slots today',
                text: 'Please cancel and book for another day.',
                icon: 'info',
                confirmButtonColor: '#db2777'
            });
        }

        const inputOptions = {};
        availableSlots.forEach(s => { inputOptions[s] = s; });

        const { value: newTime } = await Swal.fire({
            title: 'Select New Time',
            input: 'select',
            inputOptions,
            inputPlaceholder: 'Choose a slot',
            showCancelButton: true,
            confirmButtonColor: '#db2777',
            borderRadius: '24px'
        });

        if (newTime) {
            try {
                await api.put(`/bookings/${booking._id}`, { time: newTime });
                await Swal.fire({ title: 'Rescheduled!', icon: 'success', timer: 1500, showConfirmButton: false });
                fetchBookings();
            } catch (err) {
                Swal.fire('Error', err.response?.data?.message || 'Could not update time', 'error');
            }
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 flex items-center justify-center">
                <p className="text-pink-600 font-bold text-lg">Loading your appointments...</p>
            </div>
        );
    }

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
                                        onClick={() => handleReschedule(b)}
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
