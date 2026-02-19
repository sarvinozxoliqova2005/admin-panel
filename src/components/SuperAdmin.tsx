import axios from "axios";
import { useState } from "react"; 
import { FaCrown, FaUser, FaLock } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion"; 

const translations = {
  uz: {
    superadmin: "Super Admin",
    subtitle: "Tizimga kirish uchun ma'lumotlarni kiriting",
    phone: "Foydalanuvchi nomi", 
    password: "Parol",
    kirish: "Kirish",
    parolni_unutdingizmi: "Parolni Unutdingizmi?",
    loading: "Kirish...",
    toast_fill: "Iltimos, barcha maydonlarni to'ldiring!",
    toast_error: "Username yoki parol noto'g'ri!",
    toast_server: "Serverda xatolik yuz berdi!",
    toast_success: "Tizimga muvaffaqiyatli kirdingiz!",
    toast_network: "Tarmoq xatoligi. Internetni tekshiring!"
  },
  ru: {
    superadmin: "Главный администратор",
    subtitle: "Введите данные для входа в систему",
    phone: "Имя пользователя",
    password: "Пароль",
    kirish: "Войти",
    parolni_unutdingizmi: "Забыли пароль?",
    loading: "Вход...",
    toast_fill: "Пожалуйста, заполните все поля!",
    toast_error: "Неверное имя пользователя или пароль!",
    toast_server: "Ошибка на сервере!",
    toast_success: "Вы успешно вошли в систему!",
    toast_network: "Ошибка сети. Проверьте интернет!"
  },
  en: {
    superadmin: "Super Admin",
    subtitle: "Enter your credentials to log in.",
    phone: "Username", 
    password: "Password",
    kirish: "Login",
    parolni_unutdingizmi: "Forgot your password?",
    loading: "Logging in...",
    toast_fill: "Please fill in all fields!",
    toast_error: "Incorrect username or password!",
    toast_server: "Internal Server Error!",
    toast_success: "Successfully logged in!",
    toast_network: "Network error. Check your internet!"
  }
};

const containerVariants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: { 
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { 
      duration: 0.5, 
      staggerChildren: 0.1 
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: { opacity: 1, x: 0 }
};

const SuperAdmin = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState(""); 
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const lang = localStorage.getItem("selectedLanguage") || "uz";
  const t = translations[lang];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      toast.warning(t.toast_fill); 
      return;
    }
    setLoading(true);
    const url = "http://192.168.0.193:8000/api/super_admin/login";
    try {
      const response = await axios.post(url, { username: username.trim(), password }, { timeout: 8000 });
      if (response.status === 200 || response.status === 201) {
        toast.success(t.toast_success, { theme: "colored" });
        setTimeout(() => navigate("/superadmindashboard", { replace: true }), 1500);
      }
    } catch (error) {
      toast.error(t.toast_error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center p-5 bg-gradient-to-br from-blue-600 to-blue-800 overflow-hidden">
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="bg-white/95 backdrop-blur-sm shadow-2xl rounded-3xl max-w-[480px] w-full p-8 border border-white/20"
      >
        <motion.div variants={itemVariants} className="flex flex-col items-center mb-8 text-center">
          <motion.div 
            whileHover={{ rotate: 15, scale: 1.1 }}
            className="bg-amber-100 p-4 rounded-2xl mb-4 shadow-inner cursor-pointer"
          >
            <FaCrown className="text-amber-500 text-4xl" />
          </motion.div>
          <h1 className="text-2xl font-black text-gray-800 ">
            {t.superadmin}
          </h1>
          <p className="text-gray-500 text-sm mt-2 ">
            {t.subtitle}
          </p>
        </motion.div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <motion.div variants={itemVariants} className="relative group">
            <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              type="text"
              placeholder={t.phone}
              className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 transition-all bg-gray-50/50 font-semibold"
              disabled={loading}
            />
          </motion.div>

          <motion.div variants={itemVariants} className="relative group">
            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-600 transition-colors" />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              placeholder={t.password}
              className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl outline-none focus:ring-4 focus:ring-blue-600/10 focus:border-blue-600 transition-all bg-gray-50/50 font-semibold"
              disabled={loading}
            />
          </motion.div>

          <motion.button
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={loading}
            className={`w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold py-4 rounded-2xl transition-all shadow-xl shadow-blue-700/20 flex justify-center items-center uppercase tracking-widest text-sm ${
              loading ? "opacity-70 cursor-not-allowed" : "cursor-pointer"
            }`}
          >
            {loading ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                className="h-5 w-5 border-2 border-white border-t-transparent rounded-full"
              />
            ) : (
              t.kirish  
            )}
          </motion.button>
        </form>

        <motion.div variants={itemVariants} className="mt-2 text-center border-t border-gray-100 pt-6">
          <motion.button 
            whileHover={{ color: "#2563eb", x: 5 }}
            type="button" 
            className="text-xs font-bold cursor-pointer text-blue-600 cursor-pointer uppercase tracking-tighter transition-all"
            onClick={() => toast.info("Admin bilan bog'laning")}
          >
            {t.parolni_unutdingizmi}
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default SuperAdmin;