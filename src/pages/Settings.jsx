import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { MdDashboard, MdSettings } from "react-icons/md";
import { BsCreditCardFill, BsStopwatch } from "react-icons/bs";
import { CgInsights } from "react-icons/cg";
import { motion } from "framer-motion";


const translations = {
 uz: {
    manager: "NFC MENEJER",
    adminportal: "Admin Portali",
    setting: "Sozlamalar",
    subtitle: "Hisobingizni, xavfsizlikni va bildirishnoma sozlamalarini boshqaring.",
    cancel: "Bekor qilish",
    changes: "O'zgarishlarni saqlash",
    profile: "Profil ma'lumotlari",
    update: "Suratingiz va shaxsiy ma'lumotlaringizni yangilang.",
    profile_picture: "Profil surati",
    jpg: "JPG, GIF yoki PNG. Maksimal hajm 2MB.",
    upload: "Yangisini yuklash",
    remove: "O'chirish",
    security: "Xavfsizlik",
    password: "*****",
    new_password: "Kamida 8 ta belgi",
    confirm: "****",
    update_password: "Parolni yangilash",
    perfermance: "Afzalliklar",
    danger: "Xavfli hudud",
    your_account: "Hisobingizni va barcha bog'liq ma'lumotlarni butunlay o'chirib tashlang.",
    deactivate: "Hisobni faolsizlantirish",
    alerts: "Tranzaksiya bildirishnomalari",
    desc: "Karta ishlatilganda yoki skanerlanganda xabar olish.",
    emails: "Marketing xatlari",
    desc2: "Yangiliklar, yangilanishlar va maxsus takliflarni qabul qilish.",
    aler: "Xavfsizlik bildirishnomalari",
    desc3: "Hisobga kirish haqidagi muhim ogohlantirishlar.",
    current_password: "Joriy parol",
    neww_pasword: "Yangi parol",
    news_passwords: "Yangi parolni tasdiqlash",
    type: "Parol",
    plase: "Kamida 8 ta belgi",
    firstname: "Ism",
    value: "Aleks",
    lastname: "Familiya",
    value2: "Morgan",
    address: "Email manzili",
    value3: "alex.m@nfcmanager.com",
    number: "Telefon raqami",
    value4: "+1 (555) 012-3456",
    label: "Boshqaruv paneli",
    label2: "Kartalar",
    label3: "Faollik",
    label4: "Tahlillar",
    label5: "Sozlamalar"
  },

 ru: {
    manager: "МЕНЕДЖЕР NFC",
    adminportal: "Админ-портал",
    setting: "Настройки",
    subtitle: "Управляйте своей учетной записью, безопасностью и уведомлениями.",
    cancel: "Отмена",
    changes: "Сохранить изменения",
    profile: "Информация профиля",
    update: "Обновите свое фото и личные данные.",
    profile_picture: "Фото профиля",
    jpg: "JPG, GIF или PNG. Макс. размер 2МБ.",
    upload: "Загрузить новое",
    remove: "Удалить",
    security: "Безопасность",
    password: "*****",
    new_password: "Мин. 8 символов",
    confirm: "****",
    update_password: "Обновить пароль",
    perfermance: "Предпочтения",
    danger: "Опасная зона",
    your_account: "Безвозвратно удалить вашу учетную запись и все связанные данные.",
    deactivate: "Деактивировать аккаунт",
    alerts: "Оповещения о транзакциях",
    desc: "Получайте уведомления при каждом использовании или сканировании карты.",
    emails: "Маркетинговые письма",
    desc2: "Получайте новости, обновления и рекламные предложения.",
    aler: "Оповещения безопасности",
    desc3: "Критические уведомления о доступе к аккаунту.",
    current_password: "Текущий пароль",
    neww_pasword: "Новый пароль",
    news_passwords: "Подтвердите новый пароль",
    type: "Пароль",
    plase: "Мин. 8 символов",
    firstname: "Имя",
    value: "Алекс",
    lastname: "Фамилия",
    value2: "Морган",
    address: "Email адрес",
    value3: "alex.m@nfcmanager.com",
    number: "Номер телефона",
    value4: "+1 (555) 012-3456",
    label: "Панель управления",
    label2: "Карты",
    label3: "Активность",
    label4: "Аналитика",
    label5: "Настройки"
  },

  en: {
    manager: "NFC MANAGER",
    adminportal: "Admin Portal",
    setting: "Settings",
    subtitle: " Manage your account, security, and notification preferences.",
    cancel: "Cansel",
    changes: " Save Changes",
    profile: " Profile Information",
    update: " Update your photo and personal details.",
    profile_picture: "  Profile Picture",
    jpg: "  JPG, GIF or PNG. Max size 2MB.",
    upload: " Upload New",
    remove: " Remove",
    security: "Security",
    password: "*****",
    new_password: "Min. 8 characters",
    confirm: "****",
    update_password: " Update Password",
    perfermance: "Preferences",
    danger: " Danger Zone",
    your_account: " Permanently delete your account and all associated data.",
    deactivate: "  Deactivate Account",
    alerts: "Transaction Alerts",
    desc: "Get notified whenever a card is used or scanned.",
    emails: "Marketing Emails",
    desc2: "Receive news, updates, and promotional offers.",
    aler: "Security Alerts",
    desc3: "ritical notifications about account access.",
    current_password: "Current Password",
    neww_pasword: "New Password",
    news_passwords: "Confirm New Password",
    type: "Password",
    plase: "Min. 8 characters",
    firstname: "First Name",
    value: "Alex",
    lastname: "Last Name",
    value2 : "Morgan",
    address: "Email Adress",
    value3: "alex.m@nfcmanager.com",
    number: "Phone Number",
    value4: "+1 (555) 012-3456",
    label: "Dashboard",
    label2: "Cards",
    label3: "Activity",
    label4: "Insights",
    label5: "Settings"
  }
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.1 }
  }
};

const sidebarVariants = {
  hidden: { x: -80, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 20,
      staggerChildren: 0.08,
      delayChildren: 0.2
    }
  }
};

const sideItemVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: { 
    x: 0, 
    opacity: 1,
    transition: { type: "spring", stiffness: 120 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 15 },
  },
};



const Settings = () => {
  const navigate = useNavigate();
  const location = useLocation();
   const lang = localStorage.getItem("selectedLanguage") || "uz";
  const t = translations[lang];

  const menuItems = [
    { label: t.label, path: "/dashboard", icon: <MdDashboard size={18} /> },
    { label: t.label2, icon: <BsCreditCardFill size={18} /> },
    { label: t.label3, icon: <BsStopwatch size={18} /> },
    { label: t.label4, icon: <CgInsights size={18} /> },
    { label: t.label5, path: "/setting", icon: <MdSettings size={18} /> },
  ];

  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex min-h-screen bg-[#F8F9FD] font-sans text-slate-700"
    >
      <motion.aside 
        variants={sidebarVariants}
        className="w-64 bg-white border-r border-slate-200 flex flex-col p-6 hidden lg:flex fixed left-0 top-0 h-screen z-10"
      >
        <motion.div variants={sideItemVariants} className="flex items-center gap-2 mb-10">
          <motion.div
            className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center text-white font-bold text-sm"
          >
            N
          </motion.div>
          <div>
            <h1 className="text-xs font-black text-slate-800 uppercase tracking-tight">
             {t.manager}
            </h1>
            <p className="text-[9px] text-slate-400 font-bold -mt-1 uppercase">
             {t.adminportal}
            </p>
          </div>
        </motion.div>

        <nav className="flex-1 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <motion.div
                key={item.label}
                variants={sideItemVariants}
                onClick={() => navigate(item.path)}
                whileTap={{ scale: 0.97 }}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl cursor-pointer transition-all duration-200
                ${isActive ? "bg-blue-50 text-blue-700 shadow-sm" : "text-slate-500 hover:bg-slate-50"}`}
              >
                <span className={isActive ? "text-blue-700" : "text-slate-400"}>
                  {item.icon}
                </span>
                <span className="text-xs font-bold">{item.label}</span>
              </motion.div>
            );
          })}
        </nav>

        <motion.div 
          variants={sideItemVariants}
          whileHover={{ backgroundColor: "#f8fafc" }}
          className="mt-auto flex items-center gap-3 pt-4 border-t border-slate-100 cursor-pointer"
        >
          <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold text-[10px]">
            AM
          </div>
          <div className="overflow-hidden">
            <p className="text-[11px] font-black text-slate-800 leading-none">
              Alex Morgan
            </p>
            <p className="text-[9px] text-slate-400 truncate">
              alex.m@nfcmanager.com
            </p>
          </div>
        </motion.div>
      </motion.aside>

      <motion.main 
        variants={containerVariants}
        className="flex-1 p-3 md:p-10 overflow-y-auto md:ml-64"
      >
        <motion.div variants={itemVariants} className="border-b border-slate-100 flex justify-between items-center pb-6">
          <div>
            <h1 className="text-2xl font-black text-slate-900">{t.setting}</h1>
            <p className="text-xs text-slate-500 font-medium">
              {t.subtitle}
            </p>
          </div>
          <div className="flex gap-3">
            <motion.button 
              className="px-5 py-2 text-xs font-bold cursor-pointer text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all"
            >
             {t.cancel}
            </motion.button>
            <motion.button 
              className="px-5 py-2 text-xs font-bold text-white cursor-pointer bg-blue-700 rounded-xl shadow-lg shadow-blue-100 hover:bg-blue-800 transition-all"
            >
              {t.changes}
            </motion.button>
          </div>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="mx-auto bg-white rounded-[15px] shadow-sm overflow-hidden mt-8 border border-slate-100"
        >
          <div className="p-8 space-y-12">
            <section>
              <h2 className="text-sm font-black text-slate-900 mb-1">
               {t.profile}
              </h2>
              <p className="text-[11px] text-slate-400 font-bold mb-6">
                {t.update}
              </p>

              <div className="flex items-center gap-6 mb-8">
                <motion.div 
                  className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-200 border-2 border-orange-100 relative cursor-pointer"
                >
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </motion.div>
                <div>
                  <p className="text-[11px] font-black text-slate-800 mb-1">
                    {t.profile_picture}
                  </p>
                  <p className="text-[10px] text-slate-400 font-medium mb-2">
                    {t.jpg}
                  </p>
                  <div className="flex gap-4">
                    <button className="text-blue-700 text-[10px] font-black uppercase tracking-wider hover:underline transition-all">
                     {t.upload}
                    </button>
                    <button className="text-red-500 text-[10px] font-black uppercase tracking-wider hover:underline transition-all">
                     {t.remove}
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputBox label={t.firstname} value={t.value} />
                <InputBox label={t.lastname} value={t.value2} />
                <InputBox label={t.address} value={t.value3} />
                <InputBox label={t.number} value={t.value4} />
              </div>
            </section>

            <section className="pt-8 border-t border-slate-100">
              <h2 className="text-sm font-black text-slate-900 mb-6">{t.security}</h2>
              <div className="max-w-md space-y-4">
                <InputBox label={t.current_password} type={t.type} value="********" />
                <InputBox label={t.neww_password} placeholder={t.plase} />
                <InputBox label={t.news_passwords} type={t.type} value="********" />
                <motion.button 
                  className="text-blue-700 text-[11px] font-black mt-2 inline-flex items-center gap-1"
                >
                  {t.update_password} <span>→</span>
                </motion.button>
              </div>
            </section>

            <section className="pt-8 border-t border-slate-100">
              <h2 className="text-sm font-black text-slate-900 mb-6">{t.perfermance}</h2>
              <div className="space-y-3">
                <ToggleRow title={t.alerts} desc={t.desc} initialStatus={true} />
                <ToggleRow title={t.emails} desc={t.desc2} initialStatus={false} />
                <ToggleRow title={t.aler} desc={t.desc3} initialStatus={true} />
              </div>
            </section>

            <motion.section 
              variants={itemVariants}
              className="pt-8 border-t border-slate-100"
            >
              <motion.div 
                className="bg-red-50/50 border border-red-100 rounded-[20px] p-6 flex justify-between items-center transition-colors hover:bg-red-50"
              >
                <div className="cursor-pointer">
                  <p className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-1">
                    {t.danger}
                  </p>
                  <p className="text-[11px] text-slate-600 font-bold">
                    {t.your_account}
                  </p>
                </div>
                <motion.button 
                  className="bg-red-600 text-white  cursor-pointer px-5 py-2.5 rounded-xl text-[10px] font-black uppercase hover:bg-red-700 transition-all shadow-md shadow-red-100"
                >
                 {t.deactivate}
                </motion.button>
              </motion.div>
            </motion.section>
          </div>
        </motion.div>
      </motion.main>
    </motion.div>
  );
};


const InputBox = ({ label, value, type = "text", placeholder }) => (
  <motion.div 
    whileFocus={{ scale: 1.01 }} 
    className="space-y-1.5 group"
  >
    <label className="block text-[11px] font-bold text-slate-400 group-focus-within:text-blue-600 uppercase tracking-wide transition-colors">
      {label}
    </label>
    <input
      type={type}
      defaultValue={value}
      placeholder={placeholder}
      className="w-full px-4 py-2.5 bg-slate-50/50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 outline-none focus:bg-white focus:ring-4 focus:ring-blue-500/5 focus:border-blue-500 transition-all"
    />
  </motion.div>
);

const ToggleRow = ({ title, desc, initialStatus }) => {
  const [enabled, setEnabled] = useState(initialStatus);

  return (
    <motion.div 
      onClick={() => setEnabled(!enabled)}
      whileHover={{ x: 5, backgroundColor: "white" }}
      className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-transparent hover:border-slate-100 hover:shadow-sm transition-all cursor-pointer group"
    >
      <div>
        <p className="text-[12px] font-black text-slate-800">{title}</p>
        <p className="text-[10px] text-slate-400 font-bold">{desc}</p>
      </div>
      <div
        className={`w-10 h-5 rounded-full relative transition-colors duration-300 ${enabled ? "bg-blue-600" : "bg-slate-300"}`}
      >
        <motion.div
          animate={{ x: enabled ? 24 : 4 }}
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
          className="absolute top-1 w-3 h-3 bg-white rounded-full shadow-sm"
        />
      </div>
    </motion.div>
  );
};

export default Settings;