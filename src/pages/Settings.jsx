import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MdDashboard, MdSettings } from "react-icons/md";
import { BsCreditCardFill, BsStopwatch } from "react-icons/bs";
import { CgInsights } from "react-icons/cg";
import { motion } from "framer-motion";

// --- ANIMATSIYA VARIANTLARI ---
const containerVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.1 } }
};

const sidebarVariants = {
  hidden: { x: -80, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 20, staggerChildren: 0.08, delayChildren: 0.2 }
  }
};

const sideItemVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 120 } }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 15 } }
};

// --- LUG'AT ---
const translations = {
  uz: {
    dashboard: "Boshqaruv", cards: "Kartalar", activity: "Harakatlar", insights: "Tahlillar", settings: "Sozlamalar",
    adminPortal: "Admin Portali", settingsDesc: "Hisob, xavfsizlik va bildirishnomalarni boshqaring.",
    cancel: "Bekor qilish", save: "Saqlash", profile: "Profil ma'lumotlari", profileDesc: "Rasm va ma'lumotlarni yangilang.",
    pic: "Profil rasmi", upload: "Yuklash", remove: "O'chirish", fname: "Ism", lname: "Familiya", email: "Email", phone: "Telefon",
    security: "Xavfsizlik", curPass: "Joriy parol", newPass: "Yangi parol", confPass: "Tasdiqlash", updatePass: "Yangilash",
    pref: "Afzalliklar", alertTrans: "Tranzaksiya bildirishnomalari", alertSec: "Xavfsizlik ogohlantirishlari",
    danger: "Xavfli zona", dangerDesc: "Hisobni butunlay o'chirib tashlash.", deactive: "Hisobni o'chirish"
  },
  ru: {
    dashboard: "Панель", cards: "Карты", activity: "Активность", insights: "Аналитика", settings: "Настройки",
    adminPortal: "Админ Портал", settingsDesc: "Управляйте аккаунтом, безопасностью и уведомлениями.",
    cancel: "Отмена", save: "Сохранить", profile: "Профиль", profileDesc: "Обновите фото и личные данные.",
    pic: "Фото профиля", upload: "Загрузить", remove: "Удалить", fname: "Имя", lname: "Фамилия", email: "Email", phone: "Телефон",
    security: "Безопасность", curPass: "Текущий пароль", newPass: "Новый пароль", confPass: "Подтверждение", updatePass: "Обновить",
    pref: "Предпочтения", alertTrans: "Уведомления о транзакциях", alertSec: "Оповещения безопасности",
    danger: "Опасная зона", dangerDesc: "Безвозвратное удаление аккаунта.", deactive: "Деактивировать"
  },
  en: {
    dashboard: "Dashboard", cards: "Cards", activity: "Activity", insights: "Insights", settings: "Settings",
    adminPortal: "Admin Portal", settingsDesc: "Manage account, security, and notification preferences.",
    cancel: "Cancel", save: "Save Changes", profile: "Profile Information", profileDesc: "Update photo and personal details.",
    pic: "Profile Picture", upload: "Upload", remove: "Remove", fname: "First Name", lname: "Last Name", email: "Email", phone: "Phone",
    security: "Security", curPass: "Current Password", newPass: "New Password", confPass: "Confirm Password", updatePass: "Update",
    pref: "Preferences", alertTrans: "Transaction Alerts", alertSec: "Security Alerts",
    danger: "Danger Zone", dangerDesc: "Permanently delete your account.", deactive: "Deactivate Account"
  }
};

const Settings = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // Tilni localStorage'dan olamiz, agar yo'q bo'lsa 'uz'
  const lang = localStorage.getItem("lang") || "uz";
  const t = translations[lang];

  const user = JSON.parse(localStorage.getItem("user")) || { 
    name: "Alex", 
    surname: "Morgan", 
    email: "alex.m@nfcmanager.com" 
  };

  const menuItems = [
    { label: t.dashboard, path: "/dashboard", icon: <MdDashboard size={18} /> },
    { label: t.cards, icon: <BsCreditCardFill size={18} /> },
    { label: t.activity, icon: <BsStopwatch size={18} /> },
    { label: t.insights, icon: <CgInsights size={18} /> },
    { label: t.settings, path: "/setting", icon: <MdSettings size={18} /> },
  ];

  return (
    <motion.div initial="hidden" animate="visible" variants={containerVariants} className="flex min-h-screen bg-[#F8F9FD] font-sans text-slate-700">
      
      {/* SIDEBAR */}
      <motion.aside variants={sidebarVariants} className="w-64 bg-white border-r border-slate-200 flex flex-col p-6 hidden lg:flex fixed left-0 top-0 h-screen z-10">
        <motion.div variants={sideItemVariants} className="flex items-center gap-2 mb-10">
          <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center text-white font-bold">N</div>
          <div className="text-left">
            <h1 className="text-xs font-black text-slate-800 uppercase tracking-tight">NFC MANAGER</h1>
            <p className="text-[9px] text-slate-400 font-bold -mt-1 uppercase">{t.adminPortal}</p>
          </div>
        </motion.div>

        <nav className="flex-1 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <motion.div key={item.label} variants={sideItemVariants} onClick={() => item.path && navigate(item.path)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl cursor-pointer transition-all ${isActive ? "bg-blue-50 text-blue-700 shadow-sm" : "text-slate-500 hover:bg-slate-50"}`}>
                <span className={isActive ? "text-blue-700" : "text-slate-400"}>{item.icon}</span>
                <span className="text-xs font-bold">{item.label}</span>
              </motion.div>
            );
          })}
        </nav>

        <motion.div variants={sideItemVariants} className="mt-auto flex items-center gap-3 pt-4 border-t border-slate-100 cursor-pointer">
          <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-[10px]">
            {user.name[0]}{user.surname[0]}
          </div>
          <div className="overflow-hidden text-left">
            <p className="text-[11px] font-black text-slate-800 leading-none">{user.name} {user.surname}</p>
            <p className="text-[9px] text-slate-400 truncate">{user.email}</p>
          </div>
        </motion.div>
      </motion.aside>

      {/* MAIN CONTENT */}
      <motion.main variants={containerVariants} className="flex-1 p-3 md:p-10 overflow-y-auto md:ml-64">
        <motion.div variants={itemVariants} className="border-b border-slate-100 flex justify-between items-center pb-6">
          <div className="text-left">
            <h1 className="text-2xl font-black text-slate-900">{t.settings}</h1>
            <p className="text-xs text-slate-500 font-medium">{t.settingsDesc}</p>
          </div>
          <div className="flex gap-3">
            <button className="px-5 py-2 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all">{t.cancel}</button>
            <button className="px-5 py-2 text-xs font-bold text-white bg-blue-700 rounded-xl shadow-lg shadow-blue-100 hover:bg-blue-800 transition-all">{t.save}</button>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="mx-auto bg-white rounded-[15px] shadow-sm overflow-hidden mt-8 border border-slate-100">
          <div className="p-8 space-y-12">
            <section>
              <h2 className="text-sm font-black text-slate-900 mb-1 text-left">{t.profile}</h2>
              <p className="text-[11px] text-slate-400 font-bold mb-6 text-left">{t.profileDesc}</p>
              
              <div className="flex items-center gap-6 mb-8">
                <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-200 border-2 border-orange-100">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>
                </div>
                <div className="text-left">
                  <p className="text-[11px] font-black text-slate-800 mb-1">{t.pic}</p>
                  <div className="flex gap-4">
                    <button className="text-blue-700 text-[10px] font-black uppercase hover:underline">{t.upload}</button>
                    <button className="text-red-500 text-[10px] font-black uppercase hover:underline">{t.remove}</button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputBox label={t.fname} value={user.name} />
                <InputBox label={t.lname} value={user.surname} />
                <InputBox label={t.email} value={user.email} />
                <InputBox label={t.phone} value="+998 90 123 45 67" />
              </div>
            </section>

            <section className="pt-8 border-t border-slate-100">
              <h2 className="text-sm font-black text-slate-900 mb-6 text-left">{t.security}</h2>
              <div className="max-w-md space-y-4">
                <InputBox label={t.curPass} type="password" value="********" />
                <InputBox label={t.newPass} placeholder="min. 8" />
                <div className="text-left">
                  <button className="text-blue-700 text-[11px] font-black mt-2 inline-flex items-center gap-1">{t.updatePass} <span>→</span></button>
                </div>
              </div>
            </section>

            <section className="pt-8 border-t border-slate-100">
              <h2 className="text-sm font-black text-slate-900 mb-6 text-left">{t.pref}</h2>
              <div className="space-y-3">
                <ToggleRow title={t.alertTrans} initialStatus={true} />
                <ToggleRow title={t.alertSec} initialStatus={true} />
              </div>
            </section>

            <section className="pt-8 border-t border-slate-100">
              <div className="bg-red-50/50 border border-red-100 rounded-[20px] p-6 flex justify-between items-center transition-colors hover:bg-red-50">
                <div className="text-left">
                  <p className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-1">{t.danger}</p>
                  <p className="text-[11px] text-slate-600 font-bold">{t.dangerDesc}</p>
                </div>
                <button className="bg-red-600 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase hover:bg-red-700 transition-all shadow-md shadow-red-100">{t.deactive}</button>
              </div>
            </section>
          </div>
        </motion.div>
      </motion.main>
    </motion.div>
  );
};

const InputBox = ({ label, value, type = "text", placeholder }) => (
  <div className="space-y-1.5 group text-left">
    <label className="block text-[11px] font-bold text-slate-400 group-focus-within:text-blue-600 uppercase tracking-wide transition-colors">{label}</label>
    <input type={type} defaultValue={value} placeholder={placeholder} className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all" />
  </div>
);

const ToggleRow = ({ title, initialStatus }) => {
  const [enabled, setEnabled] = useState(initialStatus);
  return (
    <div onClick={() => setEnabled(!enabled)} className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl cursor-pointer group hover:bg-white transition-all">
      <div className="text-left font-black text-[12px] text-slate-800">{title}</div>
      <div className={`w-10 h-5 rounded-full relative transition-colors duration-300 ${enabled ? "bg-blue-600" : "bg-slate-300"}`}>
        <motion.div animate={{ x: enabled ? 24 : 4 }} className="absolute top-1 w-3 h-3 bg-white rounded-full shadow-sm" />
      </div>
    </div>
  );
};

export default Settings;