import React, { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { servicesData } from "../data/servicesData";

function Booking() {
    const [searchParams] = useSearchParams();
    const [selectedService, setSelectedService] = useState(searchParams.get("service") || "");
    const [selectedTime, setSelectedTime] = useState("");
    const navigate = useNavigate();

    const timeSlots = [
        { time: "10:00 AM", status: "Quiet" },
        { time: "11:00 AM", status: "Popular" },
        { time: "12:00 PM", status: "Popular" },
        { time: "02:00 PM", status: "Filling Fast" },
        { time: "03:00 PM", status: "Recommended" },
        { time: "04:00 PM", status: "Quiet" },
    ];

    return (
        <div className="min-h-screen bg-white py-16 px-6 font-sans">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-black mb-10 text-center tracking-tight text-slate-950">
                    Beauty, Reserved
                </h1>

                <div className="grid lg:grid-cols-3 gap-12">

                    {/* Left: list of services */}
                    <div className="lg:col-span-1 space-y-3">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 ml-1">1. Service</h2>
                        {servicesData.map((s) => (
                            <button
                                key={s.id}
                                onClick={() => setSelectedService(s.title)}
                                className={`w-full text-left px-5 py-4 rounded-2xl border-2 transition-all duration-300 ${selectedService === s.title
                                    ? "border-pink-600 bg-pink-600 text-white shadow-[0_10px_25px_rgba(219,39,119,0.2)] scale-[1.02]"
                                    : "border-gray-50 bg-gray-50 text-slate-600 hover:border-pink-100 hover:bg-pink-50 hover:text-pink-700"
                                    }`}
                            >
                                <span className="font-bold">{s.title}</span>
                            </button>
                        ))}
                    </div>

                    {/* Right: Select time */}
                    <div className="lg:col-span-2">
                        <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4 ml-1">2. Select Time</h2>
                        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                            {timeSlots.map((slot) => {
                                const isSelected = selectedTime === slot.time;
                                return (
                                    <button
                                        key={slot.time}
                                        onClick={() => setSelectedTime(slot.time)}
                                        className={`group relative p-4 rounded-2xl border-2 transition-all duration-300 transform active:scale-95 ${isSelected
                                            ? "border-pink-600 bg-pink-600 text-white shadow-xl translate-y-[-4px]"
                                            : "border-gray-50 bg-white hover:border-pink-200 hover:shadow-md"
                                            }`}
                                    >
                                        <div className="flex flex-col items-center justify-center text-center">
                                            <span className={`text-lg font-black ${isSelected ? "text-white" : "text-slate-900"}`}>
                                                {slot.time}
                                            </span>
                                            <span className={`text-[10px] mt-1 font-bold px-2 py-0.5 rounded-full ${isSelected ? "bg-white/20 text-white" : "bg-pink-50 text-pink-600 group-hover:bg-pink-100 group-hover:text-pink-700"
                                                }`}>
                                                {slot.status}
                                            </span>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>

                        {/* Submit button */}
                        <button
                            disabled={!selectedService || !selectedTime}
                            onClick={() => navigate(`/confirmation?service=${selectedService}&time=${selectedTime}`)}
                            className={`w-full mt-10 py-5 rounded-2xl font-black text-lg transition-all duration-500 ${selectedService && selectedTime
                                ? "bg-pink-600 text-white shadow-[0_20px_50px_rgba(219,39,119,0.3)] hover:bg-pink-700"
                                : "bg-gray-100 text-gray-300 cursor-not-allowed"
                                }`}
                        >
                            Confirm Booking
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Booking;