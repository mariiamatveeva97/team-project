import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-100 to-blue-100 text-gray-800">

      {/* NAVBAR */}
      <nav className="flex justify-between items-center px-8 py-4">
        <h1 className="text-xl font-bold">SmartBooking</h1>
        <button
          onClick={() => navigate("/booking")}
          className="bg-black text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition"
        >
          Book Now
        </button>
      </nav>

      {/* HERO */}
      <section className="flex flex-col items-center text-center px-6 mt-16">
        <h1 className="text-5xl font-bold max-w-3xl leading-tight">
          Book smarter, not harder.
        </h1>

        <p className="mt-6 text-lg text-gray-600 max-w-xl">
          Our intelligent booking system recommends the best time slots based on demand,
          availability, and user behavior.
        </p>

        <div className="flex gap-4 mt-8">
          <button
            onClick={() => navigate("/booking")}
            className="bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition"
          >
            Start Booking
          </button>

          <button className="border border-gray-400 px-6 py-3 rounded-xl hover:bg-gray-100 transition">
            Learn More
          </button>
        </div>
      </section>

      {/* FEATURES */}
      <section className="mt-24 px-8">
        <h2 className="text-3xl font-semibold text-center mb-12">
          Why SmartBooking?
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          
          <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold mb-2">🧠 Smart Suggestions</h3>
            <p className="text-gray-600">
              Get recommended time slots based on popularity and user behavior.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold mb-2">⚡ Fast Booking</h3>
            <p className="text-gray-600">
              Book appointments in seconds with a smooth and intuitive flow.
            </p>
          </div>

          <div className="bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg">
            <h3 className="text-xl font-semibold mb-2">📊 Optimized Experience</h3>
            <p className="text-gray-600">
              Reduce wait times and improve scheduling efficiency automatically.
            </p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="mt-24 text-center px-6 pb-16">
        <h2 className="text-3xl font-bold mb-6">
          Ready to experience smarter booking?
        </h2>

        <button
          onClick={() => navigate("/booking")}
          className="bg-black text-white px-8 py-4 rounded-xl text-lg hover:bg-gray-800 transition shadow-lg"
        >
          Get Started
        </button>
      </section>

    </div>
  );
}

export default Home;