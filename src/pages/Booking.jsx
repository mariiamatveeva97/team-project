import React, { useState, useContext, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";
import Swal from "sweetalert2";
import { Calendar as CalendarIcon, Clock, Scissors, Star, Sparkles } from "lucide-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./datepicker-custom.css";

function Booking() {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const [recommendedTime, setRecommendedTime] = useState(null);

    const services = ["Classic Manicure", "Haircut & Styling", "Gel Polish Change", "Brow Shape & Tint", "Express Facial", "Evening Makeup", "Relaxing Massage"];

    const [formData, setFormData] = useState({
        serviceName: searchParams.get("service") || "",
        date: "",
        time: "",
    });

    const [bookedSlots, setBookedSlots] = useState([]);
    const allSlots = ["10:00 AM", "12:00 PM", "02:00 PM", "04:00 PM", "06:00 PM"];

    useEffect(() => {
        const serviceFromUrl = searchParams.get("service");
        if (serviceFromUrl && services.includes(serviceFromUrl)) {
            setFormData(prev => ({ ...prev, serviceName: serviceFromUrl }));
        }
    }, [searchParams]);

    // 1. Get personalized recommendation based on user's last booking
    useEffect(() => {
        const fetchRecommendation = async () => {
            try {
                const res = await api.get("/bookings/recommendation");
                if (res.data.recommendedTime) {
                    setRecommendedTime(res.data.recommendedTime);
                }
            } catch (err) {
                console.log("No previous bookings for recommendation");
            }
        };
        if (user) fetchRecommendation();
    }, [user]);

    // 2. Check availability when date changes
    useEffect(() => {
        if (formData.date) {
            const fetchAvailability = async () => {
                try {
                    const res = await api.get(`/bookings/availability?date=${formData.date}`);
                    setBookedSlots(res.data.bookedSlots || []);
                } catch (err) {
                    console.error("Error fetching availability:", err);
                }
            };
            fetchAvailability();
        }
    }, [formData.date]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.serviceName) {
            return Swal.fire("Error", "Please select a service", "error");
        }

        try {
            const response = await api.post("/bookings", formData);
            if (response.status === 201 || response.status === 200) {
                await Swal.fire({
                    title: 'Success!',
                    text: 'Your appointment is confirmed.',
                    icon: 'success',
                    confirmButtonColor: '#db2777'
                });
                navigate("/my-bookings");
            }
        } catch (err) {
            Swal.fire('Slot Taken', err.response?.data?.message || 'Try another time', 'error');
        }
    };

    return (
        <div className="min-h-screen bg-[#fff5f8] py-12 px-6 flex items-center justify-center font-sans">
            <div className="max-w-xl w-full bg-white rounded-[40px] shadow-[0_30px_60px_-15px_rgba(219,39,119,0.1)] p-10 border border-pink-50">

                <div className="text-center mb-10">
                    <div className="w-20 h-20 bg-pink-50 text-pink-500 rounded-[28px] flex items-center justify-center mx-auto mb-4 shadow-inner transform transition-transform hover:rotate-12">
                        <Scissors size={38} />
                    </div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight">Book a Service</h1>
                    <p className="text-gray-400 mt-2 font-medium">Personalized for you ✨</p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">

                    {/* Service Selection */}
                    <div className="group">
                        <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-pink-500 mb-3 ml-2">
                            <Star size={14} /> Select Service
                        </label>
                        <select
                            required
                            value={formData.serviceName}
                            onChange={(e) => setFormData({ ...formData, serviceName: e.target.value })}
                            className="w-full bg-pink-50/30 border-none rounded-[22px] p-5 text-gray-700 font-bold shadow-sm focus:ring-4 focus:ring-pink-100 transition-all outline-none appearance-none cursor-pointer"
                        >
                            <option value="">-- Choose what you need --</option>
                            {services.map(s => <option key={s} value={s}>{s}</option>)}
                        </select>
                    </div>

                    {/* Date Selection */}
                    <div className="group">
                        <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-pink-500 mb-3 ml-2">
                            <CalendarIcon size={14} /> Pick a Date
                        </label>
                        <DatePicker
                            selected={formData.date ? new Date(formData.date) : null}
                            onChange={(date) => {
                                const formattedDate = date.toISOString().split("T")[0];
                                setFormData({ ...formData, date: formattedDate, time: "" });
                            }}
                            minDate={new Date()}
                            dateFormat="yyyy-MM-dd"
                            placeholderText="Select a day"
                            className="w-full bg-pink-50/30 border-none rounded-[22px] p-5 text-gray-700 font-bold shadow-sm focus:ring-4 focus:ring-pink-100 transition-all outline-none cursor-pointer"
                        />
                    </div>
                    {/* Time Selection */}
                    <div className="group">
                        <div className="flex justify-between items-end mb-3 px-2">
                            <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-pink-500">
                                <Clock size={14} /> Select Time
                            </label>

                            {recommendedTime && !bookedSlots.includes(recommendedTime) && (
                                <div className="flex items-center gap-1 text-[10px] font-bold text-pink-600 bg-pink-100 px-2 py-1 rounded-lg animate-pulse">
                                    <Sparkles size={10} /> Suggested for you
                                </div>
                            )}
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            {allSlots.map(slot => {
                                const isBooked = bookedSlots.includes(slot);
                                const isRecommended = slot === recommendedTime;

                                return (
                                    <button
                                        key={slot}
                                        type="button"
                                        disabled={isBooked || !formData.date}
                                        onClick={() => setFormData({ ...formData, time: slot })}
                                        className={`p-4 rounded-[20px] font-bold text-sm transition-all border-2 relative overflow-hidden
                                            ${formData.time === slot ? 'bg-black text-white border-black shadow-lg scale-95' :
                                                isBooked ? 'bg-gray-50 text-gray-300 border-transparent cursor-not-allowed' :
                                                    isRecommended ? 'bg-white text-pink-600 border-pink-200 shadow-[0_0_20px_rgba(219,39,119,0.15)]' :
                                                        'bg-white text-gray-600 border-gray-100 hover:border-pink-200 hover:bg-pink-50'}`}
                                    >
                                        {slot}
                                        {isBooked ? " (Full)" : isRecommended && " ✨"}

                                        {!isBooked && isRecommended && formData.time !== slot && (
                                            <span className="absolute top-2 right-2 flex h-2 w-2">
                                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                                                <span className="relative inline-flex rounded-full h-2 w-2 bg-pink-500"></span>
                                            </span>
                                        )}
                                    </button>
                                );
                            })}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-gradient-to-r from-pink-500 to-pink-600 text-white py-5 rounded-[22px] font-black text-lg shadow-[0_15px_30px_-10px_rgba(219,39,119,0.5)] hover:shadow-[0_20px_40px_-10px_rgba(219,39,119,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all mt-4 uppercase tracking-wider"
                    >
                        Confirm Booking
                    </button>
                </form>
            </div>
        </div>
    );
}

export default Booking;