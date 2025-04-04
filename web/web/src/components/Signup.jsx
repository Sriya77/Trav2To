import React, { useState } from "react";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { motion } from "framer-motion";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({
    name: false,
    email: false,
    phone: false,
    password: false,
    confirmPassword: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    setError({
      name: false,
      email: false,
      phone: false,
      password: false,
      confirmPassword: false,
    });

    if (!name || !email || !phone || !password || !confirmPassword) {
      setError({
        name: !name,
        email: !email,
        phone: !phone,
        password: !password,
        confirmPassword: !confirmPassword,
      });
      return;
    }

    if (password !== confirmPassword) {
      setError((prev) => ({ ...prev, confirmPassword: true }));
      return;
    }

    const userDetails = { name, email, phone, password };
    console.log(userDetails);
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 overflow-hidden p-5">
      {/* Animated Background Circles */}
      <motion.div
        animate={{ x: [0, 80, 0], y: [0, 40, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute w-32 h-32 md:w-64 md:h-64 bg-blue-200 rounded-full opacity-30 top-5 left-5 md:top-10 md:left-10 blur-2xl"
      />
      <motion.div
        animate={{ x: [-80, 50, -80], y: [-40, 0, -40], opacity: [0.3, 0.6, 0.3] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute w-36 h-36 md:w-72 md:h-72 bg-pink-100 rounded-full opacity-30 bottom-5 right-5 md:bottom-10 md:right-10 blur-2xl"
      />

      {/* Signup Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        whileHover={{ scale: 1.03, boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.1)" }}
        className="p-6 md:p-8 bg-white shadow-lg rounded-2xl w-full max-w-[400px] lg:max-w-[480px] backdrop-blur-lg bg-opacity-90"
      >
        <h2 className="text-2xl font-bold text-center mb-5 text-gray-700">Sign Up</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name Field */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Full Name</label>
            <InputText
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className={`w-full p-2 border rounded-lg ${
                error.name ? "border-red-400" : "border-gray-300"
              }`}
            />
            {error.name && <p className="text-red-400 text-xs mt-1">Enter a valid name</p>}
          </div>

          {/* Email Field */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Email</label>
            <InputText
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full p-2 border rounded-lg ${
                error.email ? "border-red-400" : "border-gray-300"
              }`}
            />
            {error.email && <p className="text-red-400 text-xs mt-1">Enter a valid email</p>}
          </div>

          {/* Phone Field */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Phone Number</label>
            <InputText
              type="tel"
              placeholder="Enter your phone number"
              value={phone}
              maxLength={10}
              onChange={(e) => setPhone(e.target.value)}
              onInput={(e) => (e.target.value = e.target.value.replace(/\D/g, ""))}
              className={`w-full p-2 border rounded-lg ${
                error.phone ? "border-red-400" : "border-gray-300"
              }`}
            />
            {error.phone && <p className="text-red-400 text-xs mt-1">Enter a valid phone number</p>}
          </div>

          {/* New Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-600">New Password</label>
            <InputText
              type="password"
              placeholder="Enter a new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={`w-full p-2 border rounded-lg ${
                error.password ? "border-red-400" : "border-gray-300"
              }`}
            />
            {error.password && <p className="text-red-400 text-xs mt-1">Enter a valid password</p>}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label className="block text-sm font-medium text-gray-600">Confirm Password</label>
            <InputText
              type="password"
              placeholder="Confirm your password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className={`w-full p-2 border rounded-lg ${
                error.confirmPassword ? "border-red-400" : "border-gray-300"
              }`}
            />
            {error.confirmPassword && <p className="text-red-400 text-xs mt-1">Passwords do not match</p>}
          </div>

          {/* Submit Button */}
          <div>
            <Button
              label="Sign Up"
              type="submit"
              className="w-full p-3 text-lg p-button-primary transition-transform transform hover:scale-105 rounded-lg"
            />
          </div>
        </form>
      </motion.div>
    </div>
  );
}

export default Signup;
