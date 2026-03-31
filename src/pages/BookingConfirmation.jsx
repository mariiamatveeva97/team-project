import { useEffect } from "react";

function BookingConfirmation() {
  const params = new URLSearchParams(window.location.search);
  const service = params.get("service");
  const time = params.get("time");

  // Redirect if missing data
  useEffect(() => {
    if (!service || !time) {
      window.location.href = "/booking";
    }
  }, [service, time]);

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-6 text-gray-900">

        <h1 className="text-3xl font-bold mb-4">Booking Confirmed</h1>

        <p className="text-gray-600 mb-8">
          Your appointment has been successfully booked.
        </p>

        <div className="border rounded-xl p-6 w-full max-w-md mb-8">
            <h3 className="font-semibold mb-3">Appointment Details</h3>
            <p><strong>Service:</strong> {service}</p>
            <p><strong>Time:</strong> {time}</p>
        </div>

        <a
            href="/"
            className="px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
          >
            Back to Home
        </a>

    </div>
  );
}

export default BookingConfirmation;
