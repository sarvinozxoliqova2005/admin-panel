import React from "react";
import {
  FaCrown,
  FaSignOutAlt,
  FaUsers,
  FaGraduationCap,
  FaChalkboardTeacher,
  FaUserTie,
} from "react-icons/fa";
import { FiRefreshCcw } from "react-icons/fi";
import { motion } from "framer-motion";
import SuperAdminTable from "./SuperAdminTable";

const translations = {
  uz: {
    superadminpanel: "Super Admin Panel",
    yangilash: "Yangilash",
    chiqish: "Chiqish",
    o: "0",
    jami_xodimlar: "Jami Xodimlar",
    talabalar: "Talabalar",
    oqtuvchilar: "O'qituvchilar",
    xodimlar: "Xodimlar",
  },
  ru: {
    superadminpanel: "Панель супер-админа",
    yangilash: "Обновить",
    chiqish: "Выход",
    o: "0",
    jami_xodimlar: "Всего сотрудников",
    talabalar: "Всего студентов",
    oqtuvchilar: "Преподаватели",
    xodimlar: "Сотрудники",
  },
  en: {
    superadminpanel: "Super Admin Panel",
    yangilash: "Update",
    chiqish: "Log out",
    o: "0",
    jami_xodimlar: "Total Employees",
    talabalar: "Students",
    oqtuvchilar: "Teachers",
    xodimlar: "Employees",
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
};

const cardVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100 } },
};

const SuperAdminDashboard = () => {
  const lang = localStorage.getItem("selectedLanguage") || "uz";
  const t = translations[lang] || translations.uz;

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col overflow-x-hidden">
      <motion.header
        initial={{ y: -70 }}
        animate={{ y: 0 }}
        className="shadow-md bg-blue-900 sticky top-0 z-50"
      >
        <div className="container mx-auto px-4 md:px-6 py-3 md:py-4 flex items-center justify-between">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 md:gap-3"
          >
            <FaCrown className="text-amber-400 text-xl md:text-3xl" />
            <h1 className="text-sm md:text-2xl font-black italic text-white uppercase tracking-tighter cursor-pointer truncate max-w-[150px] sm:max-w-none">
              {t.superadminpanel}
            </h1>
          </motion.div>

          <div className="flex items-center gap-2 md:gap-3">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-emerald-600 hover:bg-emerald-700 cursor-pointer p-2 sm:px-4 sm:py-2 rounded-lg md:rounded-xl text-white flex items-center gap-2 font-bold transition shadow-lg text-xs md:text-sm"
            >
              <FiRefreshCcw className="animate-spin-slow" />
              <span className="hidden md:inline">{t.yangilash}</span>
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-rose-600 hover:bg-rose-700 cursor-pointer p-2 sm:px-4 sm:py-2 rounded-lg md:rounded-xl text-white flex items-center gap-2 font-bold transition shadow-lg text-xs md:text-sm"
            >
              <FaSignOutAlt />
              <span className="hidden md:inline">{t.chiqish}</span>
            </motion.button>
          </div>
        </div>
      </motion.header>

      <main className="container mx-auto px-4 md:px-5 py-6 md:py-10">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12"
        >
          <StatCard
            color="border-blue-800"
            title={t.jami_xodimlar}
            value={t.o}
            icon={<FaUsers />}
          />
          <StatCard
            color="border-emerald-700"
            title={t.talabalar}
            value={t.o}
            icon={<FaGraduationCap />}
          />
          <StatCard
            color="border-amber-600"
            title={t.oqtuvchilar}
            value={t.o}
            icon={<FaChalkboardTeacher />}
          />
          <StatCard
            color="border-pink-800"
            title={t.xodimlar}
            value={t.o}
            icon={<FaUserTie />}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden"
        >
          <div className="overflow-x-auto">
            <SuperAdminTable />
          </div>
        </motion.div>
      </main>
    </div>
  );
};

const StatCard = ({ color, title, value, icon }) => (
  <motion.div
    variants={cardVariants}
    whileHover={{ y: -5 }}
    className={`bg-white p-5 md:p-7 cursor-pointer rounded-2xl shadow-sm border-l-[4px] md:border-l-[6px] ${color} flex items-center justify-between group transition-all`}
  >
    <div className="flex-1">
      <h2 className={`text-2xl md:text-4xl font-black mb-1 text-gray-800`}>
        {value}
      </h2>
      <p className="text-gray-400 text-[9px] md:text-[10px] font-black uppercase tracking-widest leading-tight">
        {title}
      </p>
    </div>
    <div
      className={`text-2xl md:text-3xl opacity-20 group-hover:opacity-100 group-hover:scale-110 transition-all duration-300 ml-2`}
    >
      {icon}
    </div>
  </motion.div>
);

export default SuperAdminDashboard;
