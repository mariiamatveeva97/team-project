import React, { useState, useContext } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios"; 
import Swal from "sweetalert2";
import { Calendar as CalendarIcon, Clock, Scissors } from "lucide-react";


function Booking() {
    const [searchParams] = useSearchParams();
    const serviceName = searchParams.get("service") || "Select Service";
    const { user } = useContext(AuthContext); 
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        date: "",
        time: "",
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        const bookingData = {
            serviceName: serviceName,
            date: formData.date,
            time: formData.time,
        };

        try {
            const response = await api.post("/bookings", bookingData);

            if (response.status === 201 || response.status === 200) {
                await Swal.fire({
                    title: 'Booked!',
                    text: `Your appointment for ${serviceName} is confirmed.`,
                    icon: 'success',
                    confirmButtonColor: '#db2777',
                    borderRadius: '20px'
                });
                navigate("/confirmation");
            }
        } catch (err) {
            console.error("Booking error:", err);
            Swal.fire({
                title: 'Error',
                text: err.response?.data?.message || 'Something went wrong. Please try again.',
                icon: 'error',
                confirmButtonColor: '#000'
            });
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12 px-6">
            <div className="max-w-xl mx-auto bg-white rounded-[40px] shadow-2xl p-10 border border-gray-100">
                <div className="text-center mb-10">
                    <div className="w-16 h-16 bg-pink-50 text-pink-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Scissors size={32} />
                    </div>
                    <h1 className="text-3xl font-black text-gray-900">Book Appointment</h1>
                    <p className="text-pink-600 font-bold mt-2 uppercase tracking-widest text-sm">{serviceName}</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Date Selection */}
                    <div>
                        <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 ml-1">
                            <CalendarIcon size={14} /> Select Date
                        </label>
                        <input
                            type="date"
                            required
                            className="w-full bg-gray-50 border-2 border-transparent rounded-2xl p-4 focus:bg-white focus:border-pink-500 outline-none transition-all"
                            onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        />
                    </div>

                    {/* Time Selection */}
                    <div>
                        <label className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-gray-400 mb-2 ml-1">
                            <Clock size={14} /> Select Time
                        </label>
                        <select
                            required
                            className="w-full bg-gray-50 border-2 border-transparent rounded-2xl p-4 focus:bg-white focus:border-pink-500 outline-none transition-all appearance-none"
                            onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                        >
                            <option value="">Pick a slot</option>
                            <option value="10:00 AM">10:00 AM</option>
                            <option value="12:00 PM">12:00 PM</option>
                            <option value="02:00 PM">02:00 PM</option>
                            <option value="04:00 PM">04:00 PM</option>
                            <option value="06:00 PM">06:00 PM</option>
                        </select>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-slate-900 text-white py-5 rounded-2xl font-black text-lg hover:bg-pink-600 transition-all shadow-xl active:scale-95 mt-4"
                    >
                        Confirm Booking
                    </button>
                </form>

                <p className="text-center text-gray-400 text-xs mt-8">
                    By confirming, you agree to our terms of service and cancellation policy.
                </p>
            </div>
        </div>
    );
}

export default Booking;