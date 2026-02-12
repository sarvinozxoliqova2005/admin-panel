import axios from "axios";
import React, { useState } from "react";
import { BsBoxFill } from "react-icons/bs";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion"; 
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const [phone, setPhone] = useState("+998901234567"); 
  const [password, setPassword] = useState("123456"); 
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 }, 
    visible: { 
      opacity: 1, y: 0, 
      transition: { type: "spring", stiffness: 100, damping: 15 } 
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!phone || !password) {
      toast.warning("Please fill in all fields!");
      return;
    }
    
    setIsLoading(true);
    
    try {
      const response = await axios.post(
        "http://192.168.0.193:8000/api/login",
        {
          phone: phone.trim(),     
          password: password      
        },
        {
          headers: { 
            "Content-Type": "application/json", 
            "Accept": "application/json"
          },
          timeout: 10000
        }
      );

      console.log("Server response:", response.data);
      if (response.data) {
        if (response.data.status === 'success') {
          if (response.data.user) {
            localStorage.setItem("user", JSON.stringify(response.data.user));
          }
          
          if (response.data.token) {
            localStorage.setItem("token", response.data.token);
          }
          
          toast.success("Successfully logged in!", {
            position: "top-center",
            autoClose: 1500
          });
          
          setTimeout(() => navigate("/dashboard"), 1500);
        }
        
        else if (response.data.user) {
          localStorage.setItem("user", JSON.stringify(response.data.user));
          
          if (response.data.token) {
            localStorage.setItem("token", response.data.token);
          }
          
          toast.success(" Successfully logged in!");
          setTimeout(() => navigate("/dashboard"), 1500);
        }
        
        else if (response.data.token || response.data.access_token) {
          const token = response.data.token || response.data.access_token;
          localStorage.setItem("token", token);
          
          toast.success("Successfully logged in!");
          setTimeout(() => navigate("/dashboard"), 1500);
        }
                else {
          console.log("Server response:", response.data);
          localStorage.setItem("user_data", JSON.stringify(response.data));
          toast.success(" Successfully logged in!");
          setTimeout(() => navigate("/dashboard"), 1500);
        }
      }
      
    } catch (error) {
      console.error("Unable to log in:", error);
            if (error.response) {
        const errorData = error.response.data;
        const errorStatus = error.response.status;
        
        console.log("Status code:", errorStatus);
        console.log("Error info:", errorData);
                let errorMessage = "Successfully logged in!";
        
        if (errorData.detail) {
          errorMessage = errorData.detail;
        } else if (errorData.message) {
          errorMessage = errorData.message;
        } else if (errorData.error) {
          errorMessage = errorData.error;
        } else if (typeof errorData === 'string') {
          errorMessage = errorData;
        }
        
        if (errorStatus === 401) {
          toast.error("❌ Invalid phone number or password!");
        } else if (errorStatus === 404) {
          toast.error("❌ Unable to reach the server!");
        } else if (errorStatus === 400) {
          toast.error(`❌ ${errorMessage}`);
        } else if (errorStatus === 422) {
          toast.error("❌Incorrect data format!");
        } else if (errorStatus === 500) {
          toast.error("❌ Internal server error!");
        } else {
          toast.error(`❌ ${errorMessage}`);
        }
      } else if (error.code === 'ERR_NETWORK') {
        toast.error("Could not connect to the server! Please check your internet connection.");
      } else if (error.code === 'ECONNABORTED') {
        toast.error(" Connection timed out!");
      } else {
        toast.error(error.message || "An unexpected error occurred!");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4"
    >
      <ToastContainer 
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />

      <motion.div 
        variants={itemVariants} 
        className="text-center mb-8"
      >
        <motion.div 
          className="w-20 h-20 mx-auto mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg shadow-blue-200 flex items-center justify-center"
        >
          <BsBoxFill className="text-white text-4xl" />
        </motion.div>
        
        <h1 className="text-2xl font-bold text-gray-900 tracking-tight">
          Welcome Back
        </h1>
        <p className="text-gray-400 text-sm mt-3 font-medium">
          Login to access your NFC dashboard
        </p>
      </motion.div>

      <motion.div 
        variants={itemVariants}
        className="w-full max-w-lg bg-white p-8 sm:p-10 rounded-xl shadow-2xl shadow-gray-200/60 border border-gray-100"
      >
        <form className="space-y-6" onSubmit={handleSubmit}>
          <motion.div variants={itemVariants} className="space-y-2">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
              Phone Number
            </label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border-[1px] px-4 border-gray-400 rounded-md  cursor-pointerpx-4 py-3.5 text-sm font-medium text-gray-800 
                       focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 
                       transition-all duration-200 placeholder:text-gray-400 hover:border-gray-300"
              placeholder="+9989..."
              required
              disabled={isLoading}
            />
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-2">
            <label className="block text-xs font-bold text-gray-700 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-[1px] border-gray-400 rounded-md cursor-pointer px-4 py-3.5 text-sm font-medium text-gray-800 
                         focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 
                         transition-all duration-200 placeholder:text-gray-400 hover:border-gray-300"
                placeholder="********"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 
                         transition-colors cursor-pointer duration-200 focus:outline-none"
                disabled={isLoading}
              >
                {showPassword ? (
                  <IoEyeOffOutline className="text-xl" />
                ) : (
                  <IoEyeOutline className="text-xl" />
                )}
              </button>
            </div>
          </motion.div>

          <motion.button
            variants={itemVariants}
            type="submit"
            disabled={isLoading}
            className={`w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-4 rounded-lg 
                     font-bold text-sm uppercase tracking-wider shadow-lg shadow-blue-200 
                     hover:shadow-xl hover:shadow-blue-300 hover:from-blue-700 hover:to-blue-800
                     focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
                     transition-all duration-200 
                     ${isLoading ? "opacity-75 cursor-not-allowed" : "transform hover:-translate-y-0.5"}`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-3">
                <motion.div 
                  animate={{ rotate: 360 }} 
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-5 h-5 border-2 cursor-pointer border-white border-t-transparent rounded-full"
                />
                <span>Login...</span>
              </div>
            ) : (
              "Login"
            )}
          </motion.button>
        </form>

        <motion.div 
          variants={itemVariants} 
          className="relative my-8 "
        >
        </motion.div>

        <motion.p 
          variants={itemVariants} 
          className="text-center text-sm text-gray-600 flex items-center gap-3 justify-center "
        >
          Don't have an account?
          <Link 
            to="/registration" 
            className="font-bold text-blue-600 hover:text-blue-700 underline underline-offset-4 
                     transition-colors duration-200 "
          >
            Register Now
          </Link>
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default LoginPage;