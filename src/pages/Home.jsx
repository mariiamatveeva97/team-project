import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-gray-900">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-8 py-4 border-b">
        <h1 className="text-xl font-semibold">SmartBooking</h1>
        <button
          onClick={() => navigate("/booking")}
          className="px-4 py-2 border rounded-lg hover:bg-gray-100 transition"
        >
          Book Now
        </button>
      </nav>

      {/* HERO */}
      <section className="flex flex-col items-center text-center px-6 mt-20">
        <h1 className="text-4xl font-bold max-w-2xl leading-tight">
          Book smarter, not harder.
        </h1>

        <p className="mt-4 text-gray-600 max-w-md">
          A clean and simple booking experience designed for everyone.
        </p>

        <button
          onClick={() => navigate("/booking")}
          className="mt-8 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 transition"
        >
          Start Booking
        </button>
      </section>

      {/* FEATURES */}
      <section className="mt-24 px-6 max-w-4xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="p-6 border rounded-xl">
            <h3 className="font-semibold mb-2">Smart Suggestions</h3>
            <p className="text-gray-600 text-sm">
              Get recommended time slots based on demand.
            </p>
          </div>

          <div className="p-6 border rounded-xl">
            <h3 className="font-semibold mb-2">Fast Booking</h3>
            <p className="text-gray-600 text-sm">
              Book appointments in seconds.
            </p>
          </div>

          <div className="p-6 border rounded-xl">
            <h3 className="font-semibold mb-2">Optimized Experience</h3>
            <p className="text-gray-600 text-sm">
              Reduce wait times and improve scheduling.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;
