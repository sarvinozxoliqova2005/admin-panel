import axios from "axios";
import React, { useState, useEffect } from "react";
import { BsBoxFill } from "react-icons/bs";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useNavigate, Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import { motion } from "framer-motion"; 
import "react-toastify/dist/ReactToastify.css";

const translations = {
  uz: {
    welcome: "Xush kelibsiz",
    subtitle: "NFC panelingizga kirish uchun tizimga kiring",
    phoneLabel: "Telefon raqami",
    passwordLabel: "Parol",
    loginBtn: "Kirish",
    loggingIn: "Kirilmoqda...",
    noAccount: "Hisobingiz yo'qmi?",
    registerNow: "Ro'yxatdan o'ting",
    fillAll: "Iltimos, barcha maydonlarni to'ldiring!",
    success: "Muvaffaqiyatli kirdingiz!",
    error401: "❌ Telefon raqam yoki parol noto'g'ri!",
    errorNetwork: "🌐 Server bilan aloqa yo'q!",
    errorGeneric: "Xatolik yuz berdi. Qayta urinib ko'ring."
  },
  ru: {
    welcome: "С возвращением",
    subtitle: "Войдите, чтобы получить доступ к панели NFC",
    phoneLabel: "Номер телефона",
    passwordLabel: "Пароль",
    loginBtn: "Войти",
    loggingIn: "Вход...",
    noAccount: "Нет аккаунта?",
    registerNow: "Зарегистрироваться",
    fillAll: "Пожалуйста, заполните все поля!",
    success: "Успешный вход!",
    error401: "❌ Неверный номер или пароль!",
    errorNetwork: "🌐 Нет соединения с сервером!",
    errorGeneric: "Произошла ошибка. Попробуйте еще раз."
  },
  en: {
    welcome: "Welcome Back",
    subtitle: "Login to access your NFC dashboard",
    phoneLabel: "Phone Number",
    passwordLabel: "Password",
    loginBtn: "Login",
    loggingIn: "Logging in...",
    noAccount: "Don't have an account?",
    registerNow: "Register Now",
    fillAll: "Please fill in all fields!",
    success: "Successfully logged in!",
    error401: "❌ Invalid phone number or password!",
    errorNetwork: "🌐 Could not connect to the server!",
    errorGeneric: "An error occurred. Please try again."
  }
};

const LoginPage = () => {
  const lang = localStorage.getItem("selectedLanguage") || "uz";
  const t = translations[lang];

  const [phone, setPhone] = useState(""); 
  const [password, setPassword] = useState(""); 
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
      toast.warning(t.fillAll);
      return;
    }
    setIsLoading(true);
    try {
      const response = await axios.post(
        "http://192.168.0.193:8000/api/login",
        { phone: phone.trim(), password: password },
        {
          headers: { "Content-Type": "application/json", "Accept": "application/json" },
          timeout: 10000
        }
      );

      if (response.data) {
        const token = response.data.token || response.data.access_token;
        if (token) localStorage.setItem("token", token);
        if (response.data.user) localStorage.setItem("user", JSON.stringify(response.data.user));
        
        toast.success(t.success);
        setTimeout(() => {
          navigate("/dashboard");
        }, 1500);
      }
    } catch (error) {
      if (error.response?.status === 401) {
        toast.error(t.error401);
      } else if (error.code === 'ERR_NETWORK') {
        toast.error(t.errorNetwork);
      } else {
        toast.error(t.errorGeneric);
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
      className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-8"
    >
      <ToastContainer position="top-center" autoClose={3000} theme="light" />

      <motion.button 
        variants={itemVariants}
        onClick={() => navigate("/language")}
        className="absolute top-6 left-6 text-xs font-bold cursor-pointer text-blue-600 transition-colors uppercase tracking-widest"
      >
        ← {lang === 'uz' ? 'Tilni o\'zgartirish' : lang === 'ru' ? 'Сменить язык' : 'Change Language'}
      </motion.button>

      <motion.div variants={itemVariants} className="text-center mb-6 sm:mb-8">
        <motion.div 
          className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6 rounded-2xl bg-gradient-to-br from-blue-500 to-blue-700 shadow-lg shadow-blue-200 flex items-center justify-center"
        >
          <BsBoxFill className="text-white text-3xl sm:text-4xl" />
        </motion.div>
        
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight uppercase">
          {t.welcome}
        </h1>
        <p className="text-gray-400 text-xs sm:text-sm mt-2 sm:mt-3 font-medium px-4">
          {t.subtitle}
        </p>
      </motion.div>

      <motion.div 
        variants={itemVariants}
        className="w-full max-w-[440px] bg-white p-6 sm:p-10 rounded-xl shadow-2xl shadow-gray-200/60 border border-gray-100"
      >
        <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
          <motion.div variants={itemVariants} className="space-y-2">
            <label className="block text-[10px] sm:text-xs font-bold text-gray-700 uppercase tracking-wider">
              {t.phoneLabel}
            </label>
            <input
              autoComplete="off"
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 sm:py-3.5 text-sm font-medium text-gray-800 
                       focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 
                       transition-all duration-200 placeholder:text-gray-400"
              placeholder="+9989..."
              required
              disabled={isLoading}
            />
          </motion.div>

          <motion.div variants={itemVariants} className="space-y-2">
            <label className="block text-[10px] sm:text-xs font-bold text-gray-700 uppercase tracking-wider">
              {t.passwordLabel}
            </label>
            <div className="relative">
              <input
                autoComplete="off"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full border border-gray-300 rounded-lg px-4 py-3 sm:py-3.5 text-sm font-medium text-gray-800 
                         focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 
                         transition-all duration-200"
                placeholder="********"
                required
                disabled={isLoading}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 
                         transition-colors cursor-pointer duration-200"
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
            className={`w-full bg-gradient-to-r from-blue-600 to-blue-700 text-white py-3.5 sm:py-4 rounded-xl 
                     font-bold text-sm uppercase tracking-wider shadow-lg shadow-blue-200 
                     hover:shadow-xl hover:shadow-blue-300 cursor-pointer hover:from-blue-700 hover:to-blue-800
                     
                     ${isLoading ? "opacity-75 cursor-pointer" : ""}`}
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-3">
                <motion.div 
                  animate={{ rotate: 360 }} 
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
                <span>{t.loggingIn}</span>
              </div>
            ) : (
              t.loginBtn
            )}
          </motion.button>
        </form>

        <motion.p 
          variants={itemVariants} 
          className="text-center text-sm text-gray-600 mt-6 sm:mt-8"
        >
          {t.noAccount}{" "}
          <Link 
            to="/registration" 
            className="font-bold text-blue-600 hover:text-blue-700 underline underline-offset-4"
          >
            {t.registerNow}
          </Link>
        </motion.p>
      </motion.div>
    </motion.div>
  );
};

export default LoginPage;