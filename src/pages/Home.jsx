function Home() {
  return (
    <div className="relative text-gray-900">

      {/* Login Button */}
      <div className="w-full flex justify-end p-6 absolute top-0 right-0 z-50">
        <a
          href="/login"
          className="px-5 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
        >
          Login
        </a>
      </div>

      {/* Hero Section */}
      {/* Login + Register Buttons */}
        <div className="w-full flex justify-end gap-3 p-6 absolute top-0 right-0 z-50">
              <a
                href="/login"
                className="px-5 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition"
              >
                Login
              </a>

              <a
                href="/signup"
                className="px-5 py-2 bg-gray-800 text-white rounded-lg font-medium hover:bg-gray-900 transition"
              >
                Register
              </a>
        </div>

      <section
        className="py-28 px-6 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/images/bg.jpg')" }}
      >
        <div className="backdrop-blur-sm bg-white/40 max-w-3xl mx-auto p-10 rounded-2xl text-center shadow-lg">

          <h1 className="text-4xl font-bold mb-4">
            Book Your Next Appointment in Seconds
          </h1>

          <p className="text-gray-700 max-w-xl mx-auto mb-10">
            Smart scheduling for salons & services
          </p>

          {/* Search Box */}
          <div className="bg-white shadow-lg rounded-xl p-6 grid grid-cols-1 md:grid-cols-4 gap-4">
            <select className="border p-3 rounded-lg">
              <option>Select Service</option>
              <option>Haircut</option>
              <option>Nails</option>
              <option>Makeup</option>
              <option>Spa</option>
            </select>

            <input type="date" className="border p-3 rounded-lg" />
            <input type="time" className="border p-3 rounded-lg" />

            <a
              href="/booking"
              className="bg-blue-600 text-white rounded-lg flex items-center justify-center hover:bg-blue-700 transition"
            >
              Search
            </a>
          </div>

        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-6 max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-10 text-center">
        <div>
          <h3 className="font-semibold text-lg mb-2">Instant Booking</h3>
          <p className="text-gray-600 text-sm">Schedule in just a few clicks.</p>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-2">Smart Suggestions</h3>
          <p className="text-gray-600 text-sm">Get the best time for you.</p>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-2">Real-Time Availability</h3>
          <p className="text-gray-600 text-sm">See open slots instantly.</p>
        </div>
      </section>

      {/* Popular Services */}
      <section className="py-16 px-6 bg-gray-50">
        <h2 className="text-2xl font-bold text-center mb-10">Popular Services</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">

          {/* Haircut */}
          <div className="bg-white shadow rounded-xl p-4 text-center">
            <img
              src="/images/haircut.jpg"
              alt="Haircut"
              className="h-32 w-full object-cover rounded-lg mb-4"
            />
            <h3 className="font-semibold mb-2">Haircut</h3>
            <a href="/booking" className="text-blue-600 font-medium hover:underline">
              Book Now
            </a>
          </div>

          {/* Nails */}
          <div className="bg-white shadow rounded-xl p-4 text-center">
            <img
              src="/images/nails.jpg"
              alt="Nails"
              className="h-32 w-full object-cover rounded-lg mb-4"
            />
            <h3 className="font-semibold mb-2">Nail Treatments</h3>
            <a href="/booking" className="text-blue-600 font-medium hover:underline">
              Book Now
            </a>
          </div>

          {/* Makeup */}
          <div className="bg-white shadow rounded-xl p-4 text-center">
            <img
              src="/images/makeup.jpg"
              alt="Makeup"
              className="h-32 w-full object-cover rounded-lg mb-4"
            />
            <h3 className="font-semibold mb-2">Makeup</h3>
            <a href="/booking" className="text-blue-600 font-medium hover:underline">
              Book Now
            </a>
          </div>

          {/* Spa */}
          <div className="bg-white shadow rounded-xl p-4 text-center">
            <img
              src="/images/spa.jpg"
              alt="Spa"
              className="h-32 w-full object-cover rounded-lg mb-4"
            />
            <h3 className="font-semibold mb-2">Spa & Relax</h3>
            <a href="/booking" className="text-blue-600 font-medium hover:underline">
              Book Now
            </a>
          </div>

        </div>
      </section>

      {/* Testimonial */}
      <section className="py-20 px-6 text-center">
        <h2 className="text-2xl font-bold mb-4">Trusted by Thousands of Happy Clients</h2>

        <div className="text-yellow-500 text-xl mb-3">★★★★★</div>

        <p className="text-gray-700 max-w-xl mx-auto italic mb-2">
          "Amazing service! So easy to book my appointment."
        </p>
        <p className="font-semibold">— Sarah M.</p>

        <a
          href="/booking"
          className="mt-8 inline-block px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Book Your Appointment Now
        </a>
      </section>

    </div>
  );
}

export default Home;
