import { Link } from "react-router-dom";
/* Welcome Text */
<div className="mb-6">
  <h2 className="text-xl font-semibold text-gray-800">Welcome to SmartBooking!</h2>
  <p className="text-gray-600 text-sm mt-2">
    Create your account to book appointments instantly and enjoy personalized salon services.
  </p>
</div>


function Signup() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">

      <div className="bg-white shadow-lg rounded-2xl p-10 w-full max-w-md text-center">

        {/* Logo */}
        <div className="mb-6">
          <img
            src="/images/logo.png"
            alt="SmartBooking Logo"
            className="w-24 mx-auto mb-3"
          />
          <h1 className="text-2xl font-bold text-gray-800">Create Account</h1>
        </div>

        {/* Signup Form */}
        <form className="space-y-4">

          <div className="text-left">
            <label className="block text-gray-700 mb-1">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="text-left">
            <label className="block text-gray-700 mb-1">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <div className="text-left">
            <label className="block text-gray-700 mb-1">Password</label>
            <input
              type="password"
              placeholder="Create a password"
              className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-medium hover:bg-blue-700 transition"
          >
            Register
          </button>
        </form>

        {/* Footer Links */}
        <p className="text-gray-600 text-sm mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-medium hover:underline">
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Signup;
