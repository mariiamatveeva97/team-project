import React from "react";
import { useNavigate } from "react-router-dom";
import heroImg from "../assets/hero-img.jpg";
import { Sparkles, Calendar, Heart } from "lucide-react";

function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-[#fff5f8] text-gray-900 font-sans">

      {/* --- HERO SECTION --- */}
      <section className="relative w-full py-16 lg:py-24 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 grid lg:grid-cols-2 gap-12 items-center relative z-10">

          {/* Left-side content */}
          <div className="text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-xs font-black tracking-widest text-pink-600 uppercase bg-pink-100 rounded-full animate-fade-in">
              <Sparkles size={14} /> Safe & Fast Booking
            </div>

            <h1 className="text-5xl lg:text-7xl font-black tracking-tight mb-6 leading-[1.1] text-gray-900">
              Beauty & Wellness, <br />
              <span className="text-pink-500">booked simple.</span>
            </h1>

            <p className="text-lg text-gray-500 mb-10 max-w-lg leading-relaxed font-medium">
              Find and book the best hair, nail, and skin treatments in your city.
              The smartest way to take care of yourself.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button
                onClick={() => navigate("/booking")}
                className="px-10 py-5 bg-gradient-to-r from-pink-500 to-pink-600 text-white text-lg font-black rounded-[24px] hover:shadow-[0_20px_40px_-10px_rgba(219,39,119,0.5)] transition-all active:scale-95 shadow-xl"
              >
                Book Now
              </button>
              <button
                onClick={() => navigate("/services")}
                className="px-10 py-5 bg-white text-pink-600 text-lg font-bold rounded-[24px] border-2 border-pink-100 hover:bg-pink-50 transition-all shadow-sm"
              >
                Explore Services
              </button>
            </div>
          </div>

          {/* Right-side image */}
          <div className="relative">
            <div className="relative z-10 w-full h-[450px] lg:h-[600px] rounded-[50px] overflow-hidden shadow-[0_40px_80px_-15px_rgba(219,39,119,0.2)] border-[12px] border-white">
              <img
                src={heroImg}
                alt="Beauty Salon"
                className="w-full h-full object-cover"
              />
            </div>
            {/* Decorative background blur */}
            <div className="absolute -top-10 -right-10 w-72 h-72 bg-pink-200 rounded-full blur-[100px] opacity-50 -z-10"></div>
          </div>

        </div>
      </section>

      {/* --- FEATURES SECTION --- */}
      <section className="py-24 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-10">
          <div className="p-10 bg-white rounded-[40px] shadow-[0_15px_40px_rgba(0,0,0,0.02)] border border-pink-50 hover:translate-y-[-10px] transition-all duration-500">
            <div className="w-14 h-14 bg-pink-50 text-pink-500 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
              <Calendar size={28} />
            </div>
            <h3 className="text-xl font-black mb-3 text-gray-800">24/7 Booking</h3>
            <p className="text-gray-500 leading-relaxed font-medium text-sm">
              Book your favorite treatments anytime, anywhere. No phone calls needed.
            </p>
          </div>

          <div className="p-10 bg-white rounded-[40px] shadow-[0_15px_40px_rgba(0,0,0,0.02)] border border-pink-50 hover:translate-y-[-10px] transition-all duration-500">
            <div className="w-14 h-14 bg-pink-50 text-pink-500 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
              <Heart size={28} />
            </div>
            <h3 className="text-xl font-black mb-3 text-gray-800">Trusted Experts</h3>
            <p className="text-gray-500 leading-relaxed font-medium text-sm">
              Only certified professionals with real user reviews and ratings.
            </p>
          </div>

          <div className="p-10 bg-white rounded-[40px] shadow-[0_15px_40px_rgba(0,0,0,0.02)] border border-pink-50 hover:translate-y-[-10px] transition-all duration-500">
            <div className="w-14 h-14 bg-pink-50 text-pink-500 rounded-2xl flex items-center justify-center mb-6 shadow-inner">
              <Sparkles size={28} />
            </div>
            <h3 className="text-xl font-black mb-3 text-gray-800">Instant Confirm</h3>
            <p className="text-gray-500 leading-relaxed font-medium text-sm">
              Get immediate confirmation and calendar reminders for your visits.
            </p>
          </div>
        </div>
      </section>

      {/* --- CTA SECTION --- */}
      <section className="px-6 mb-24">
        <div className="max-w-7xl mx-auto bg-gradient-to-br from-pink-400 via-pink-500 to-pink-600 py-20 px-6 text-center text-white rounded-[60px] shadow-[0_20px_50px_-10px_rgba(219,39,119,0.4)] relative overflow-hidden border-4 border-white/20">

          <div className="absolute -top-24 -left-24 w-96 h-96 bg-white/20 rounded-full blur-[80px]"></div>
          <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-pink-300/30 rounded-full blur-[80px]"></div>

          <div className="relative z-10">
            <h2 className="text-4xl lg:text-6xl font-black mb-6 tracking-tight drop-shadow-md">
              Ready for your <br />
              <span className="text-pink-100">transformation?</span>
            </h2>

            <p className="text-white/90 mb-10 text-lg font-bold max-w-md mx-auto leading-relaxed">
              Join thousands of happy customers today and feel the magic.
            </p>

            <button
              onClick={() => navigate("/booking")}
              className="group relative px-14 py-6 bg-white text-pink-600 text-xl font-black rounded-3xl hover:scale-105 transition-all duration-300 active:scale-95 shadow-[0_15px_30px_rgba(0,0,0,0.1)] overflow-hidden"
            >
              <span className="relative z-10">Get Started Now ✨</span>

              <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-pink-100/50 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
            </button>
          </div>

          <div className="absolute top-10 right-20 text-white/40 animate-pulse">
            <Sparkles size={40} />
          </div>
          <div className="absolute bottom-10 left-20 text-white/30 animate-bounce">
            <Heart size={30} />
          </div>
        </div>
      </section>

    </div>
  );
}

export default Home;