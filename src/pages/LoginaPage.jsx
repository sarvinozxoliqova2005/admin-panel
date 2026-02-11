import axios from "axios";
import React, { useState } from "react";
import { BsBoxFill } from "react-icons/bs";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const LoginPage = () => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!phone || !password) {
      toast.warning("Please complete all required fields!");
      return;
    }

    setIsLoading(true);

    try {
      const params = new URLSearchParams();
      params.append("phone", phone);
      params.append("password", password);

      const response = await axios.post(
        "http://192.168.0.193:8000/api/login",
        params,
        {
          headers: {
            accept: "application/json",
            "Content-Type": "application/x-www-form-urlencoded",
          },
        },
      );

      if (response.data) {
        localStorage.setItem("token", response.data.token);
        toast.success("You have successfully logged in!");
        setTimeout(() => navigate("/dashboard"), 1500);
      }
    } catch (error) {
      const message =
        error.response?.data?.message || "Invalid phone number or password!";
      toast.error(message);
      console.log("Xato tafsiloti:", error.response?.data);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#F8FAFC] max-[600px]:px-4 font-sans">
      <ToastContainer position="top-right" autoClose={3000} />

      <div className="text-center mb-8">
        <div className="w-14 h-14 mx-auto mb-4 rounded-2xl bg-white shadow-sm flex items-center justify-center border border-slate-100">
          <BsBoxFill className="text-blue-700 text-[28px]" />
        </div>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight">
          Welcome Back
        </h1>
        <p className="text-slate-500 text-sm mt-2 font-medium">
          Login to access your NFC dashboard
        </p>
      </div>
      <div className="w-full max-w-[480px] bg-white p-10 rounded-[24px] shadow-xl shadow-slate-200/50 border border-slate-100">
        <form className="space-y-5" onSubmit={handleSubmit}>
          <div className="space-y-1.5">
            <label className="block text-[11px] font-black text-slate-500 uppercase tracking-wider">
              Phone Number
            </label>
            <input
              type="text"
              placeholder="+9989...."
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border-[1px] border-gray-400 cursor-pointer  rounded-md px-4 py-3 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:text-slate-300"
            />
          </div>

          <div className="space-y-1.5">
            <label className="block text-[11px] font-black text-slate-500 uppercase tracking-wider">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border-[1px] border-gray-400 cursor-pointer rounded-md px-4 py-3 text-sm font-bold text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all placeholder:text-slate-300"
              />
              <span
                className="absolute right-4 top-3 text-slate-400 cursor-pointer text-xl hover:text-slate-600 transition-colors"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <IoEyeOffOutline /> : <IoEyeOutline />}
              </span>
            </div>
            <div className="text-right">
              <a
                href="#"
                className="text-[12px] text-blue-600 font-bold hover:text-blue-700 transition-colors"
              >
                Forgot Password?
              </a>
            </div>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full bg-blue-700 text-white py-3.5 rounded-md font-black text-xs uppercase tracking-widest hover:bg-blue-800 transition-all shadow-lg cursor-pointer shadow-blue-200 mt-2 ${
              isLoading
                ? "opacity-70 cursor-not-allowed"
                : "active:scale-[0.98]"
            }`}
          >
            {isLoading ? "Checking..." : "Sign In"}
          </button>
        </form>
        <p className="text-center text-xs text-slate-400 mt-8 font-bold">
          DON'T HAVE AN ACCOUNT?{" "}
          <Link
            to={`/registration`}
            className="text-blue-600 hover:text-blue-700 transition-colors underline underline-offset-4"
          >
            REGISTER NOW
          </Link>
        </p>
      </div>
      <div className="flex justify-center mt-10 space-x-6 text-slate-300 text-[10px] font-black tracking-[0.2em] uppercase">
        <span className="hover:text-slate-400 cursor-pointer transition-colors">
          Operational
        </span>
        <span className="hover:text-slate-400 cursor-pointer transition-colors">
          Privacy
        </span>
        <span className="hover:text-slate-400 cursor-pointer transition-colors">
          Support
        </span>
      </div>
    </div>
  );
};

export default LoginPage;
