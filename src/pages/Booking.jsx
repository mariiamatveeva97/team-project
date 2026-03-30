import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Booking() {
  const [service, setService] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const navigate = useNavigate();

  const getSuggestions = () => {
    if (service === "Hair") {
      return [
        { time: "18:00", type: "recommended", text: "Most popular choice" },
        { time: "19:30", type: "trending", text: "High demand" },
        { time: "14:00", type: "low", text: "Less crowded" },
      ];
    }
    if (service === "Nails") {
      return [
        { time: "13:00", type: "recommended", text: "Relaxed hours" },
        { time: "15:00", type: "low", text: "Less busy" },
        { time: "17:00", type: "trending", text: "Popular choice" },
      ];
    }
    if (service === "Makeup") {
      return [
        { time: "10:00", type: "recommended", text: "Best prep time" },
        { time: "12:00", type: "trending", text: "Midday demand" },
        { time: "16:00", type: "low", text: "Quiet slot" },
      ];
    }
    return [];
  };

  const badgeStyles = {
    recommended: "bg-green-100 text-green-700",
    trending: "bg-orange-100 text-orange-700",
    low: "bg-blue-100 text-blue-700",
  };

  const badgeText = {
    recommended: "Recommended",
    trending: "Trending",
    low: "Low Traffic",
  };

  const suggestions = getSuggestions();

  const handleConfirm = () => {
    navigate("/confirmation", { state: { service, selectedTime } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 flex flex-col items-center p-8">
      
      {/* TITLE */}
      <h1 className="text-4xl font-bold mb-8 text-gray-800">
        Book Your Appointment
      </h1>

      {/* SERVICES */}
      <div className="grid grid-cols-3 gap-6 mb-12">
        {["Hair", "Nails", "Makeup"].map((item) => (
          <div
            key={item}
            onClick={() => {
              setService(item);
              setSelectedTime("");
            }}
            className={`cursor-pointer p-8 rounded-2xl shadow-lg backdrop-blur-md transition duration-300 transform hover:scale-105 ${
              service === item
                ? "bg-black text-white"
                : "bg-white/70 text-gray-800"
            }`}
          >
            <h2 className="text-xl font-semibold">{item}</h2>
          </div>
        ))}
      </div>

      {/* SUGGESTIONS */}
      {service && (
        <>
          <h2 className="text-2xl font-semibold mb-6 text-gray-700">
            Smart Suggestions for {service}
          </h2>

          <div className="flex gap-8 flex-wrap justify-center">
            {suggestions.map((s, index) => (
              <div
                key={index}
                onClick={() => setSelectedTime(s.time)}
                className={`cursor-pointer w-56 p-6 rounded-2xl shadow-xl backdrop-blur-md transition duration-300 transform hover:scale-105 ${
                  selectedTime === s.time
                    ? "border-2 border-black bg-white"
                    : "bg-white/80"
                }`}
              >
                {/* Badge */}
                <span
                  className={`text-xs px-3 py-1 rounded-full ${badgeStyles[s.type]}`}
                >
                  {badgeText[s.type]}
                </span>

                {/* Time */}
                <p className="text-3xl font-bold mt-4">{s.time}</p>

                {/* Description */}
                <p className="text-sm text-gray-500 mt-2">{s.text}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {/* FEEDBACK */}
      {selectedTime && (
        <p className="mt-6 text-green-600 font-medium text-lg">
          ✔ Great choice! This is an optimized time slot.
        </p>
      )}

      {/* CONFIRM BUTTON */}
      {selectedTime && (
        <button
          onClick={handleConfirm}
          className="mt-8 px-10 py-4 bg-black text-white rounded-xl text-lg hover:bg-gray-800 transition shadow-lg"
        >
          Confirm Booking
        </button>
      )}
    </div>
  );
}

export default Booking;