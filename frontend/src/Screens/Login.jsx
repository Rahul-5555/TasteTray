import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaEye, FaEyeSlash } from 'react-icons/fa'; // Import icons for email and password visibility

export default function Login() {
  const [credentials, setCredentials] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("http://localhost:5000/api/loginuser", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email: credentials.email, password: credentials.password })
    });
    const json = await response.json();

    if (!json.success) {
      alert("Invalid Credentials");
    } else {
      localStorage.setItem("userEmail", credentials.email);
      localStorage.setItem("authToken", json.authToken);
      navigate("/");
    }
  };

  const onChange = (event) => {
    setCredentials({ ...credentials, [event.target.name]: event.target.value });
  };

  return (
    <div className="bg-slate-300 flex items-center justify-center min-h-screen">
      <div className="bg-white w-full max-w-md p-8 rounded-xl shadow-2xl">
        <h2 className="text-4xl font-semibold text-center text-orange-600 mb-8">Login to Your Account</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="flex items-center border border-gray-300 rounded-lg p-2">
            <FaEnvelope className="text-gray-500 mr-3" />
            <input
              type="email"
              name="email"
              id="email"
              value={credentials.email}
              onChange={onChange}
              required
              className="w-full px-4 py-3 outline-none"
              placeholder="you@example.com"
            />
          </div>

          <div className="flex items-center border border-gray-300 rounded-lg p-2">
            <FaEyeSlash className={`text-gray-500 mr-3 cursor-pointer ${showPassword ? 'hidden' : 'block'}`} onClick={() => setShowPassword(true)} />
            <FaEye className={`text-gray-500 mr-3 cursor-pointer ${showPassword ? 'block' : 'hidden'}`} onClick={() => setShowPassword(false)} />
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              value={credentials.password}
              onChange={onChange}
              required
              className="w-full px-4 py-3 outline-none"
              placeholder="••••••••"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 mt-4 text-white bg-orange-500 rounded-lg hover:bg-orange-700 transition duration-300 ease-in-out"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <Link to="/createuser" className="text-orange-600 hover:text-orange-700 font-medium">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
