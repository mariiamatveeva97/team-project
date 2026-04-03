import React from "react";
import { useNavigate } from "react-router-dom";
import heroImg from "../assets/hero-img.jpg";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white text-gray-900 font-sans">

      {/* --- HERO SECTION --- */}
      <section className="relative w-full bg-gray-50 py-16 lg:py-24 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center">

          {/* Left-side content */}
          <div className="text-left">
            <div className="inline-block px-4 py-1.5 mb-6 text-xs font-semibold tracking-wider text-black uppercase bg-gray-200 rounded-full">
              Safe & Fast Booking
            </div>

            <h1 className="text-5xl lg:text-7xl font-bold tracking-tight mb-6 leading-[1.1]">
              Beauty & Wellness, <br />
              <span className="text-gray-400">booked simple.</span>
            </h1>

            <p className="text-lg text-gray-600 mb-10 max-w-lg leading-relaxed">
              Find and book the best hair, nail, and skin treatments in your city.
              The smartest way to take care of yourself.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate("/booking")}
                className="px-8 py-4 bg-black text-white text-lg font-medium rounded-xl hover:bg-gray-800 transition-all shadow-lg active:scale-95"
              >
                Book an Appointment
              </button>
              <button
                onClick={() => navigate("/services")}
                className="px-8 py-4 bg-white text-black text-lg font-medium rounded-xl border border-gray-200 hover:bg-gray-50 transition-all"
              >
                Explore Services
              </button>
            </div>
          </div>

          {/* Right-side image */}
          <div className="relative">
            <div className="relative z-10 w-full h-[400px] lg:h-[550px] rounded-3xl overflow-hidden shadow-2xl">
              <img
                src={heroImg}
                alt="Beauty Salon"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-full h-full bg-gray-200 rounded-3xl -z-0"></div>
          </div>

        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Why SmartBooking?</h2>
          <div className="w-20 h-1 bg-black mx-auto"></div>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          <div className="p-8 border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition">
            <div className="text-3xl mb-4">🕒</div>
            <h3 className="text-xl font-bold mb-3">24/7 Booking</h3>
            <p className="text-gray-600 leading-relaxed">
              Book your favorite treatments anytime, anywhere. No phone calls needed.
            </p>
          </div>

          <div className="p-8 border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition">
            <div className="text-3xl mb-4">⭐</div>
            <h3 className="text-xl font-bold mb-3">Trusted Experts</h3>
            <p className="text-gray-600 leading-relaxed">
              Only certified professionals with real user reviews and ratings.
            </p>
          </div>

          <div className="p-8 border border-gray-100 rounded-2xl shadow-sm hover:shadow-md transition">
            <div className="text-3xl mb-4">⚡</div>
            <h3 className="text-xl font-bold mb-3">Instant Confirmation</h3>
            <p className="text-gray-600 leading-relaxed">
              Get immediate confirmation and calendar reminders for your visits.
            </p>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="bg-black py-20 px-6 text-center text-white rounded-[40px] mx-6 mb-20 shadow-2xl">
        <h2 className="text-4xl font-bold mb-6">Ready for your transformation?</h2>
        <p className="text-gray-400 mb-10 text-lg">Join thousands of happy customers today.</p>
        <button
          onClick={() => navigate("/booking")}
          className="px-10 py-4 bg-white text-black text-lg font-bold rounded-xl hover:bg-gray-100 transition-transform active:scale-95"
        >
          Get Started
        </button>
      </section>

    </div>
  );
}

export default Home;