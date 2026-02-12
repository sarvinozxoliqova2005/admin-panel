import React, { useState } from "react";
import { BsCreditCardFill, BsStopwatch } from "react-icons/bs";
import { CgInsights } from "react-icons/cg";
import { IoIosCalendar } from "react-icons/io";
import { IoSearch, IoSettings } from "react-icons/io5";
import { MdDashboard, MdDirectionsBus } from "react-icons/md";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";


const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2, delayChildren: 0.3 }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1, 
    transition: { type: "spring", stiffness: 100, damping: 15 } 
  }
};

const Dashboard = () => {

  const info = JSON.parse(localStorage.getItem('user'))


  const [activeTab, setActiveTab] = useState("Dashboard");
  const [userData] = useState({
    balance: info.balans,
    percentage: 0,
    name: info.name,
    email: info.surname,
  });



  return (
    <motion.div 
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="flex min-h-screen bg-[#F8F9FD] font-sans text-slate-700"
    >
      <motion.aside 
        initial={{ x: -60, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
       
        className="w-64 bg-white border-r border-slate-200 flex flex-col p-6 hidden md:flex fixed left-0 top-0 h-screen z-10"
      >
        <div className="flex items-center gap-3 mb-10">
          <motion.div 
            whileHover={{ rotate: 15 }}
            className="w-8 h-8 bg-indigo-600 rounded-md flex items-center justify-center text-white font-bold"
          >
            N
          </motion.div>
          <div>
            <h1 className="text-sm font-bold leading-none">NFC Manager</h1>
            <p className="text-[10px] text-slate-400 mt-1">Premium Account</p>
          </div>
        </div>

        <nav className="flex-1 space-y-2 cursor-pointer">
          {["Dashboard", "Cards", "Activity", "Insights"].map((label) => (
            <NavItem
              key={label}
              label={label}
              active={activeTab === label}
              onClick={() => setActiveTab(label)}
              icon={
                label === "Dashboard" ? <MdDashboard /> : 
                label === "Cards" ? <BsCreditCardFill /> : 
                label === "Activity" ? <BsStopwatch /> : <CgInsights />
              }
            />
          ))}

          <Link to="/setting">
            <NavItem
              label="Settings"
              active={activeTab === "Settings"}
              onClick={() => setActiveTab("Settings")}
              icon={<IoSettings />}
            />
          </Link>
        </nav>

        <div className="mt-auto flex items-center gap-3 p-2 bg-slate-50 rounded-md">
          <div className="w-8 h-8 rounded-full bg-slate-300"></div>
          <div className="overflow-hidden text-left">
            <p className="text-xs font-bold truncate">{userData.name}</p>
            <p className="text-[10px] text-slate-400 truncate">{userData.email}</p>
          </div>
        </div>
      </motion.aside>

      <main className="flex-1 p-4 md:p-8 overflow-y-auto md:ml-64">
        <motion.header variants={itemVariants} className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
          <div className="flex items-center gap-4 w-full md:w-auto">
            <h2 className="text-xl font-bold">Dashboard</h2>
            <div className="relative flex-1">
              <input
                type="text"
                placeholder="Search..."
                className="bg-white rounded-md py-2 px-10 cursor-pointer text-xs w-full md:w-64 focus:ring-2 focus:ring-indigo-500 outline-none shadow-sm"
              />
              <span className="absolute left-3 top-2.5 opacity-30"><IoSearch /></span>
            </div>
          </div>
          <div className="flex items-center gap-3 ml-auto">
             <motion.button  className="p-2 text-slate-500 bg-white rounded-lg shadow-sm">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
             </motion.button>
          </div>
        </motion.header>

        <div className="flex flex-col gap-6">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            <motion.div 
              variants={itemVariants}
              className="lg:col-span-8 bg-white rounded-[15px] p-6 md:p-8 shadow-sm flex flex-col justify-center border border-transparent hover:border-indigo-100 transition-colors"
            >
              <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                <div>
                  <p className="text-slate-400 text-xs font-medium mb-1 uppercase tracking-wider">Current Balance</p>
                  <h3 className="text-4xl font-extrabold text-slate-800">UZS {userData.balance.toLocaleString()}</h3>
                  <p className="text-emerald-500 text-[11px] font-bold mt-2 flex items-center gap-1">
                    ↗ +{userData.percentage}% <span className="text-slate-400 font-normal">from last week</span>
                  </p>
                </div>
                <div className="flex gap-3 w-full md:w-auto">
                  <motion.button  className="flex-1 md:flex-none bg-indigo-600 text-white px-8 py-3.5 rounded-md text-xs font-bold shadow-lg shadow-indigo-100">Check-In</motion.button>
                  <motion.button className="flex-1 md:flex-none border border-gray-300 rounded-md text-slate-700 px-8 py-3.5 text-xs font-bold">Check-Out</motion.button>
                </div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="lg:col-span-4 flex flex-col gap-4">
              <SmallCard label="Trips Today" value="3 Total" color="indigo" icon={<MdDirectionsBus />} />
              <SmallCard label="Next Renewal" value="Nov 12, 2026" color="orange" icon={<IoIosCalendar />} />
            </motion.div>
          </div>

          <motion.div variants={itemVariants} className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatBox label="Weekly Spend" value="$42.10" />
            <StatBox label="Avg Trip Cost" value="$2.45" />
            <StatBox label="Rewards Points" value="1,240" />
            <StatBox label="Active Passes" value="2 Zones" />
          </motion.div>

          <motion.div variants={itemVariants} className="bg-white rounded-[15px] p-6 md:p-8 shadow-sm">
            <h4 className="font-bold text-slate-800 mb-6">Transaction History</h4>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[600px]">
                <thead className="text-left text-[10px] text-slate-600 uppercase tracking-widest">
                  <tr>
                    <th className="pb-4 px-2">Date & Time</th>
                    <th className="pb-4">Type</th>
                    <th className="pb-4">Amount</th>
                    <th className="pb-4">Location</th>
                  </tr>
                </thead>
                <tbody className="text-xs">
                  <TableRow date="Oct 24" time="08:42 AM" type="Subway" amount="- $2.50" location="Grand Central" negative />
                  <TableRow date="Oct 23" time="06:15 PM" type="Top Up" amount="+ $50.00" location="Mobile App" />
                </tbody>
              </table>
            </div>
          </motion.div>
        </div>
      </main>
    </motion.div>
  );
};


const NavItem = ({ icon, label, active, onClick }) => (
  <motion.div
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all ${active ? "bg-indigo-50 text-indigo-600 shadow-sm" : "text-slate-400 hover:bg-slate-50"}`}
  >
    <span className="text-lg">{icon}</span>
    <span className="text-xs font-bold">{label}</span>
  </motion.div>
);

const StatBox = ({ label, value }) => (
  <motion.div 
    whileHover={{ y: -3 }}
    className="bg-white p-5 rounded-[22px] border border-slate-100 shadow-sm"
  >
    <p className="text-[10px] text-slate-400 font-bold mb-2 uppercase tracking-wider">{label}</p>
    <p className="text-xl font-extrabold text-slate-800 tracking-tight">{value}</p>
  </motion.div>
);

const SmallCard = ({ label, value, color, icon }) => (
  <motion.div 
    className="bg-white p-5 rounded-[24px] border border-slate-100 shadow-sm flex items-center gap-4 flex-1"
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
    initial={{ opacity: 0 }} 
    whileInView={{ opacity: 1 }} 
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