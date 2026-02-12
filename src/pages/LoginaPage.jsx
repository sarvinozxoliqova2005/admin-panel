import axios from "axios";
import React, { useState } from "react";
import { BsBoxFill } from "react-icons/bs";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion"; 
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.08, 
        delayChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 }, 
    visible: { 
      opacity: 1, 
      y: 0, 
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
    const params = new URLSearchParams();
    params.append("phone", phone);
    params.append("password", password);

    const response = await axios.post("http://192.168.0.193:8000/api/login", params, {
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      timeout: 5000 
    });

    if (response.data) {
      localStorage.setItem("token", response.data);
      toast.success("Welcome back!");
      setTimeout(() => navigate("/dashboard"), 1000);
    }
  } catch (error) {
    if (error.code === 'ERR_NETWORK') {
      toast.error("Network Error: Server (192.168.0.193) unreachable.");
    } else {
      toast.error(error.response?.data?.detail || "Unable to log in. Please check your connection!");
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
      className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] max-[600px]:px-4 font-sans"
    >
      <ToastContainer position="top-right" autoClose={2000} />

      <motion.div variants={itemVariants} className="text-center mb-8">
        <motion.div 
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-white shadow-sm flex items-center justify-center border border-slate-100"
        >
          <BsBoxFill className="text-blue-700 text-[28px]" />
        </motion.div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">Welcome Back</h1>
        <p className="text-slate-500 text-sm mt-2 font-medium">Login to access your NFC dashboard</p>
      </motion.div>

      <motion.div 
        variants={itemVariants}
        className="w-full max-w-[480px] bg-white p-10 rounded-[24px] shadow-xl shadow-slate-200/50 border border-slate-100"
      >
        <form className="space-y-5" onSubmit={handleSubmit}>
          <motion.div variants={itemVariants} className="space-y-1.5">
            <label className="block text-[11px] font-black text-slate-500 uppercase tracking-wider">Phone Number</label>
            <input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border-[1px] border-gray-400 cursor-pointer rounded-md px-4 py-3 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:text-slate-300"
              placeholder="+9989...."
            />
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-1.5">
            <label className="block text-[11px] font-black text-slate-500 uppercase tracking-wider">Password</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-[1px] border-gray-400 rounded-md cursor-pointer px-4 py-3 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:text-slate-300"
                placeholder="********"
              />
              <span className="absolute right-4 top-3 text-slate-400 cursor-pointer text-xl hover:text-slate-600 transition-colors" onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
              </span>
            </div>
          </motion.div>

          <motion.button
            variants={itemVariants}
          
            type="submit"
            disabled={isLoading}
            className={`w-full bg-blue-700 text-white py-3.5 rounded-md font-black text-xs uppercase tracking-widest shadow-lg cursor-pointer shadow-blue-200 mt-2 ${isLoading ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {isLoading ? (
               <motion.div 
                animate={{ rotate: 360 }} 
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="w-4 h-4 border-2 border-white border-t-transparent rounded-full mx-auto"
               />
            ) : "Sign In"}
          </motion.button>
        </form>

        <motion.p variants={itemVariants} className="text-center text-xs text-slate-400 mt-8 font-bold">
          DON'T HAVE AN ACCOUNT?{" "}
          <Link to={`/registration`} className="text-blue-600 hover:text-blue-700 underline underline-offset-4">
            REGISTER NOW
          </Link>
        </motion.p>
      </motion.div>

      <motion.div 
        variants={itemVariants}
        className="flex justify-center mt-10 space-x-6 text-slate-300 text-[10px] font-black tracking-[0.2em] uppercase"
      >
        <span>Operational</span>
        <span>Privacy</span>
        <span>Support</span>
      </motion.div>
    </motion.div>
  );
};

export default LoginPage;