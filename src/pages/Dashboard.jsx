import React, { useState } from "react";
import { BsCreditCardFill, BsStopwatch } from "react-icons/bs";
import { CgInsights } from "react-icons/cg";
import { IoIosCalendar } from "react-icons/io";
import { IoSearch, IoSettings } from "react-icons/io5";
import { MdDashboard, MdDirectionsBus } from "react-icons/md";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

// 1. Tarjimalar lug'ati
const translations = {
  uz: {
    dashboard: "Boshqaruv paneli",
    cards: "Kartalar",
    activity: "Harakatlar",
    insights: "Tahlillar",
    settings: "Sozlamalar",
    premium: "Premium Hisob",
    search: "Qidiruv...",
    currentBalance: "Joriy balans",
    fromLastWeek: "o'tgan haftadan",
    checkIn: "Kirish",
    checkOut: "Chiqish",
    tripsToday: "Bugungi safarlar",
    total: "Jami",
    nextRenewal: "Keyingi yangilanish",
    weeklySpend: "Haftalik xarajat",
    avgTrip: "O'rtacha safar",
    rewards: "Mukofot ballari",
    activePasses: "Faol zonalar",
    history: "Tranzaksiyalar tarixi",
    dateTh: "Sana va Vaqt",
    typeTh: "Turi",
    amountTh: "Miqdor",
    locationTh: "Manzil",
    guest: "Mehmon",
    subway: "Metro",
    topup: "To'ldirish",
    mobileApp: "Mobil ilova"
  },
  ru: {
    dashboard: "Панель управления",
    cards: "Карты",
    activity: "Активность",
    insights: "Аналитика",
    settings: "Настройки",
    premium: "Премиум Аккаунт",
    search: "Поиск...",
    currentBalance: "Текущий баланс",
    fromLastWeek: "с прошлой недели",
    checkIn: "Вход",
    checkOut: "Выход",
    tripsToday: "Поездки сегодня",
    total: "Всего",
    nextRenewal: "Следующее продление",
    weeklySpend: "Расходы за неделю",
    avgTrip: "Средняя поездка",
    rewards: "Бонусные баллы",
    activePasses: "Активные зоны",
    history: "История транзакций",
    dateTh: "Дата и Время",
    typeTh: "Тип",
    amountTh: "Сумма",
    locationTh: "Локация",
    guest: "Гость",
    subway: "Метро",
    topup: "Пополнение",
    mobileApp: "Мобильное прил."
  },
  en: {
    dashboard: "Dashboard",
    cards: "Cards",
    activity: "Activity",
    insights: "Insights",
    settings: "Settings",
    premium: "Premium Account",
    search: "Search...",
    currentBalance: "Current Balance",
    fromLastWeek: "from last week",
    checkIn: "Check-In",
    checkOut: "Check-Out",
    tripsToday: "Trips Today",
    total: "Total",
    nextRenewal: "Next Renewal",
    weeklySpend: "Weekly Spend",
    avgTrip: "Avg Trip Cost",
    rewards: "Rewards Points",
    activePasses: "Active Passes",
    history: "Transaction History",
    dateTh: "Date & Time",
    typeTh: "Type",
    amountTh: "Amount",
    locationTh: "Location",
    guest: "Guest",
    subway: "Subway",
    topup: "Top Up",
    mobileApp: "Mobile App"
  }
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1, delayChildren: 0.1 },
  },
};

const sidebarVariants = {
  hidden: { x: -80, opacity: 0 },
  visible: {
    x: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 100, damping: 20, staggerChildren: 0.08, delayChildren: 0.2 },
  },
};

const sideItemVariants = {
  hidden: { x: -20, opacity: 0 },
  visible: { x: 0, opacity: 1, transition: { type: "spring", stiffness: 120 } },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 100, damping: 15 } },
};

const Dashboard = () => {
  const lang = localStorage.getItem("selectedLanguage") || "uz";
  const t = translations[lang];

  const info = JSON.parse(localStorage.getItem("user")) || {
    name: t.guest,
    surname: "user@example.com",
    balans: 0,
  };

  const [activeTab, setActiveTab] = useState("Dashboard");
  const [userData] = useState({
    balance: info.balans,
    percentage: 0,
    name: info.name,
    email: info.surname,
  });

  const menuItems = [
    { label: "Dashboard", trans: t.dashboard, icon: <MdDashboard /> },
    { label: "Cards", trans: t.cards, icon: <BsCreditCardFill /> },
    { label: "Activity", trans: t.activity, icon: <BsStopwatch /> },
    { label: "Insights", trans: t.insights, icon: <CgInsights /> }
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
        className="w-64 bg-white border-r border-slate-200 flex flex-col p-6 hidden md:flex fixed left-0 top-0 h-screen z-10"
      >
        <motion.div variants={sideItemVariants} className="flex items-center gap-3 mb-10">
          <motion.div className="w-8 h-8 bg-indigo-600 rounded-md flex items-center justify-center text-white font-bold">
            N
          </motion.div>
          <div>
            <h1 className="text-sm font-bold leading-none">NFC Manager</h1>
            <p className="text-[10px] text-slate-400 mt-1">{t.premium}</p>
          </div>
        </motion.div>

        <nav className="flex-1 space-y-2 cursor-pointer">
          {menuItems.map((item) => (
            <motion.div key={item.label} variants={sideItemVariants}>
              <NavItem
                label={item.trans}
                active={activeTab === item.label}
                onClick={() => setActiveTab(item.label)}
                icon={item.icon}
              />
            </motion.div>
          ))}

          <motion.div variants={sideItemVariants}>
            <Link to="/setting">
              <NavItem
                label={t.settings}
                active={activeTab === "Settings"}
                onClick={() => setActiveTab("Settings")}
                icon={<IoSettings />}
              />
            </Link>
          </motion.div>
        </nav>

        <motion.div
          variants={sideItemVariants}
          whileHover={{ backgroundColor: "#f8fafc" }}
          className="mt-auto flex items-center gap-3 p-2 bg-slate-50 rounded-md cursor-pointer transition-colors"
        >
          <div className="w-8 h-8 rounded-full bg-slate-300"></div>
          <div className="overflow-hidden text-left">
            <p className="text-xs font-bold truncate">{userData.name}</p>
            <p className="text-[10px] text-slate-400 truncate">{userData.email}</p>
          </div>
        </motion.div>
      </motion.aside>

      <main className="flex-1 p-4 md:p-8 overflow-y-auto md:ml-64">
        <motion.header
          variants={itemVariants}
          className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4"
        >
          <div className="flex items-center gap-4 w-full md:w-auto">
            <h2 className="text-xl font-bold">{t.dashboard}</h2>
            <div className="relative flex-1">
              <input
                type="text"
                placeholder={t.search}
                className="bg-white rounded-md py-2 px-10 cursor-pointer text-xs w-full md:w-64 focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm"
              />
              <span className="absolute left-3 top-2.5 opacity-30 ">
                <IoSearch />
              </span>
            </div>
          </div>
        </motion.header>

        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <motion.div className="lg:col-span-8 bg-white rounded-[15px] p-6 md:p-8 shadow-sm flex flex-col justify-center border border-transparent hover:border-indigo-100 transition-all">
              <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                <div>
                  <p className="text-slate-400 text-xs font-medium mb-1 uppercase tracking-wider">{t.currentBalance}</p>
                  <h3 className="text-4xl font-extrabold text-slate-800">
  UZS {userData?.balance?.toLocaleString() || "0"}
</h3>
                  <p className="text-emerald-500 text-[11px] font-bold mt-2 flex items-center gap-1">
                    ↗ +{userData.percentage}%{" "}
                    <span className="text-slate-400 font-normal">{t.fromLastWeek}</span>
                  </p>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                  <motion.button className="flex-1 md:flex-none bg-indigo-600 text-white px-8 cursor-pointer py-3.5 rounded-md text-xs font-bold shadow-lg shadow-indigo-100">
                    {t.checkIn}
                  </motion.button>
                  <motion.button className="flex-1 md:flex-none border border-gray-300 cursor-pointer rounded-md text-slate-700 px-8 py-3.5 text-xs font-bold">
                    {t.checkOut}
                  </motion.button>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="lg:col-span-4 flex flex-col gap-4">
              <SmallCard label={t.tripsToday} value={`3 ${t.total}`} color="indigo" icon={<MdDirectionsBus />} />
              <SmallCard label={t.nextRenewal} value="Nov 12, 2026" color="orange" icon={<IoIosCalendar />} />
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatBox label={t.weeklySpend} value="42,100 UZS" />
            <StatBox label={t.avgTrip} value="2,450 UZS" />
            <StatBox label={t.rewards} value="1,240" />
            <StatBox label={t.activePasses} value="2 Zones" />
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white rounded-[15px] p-6 md:p-8 shadow-sm">
            <h4 className="font-bold text-slate-800 mb-6">{t.history}</h4>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead className="text-left text-[10px] text-slate-600 uppercase tracking-widest">
                  <tr>
                    <th className="pb-4 px-2">{t.dateTh}</th>
                    <th className="pb-4">{t.typeTh}</th>
                    <th className="pb-4">{t.amountTh}</th>
                    <th className="pb-4">{t.locationTh}</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  <TableRow date="Oct 24" time="08:42 AM" type={t.subway} amount="- 2,500 UZS" location="Grand Central" negative />
                  <TableRow date="Oct 23" time="06:15 PM" type={t.topup} amount="+ 50,000 UZS" location={t.mobileApp} />
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </main>
    </motion.div>
  );
};

// --- YORDAMCHI KOMPONENTLAR ---

const NavItem = ({ icon, label, active, onClick }) => (
  <motion.div
    onClick={onClick}
    whileTap={{ scale: 0.98 }}
    className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${active ? "bg-indigo-50 text-indigo-600 shadow-sm" : "text-slate-400 hover:bg-slate-50"}`}
  >
    <span className="text-lg">{icon}</span>
    <span className="text-xs font-bold">{label}</span>
  </motion.div>
);

const StatBox = ({ label, value }) => (
  <motion.div
    whileHover={{ y: -5, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.05)" }}
    className="bg-white p-5 rounded-[22px] border border-slate-100 shadow-sm transition-all cursor-default"
  >
    <p className="text-[10px] text-slate-400 font-bold mb-2 uppercase tracking-wider">{label}</p>
    <p className="text-xl font-extrabold text-slate-800 tracking-tight">{value}</p>
  </motion.div>
);

const SmallCard = ({ label, value, color, icon }) => (
  <motion.div
    whileHover={{ x: 5 }}
    className="bg-white p-5 rounded-[24px] border border-slate-100 shadow-sm flex items-center gap-4 flex-1 cursor-default transition-all"
  >
    <div className={`w-12 h-12 flex items-center justify-center rounded-xl text-xl ${color === "indigo" ? "bg-indigo-50 text-indigo-600" : "bg-orange-50 text-orange-500"}`}>
      {icon}
    </div>
    <div>
      <p className="text-[10px] text-slate-400 font-bold uppercase">{label}</p>
      <p className="text-lg font-extrabold text-slate-800">{value}</p>
    </div>
  </motion.div>
);

const TableRow = ({ date, time, type, amount, location, negative }) => (
  <motion.tr
    initial={{ opacity: 0, x: -10 }}
    whileInView={{ opacity: 1, x: 0 }}
    viewport={{ once: true }}
    className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors"
  >
    <td className="py-4 px-2">
      <p className="font-bold text-slate-800">{date}</p>
      <p className="text-[10px] text-slate-400">{time}</p>
    </td>
    <td className="py-4 font-bold text-slate-700">{type}</td>
    <td className={`py-4 font-bold ${negative ? "text-rose-500" : "text-emerald-500"}`}>{amount}</td>
    <td className="py-4 text-slate-500">{location}</td>
  </motion.tr>
);

export default Dashboard;