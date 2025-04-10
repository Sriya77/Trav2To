// import React, { useState } from "react";
// import { InputText } from "primereact/inputtext";
// import { Button } from "primereact/button";
// import { motion } from "framer-motion"; 
// import "primereact/resources/themes/lara-light-blue/theme.css";
// import "primereact/resources/primereact.min.css";
// import "primeicons/primeicons.css";

// function Login() {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [error, setError] = useState({ email: false, password: false });

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     setError({ email: false, password: false });

//     if (!email || !password) {
//       setError({ email: !email, password: !password });
//       return;
//     }

//     console.log({ email, password });
//   };

//   return (
//     <div className="relative flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 overflow-hidden px-4">
//       {/* Animated Background Circles */}
//       <motion.div 
//         animate={{ x: [0, 80, 0], y: [0, 40, 0], opacity: [0.3, 0.6, 0.3] }}
//         transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
//         className="absolute w-52 h-52 md:w-72 md:h-72 bg-blue-200 rounded-full opacity-30 top-10 left-10 blur-2xl"
//       />
//       <motion.div 
//         animate={{ x: [-80, 50, -80], y: [-40, 0, -40], opacity: [0.3, 0.6, 0.3] }}
//         transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
//         className="absolute w-56 h-56 md:w-80 md:h-80 bg-pink-100 rounded-full opacity-30 bottom-10 right-10 blur-2xl"
//       />

//       {/* Responsive Login Card */}
//       <motion.div
//         initial={{ opacity: 0, scale: 0.95 }} 
//         animate={{ opacity: 1, scale: 1 }} 
//         transition={{ duration: 0.5, ease: "easeOut" }}
//         whileHover={{ scale: 1.03, boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.1)" }} 
//         className="p-8 md:p-10 bg-white shadow-lg rounded-2xl w-full max-w-[380px] md:max-w-[450px] lg:max-w-[500px] backdrop-blur-lg bg-opacity-90"
//       >
//         <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-700">Login</h2>
//         <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.2, duration: 0.4 }}
//           >
//             <label className="block text-sm md:text-base font-medium text-gray-600">Email</label>
//             <InputText
//               type="email"
//               name="email"
//               placeholder="Enter your email"
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               className={w-full p-2 md:p-3 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-blue-400 ${
//                 error.email ? "border-red-400" : "border-gray-300"
//               }}
//             />
//             {error.email && <p className="text-red-400 text-sm mt-1">Enter a valid email</p>}
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: -20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.3, duration: 0.4 }}
//             className="pt-3"
//           >
//             <label className="block text-sm md:text-base font-medium text-gray-600">Password</label>
//             <InputText
//               type="password"
//               name="password"
//               placeholder="Enter your password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className={w-full p-2 md:p-3 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-blue-400 ${
//                 error.password ? "border-red-400" : "border-gray-300"
//               }}
//             />
//             {error.password && <p className="text-red-400 text-sm mt-1">Enter a valid password</p>}
//           </motion.div>

//           <motion.div
//             initial={{ opacity: 0, y: 20 }}
//             animate={{ opacity: 1, y: 0 }}
//             transition={{ delay: 0.4, duration: 0.4 }}
//             className="pt-5"
//           >
//             <Button
//               label="Submit"
//               type="submit"
//               className="w-full p-2 md:p-3 text-lg p-button-primary transition-transform transform hover:scale-105 rounded-lg"
//             />
//           </motion.div>
//         </form>
//       </motion.div>
//     </div>
//   );
// }

// export default Login;


import React from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { motion } from "framer-motion";
import "primereact/resources/themes/lara-light-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
    clearErrors,
    reset,
  } = useForm();

  const [message, setMessage] = React.useState("");

  const onSubmit = async (data) => {
    setMessage("");
    clearErrors();

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email: data.email,
        password: data.password,
      });

      setMessage("Login successful!");
      console.log("Login Success:", response.data);
      // localStorage.setItem("token", response.data.token);
      reset();
    } catch (err) {
      const errorMsg = err.response?.data?.message || "Login failed. Try again.";
      setMessage(errorMsg);
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 overflow-hidden px-4">
      {/* Animated Background Circles */}
      <motion.div 
        animate={{ x: [0, 80, 0], y: [0, 40, 0], opacity: [0.3, 0.6, 0.3] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute w-52 h-52 md:w-72 md:h-72 bg-blue-200 rounded-full opacity-30 top-10 left-10 blur-2xl"
      />
      <motion.div 
        animate={{ x: [-80, 50, -80], y: [-40, 0, -40], opacity: [0.3, 0.6, 0.3] }}
        transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
        className="absolute w-56 h-56 md:w-80 md:h-80 bg-pink-100 rounded-full opacity-30 bottom-10 right-10 blur-2xl"
      />

      {/* Login Card */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }} 
        animate={{ opacity: 1, scale: 1 }} 
        transition={{ duration: 0.5, ease: "easeOut" }}
        whileHover={{ scale: 1.03, boxShadow: "0px 10px 25px rgba(0, 0, 0, 0.1)" }} 
        className="p-8 md:p-10 bg-white shadow-lg rounded-2xl w-full max-w-[380px] md:max-w-[450px] lg:max-w-[500px] backdrop-blur-lg bg-opacity-90"
      >
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-6 text-gray-700">Login</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-6">
          
          {/* Email */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.4 }}
          >
            <label className="block text-sm md:text-base font-medium text-gray-600">Email</label>
            <InputText
              type="email"
              placeholder="Enter your email"
              className={`w-full p-2 md:p-3 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-blue-400 ${
                errors.email ? "border-red-400" : "border-gray-300"
              }`}
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Enter a valid email",
                },
              })}
            />
            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
          </motion.div>

          {/* Password */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
            className="pt-3"
          >
            <label className="block text-sm md:text-base font-medium text-gray-600">Password</label>
            <InputText
              type="password"
              placeholder="Enter your password"
              className={`w-full p-2 md:p-3 border rounded-lg transition-all duration-300 focus:ring-2 focus:ring-blue-400 ${
                errors.password ? "border-red-400" : "border-gray-300"
              }`}
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 4,
                  message: "Password must be at least 4 characters",
                },
              })}
            />
            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
          </motion.div>

          {/* Submit */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="pt-5"
          >
            <Button
              label="Submit"
              type="submit"
              className="w-full p-2 md:p-3 text-lg p-button-primary transition-transform transform hover:scale-105 rounded-lg"
            />
          </motion.div>
        </form>

        {/* Server message */}
        {message && (
          <p className={`mt-4 text-center text-sm ${message.includes("success") ? "text-green-500" : "text-red-500"}`}>
            {message}
          </p>
        )}
      </motion.div>
    </div>
  );
}

export default Login;
