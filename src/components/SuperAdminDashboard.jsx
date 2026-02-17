import React from "react";
import { FaCrown, FaSignOutAlt } from "react-icons/fa";
import {
  FiRefreshCcw,
  FiSearch,
  FiUsers,
  FiCalendar,
  FiFileText,
} from "react-icons/fi";
import SuperAdminTable from "./SuperAdminTable";

const SuperAdminDashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      <div className="flex-1 flex flex-col">
        <header className=" shadow-sm bg-blue-800">
          <div className="container mx-auto px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <FaCrown className="text-amber-500 text-3xl" />
              <h1 className="text-2xl font-black italic text-white uppercase tracking-tighter cursor-pointer">
                Super Admin <span className="text-red-700">Panel</span>
              </h1>
            </div>

            <div className="flex items-center gap-3">
              <button className="bg-emerald-600 cursor-pointer px-4 py-2 rounded-lg text-white flex items-center gap-2 font-bold transition shadow-md active:scale-95">
                <FiRefreshCcw className="animate-spin-slow" />
                Yangilash
              </button>
              <button className="bg-rose-600 cursor-pointer px-4 py-2 rounded-lg text-white flex items-center gap-2 font-bold transition shadow-md active:scale-95">
                <FaSignOutAlt />
                Chiqish
              </button>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-5 py-10">
          <div className="grid grid-cols-1 md:grid-cols-4  gap-6">
            <div className="bg-white p-6 cursor-pointer rounded-xl  shadow-sm border-l-4 border-blue-800">
              <h2 className="text-3xl font-bold text-blue-800 text-center">
                0
              </h2>
              <p className="text-gray-500 text-sm font-medium uppercase text-center">
                Jami Xodimlar
              </p>
            </div>

            <div className="bg-white p-6 cursor-pointer rounded-xl shadow-sm border-l-4 border-emerald-800">
              <h2 className="text-3xl font-bold text-emerald-800 text-center">
                0
              </h2>
              <p className="text-gray-500 text-sm font-medium uppercase text-center">
                talabalar
              </p>
            </div>

            <div className="bg-white p-6 cursor-pointer rounded-xl shadow-sm border-l-4 border-amber-800">
              <h2 className="text-3xl font-bold text-amber-900 text-center">
                0
              </h2>
              <p className="text-gray-500 text-sm font-medium uppercase text-center">
                o'qtuvchilar
              </p>
            </div>

            <div className="bg-white p-6 cursor-pointer rounded-xl shadow-sm border-l-4 border-pink-800">
              <h2 className="text-3xl font-bold text-pink-800 text-center">
                0
              </h2>
              <p className="text-gray-500 text-sm font-medium uppercase text-center">
                Xodimlar
              </p>
            </div>
          </div>

          <div>
            <SuperAdminTable/>
          </div>
        </main>
      </div>
    </div>
  );
};

export default SuperAdminDashboard;
