import { useState } from "react";
import TimeSlot from "../components/TimeSlot";

function Booking() {
    const [selectedService, setSelectedService] = useState("");
    const [selectedTime, setSelectedTime] = useState("");

    const services = ["Haircut", "Beard Trim", "Hair Coloring", "Facial Treatment"];
    const timeSlots = ["10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"];

    const handleContinue = () => {
        if (!selectedService || !selectedTime) {
        alert("Please select a service and a time slot.");
        return;
        }

        window.location.href = `/confirmation?service=${selectedService}&time=${selectedTime}`;
    };

    return (
        <div className="min-h-screen bg-white px-6 py-12 text-gray-900">

            <h1 className="text-3xl font-bold mb-10 text-center">Book an Appointment</h1>

            {/* Services */}
            <div className="mb-12">
                <h2 className="text-xl font-semibold mb-4">Select a Service</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {services.map((service, index) => (
                        <button
                        key={index}
                        className={`border px-4 py-2 rounded-lg hover:bg-gray-100 transition ${
                            selectedService === service ? "bg-black text-white" : ""
                        }`}
                        onClick={() => setSelectedService(service)}
                        >
                        {service}
                        </button>
                    ))}
                </div>
            </div>

            {/* Time Slots */}
            <div className="mb-12">
                <h2 className="text-xl font-semibold mb-4">Select a Time Slot</h2>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
                    {timeSlots.map((time, index) => (
                        <TimeSlot
                        key={index}
                        time={time}
                        selected={selectedTime === time}
                        onSelect={() => setSelectedTime(time)}
                        />
                    ))}
                </div>
            </div>

            {/* Continue */}
            <div className="text-center">
                <button
                onClick={handleContinue}
                className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
                >
                Continue
                </button>
            </div>

        </div>
    );
}

export default Booking;
