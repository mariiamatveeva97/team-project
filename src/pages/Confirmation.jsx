import { useLocation, useNavigate } from "react-router-dom";

function Confirmation() {
  const location = useLocation();
  const navigate = useNavigate();

  const { service, selectedTime } = location.state || {};

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 p-6">
      
      <div className="bg-white/80 backdrop-blur-md shadow-2xl rounded-3xl p-10 text-center max-w-md w-full">
        
        {/* ICON */}
        <div className="text-5xl mb-4">🎉</div>

        {/* TITLE */}
        <h1 className="text-3xl font-bold text-gray-800 mb-4">
          Booking Confirmed
        </h1>

        {/* CONTENT */}
        {service && selectedTime ? (
          <>
            <div className="bg-gray-100 rounded-xl p-4 mb-6">
              <p className="text-gray-600">Service</p>
              <p className="text-xl font-semibold">{service}</p>

              <p className="text-gray-600 mt-3">Time</p>
              <p className="text-2xl font-bold">{selectedTime}</p>
            </div>

            {/* SMART MESSAGE */}
            <p className="text-gray-600 mb-6">
              This time was selected based on smart recommendations to give you the best experience.
            </p>

            {/* EXTRA WOW */}
            <div className="bg-green-100 text-green-700 px-4 py-2 rounded-full inline-block mb-6">
              ✔ Optimized Booking Slot
            </div>
          </>
        ) : (
          <p className="text-gray-500 mb-6">
            No booking data found.
          </p>
        )}

        {/* BUTTON */}
        <button
          onClick={() => navigate("/")}
          className="w-full py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition"
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

export default Confirmation;