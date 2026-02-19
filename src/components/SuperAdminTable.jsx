import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiCalendar, FiFileText, FiSearch, FiUsers } from "react-icons/fi";

const translations = {
  uz: {
    xodimlar: "Xodimlar",
    davomat: "Davomat",
    excel: "Excelga yuklash",
    xodimlar_royhati: "Xodimlar ro'yhati",
    uid: "UID",
    familya: "Ism Familya",
    telefon: "Telefon",
    rol: "Rol",
    balans: "Balans",
    status: "Status",
    royhatdan_otgan: "Ro'yhatdan o'tgan",
    jami: "Jami",
    xodim: "Xodim",
    barcha: "Barcha",
    oqtuvchi: "O'qituvchi",
    xodim_role: "Xodim",
    search_placeholder: "Ism, UID yoki telefon orqali qidirish...",
    yuklanmoqda: "Yuklanmoqda...",
    xodimlar_topilmadi: "Xodimlar topilmadi...😕",
  },

  ru: {
    xodimlar: "Сотрудники",
    davomat: "Посещаемость",
    excel: "Экспорт",
    xodimlar_royhati: "Список сотрудников",
    uid: "UID",
    familya: "Имя Фамилия",
    telefon: "Телефон",
    rol: "Роль",
    balans: "Баланс",
    status: "Статус",
    royhatdan_otgan: "Дата регистрации",
    jami: "Всего",
    xodim: "Сотрудник",
    barcha: "Все",
    oqtuvchi: "Преподаватель",
    xodim_role: "Сотрудник",
    search_placeholder: "Поиск по имени, UID или телефону...",
    yuklanmoqda: "Загрузка...",
    xodimlar_topilmadi: "Сотрудники не найдены...😕",
  },

  en: {
    xodimlar: "Employees",
    davomat: "Attendance",
    excel: "Excel",
    xodimlar_royhati: "Employee List",
    uid: "UID",
    familya: "Full Name",
    telefon: "Phone Number",
    rol: "Role",
    balans: "Balance",
    status: "Status",
    royhatdan_otgan: "Registration Date",
    jami: "Total",
    xodim: "Employee",
    barcha: "All",
    oqtuvchi: "Teacher",
    xodim_role: "Staff",
    search_placeholder: "Search by name, UID or phone...",
    yuklanmoqda: "Loading...",
    xodimlar_topilmadi: "No employees found...😕",
  },
};

const SuperAdminTable = () => {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("barcha");
  const lang = localStorage.getItem("selectedLanguage") || "uz";
  const t = translations[lang];

  const getWorkers = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`http://192.168.0.193:8000/api/workers`);
      console.log(res.data);
      if (res.data?.workers && Array.isArray(res.data.workers)) {
        setWorkers(res.data.workers);
      } else if (Array.isArray(res.data)) {
        setWorkers(res.data);
      } else if (res.data?.data && Array.isArray(res.data.data)) {
        setWorkers(res.data.data);
      } else {
        console.warn("Unexpected response structure:", res.data);
        setWorkers([]);
      }
    } catch (error) {
      console.error("Xatolik:", error);
      setWorkers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getWorkers();
  }, []);

  const filteredWorkers = workers.filter((worker) => {
    const matchesSearch =
      searchTerm === "" ||
      worker.full_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      worker.uid?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      worker.phone?.includes(searchTerm);
    const matchesRole =
      roleFilter === "barcha" ||
      worker.role?.toLowerCase() === roleFilter.toLowerCase();

    return matchesSearch && matchesRole;
  });

  return (
    <div className="pt-4 md:pt-8 px-2 md:px-4">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-6">
        <div className="flex w-full sm:w-auto gap-1 md:gap-2 bg-gray-200/50 p-1 rounded-xl">
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-3 md:px-6 py-2 md:py-2.5 bg-blue-800 text-white cursor-pointer rounded-lg shadow-sm text-xs md:text-sm font-bold transition-all whitespace-nowrap">
            <FiUsers /> {t.xodimlar}
          </button>
          <button className="flex-1 sm:flex-none flex items-center justify-center gap-2 cursor-pointer px-3 md:px-6 py-2 md:py-2.5 text-white rounded-lg bg-gray-400 text-xs md:text-sm font-semibold transition-all whitespace-nowrap">
            <FiCalendar /> {t.davomat}
          </button>
        </div>

        <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-blue-800 cursor-pointer text-white px-5 py-2.5 rounded-lg text-sm font-bold transition-all shadow-lg active:scale-95">
          <FiFileText /> {t.excel}
        </button>
      </div>

      <div className="bg-white rounded-[20px] md:rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-4 md:p-6 border-b border-gray-50">
          <h1 className="text-lg md:text-xl font-bold text-slate-800 mb-4 md:mb-6">
            {t.xodimlar_royhati}
          </h1>
          <div className="flex flex-col lg:flex-row items-center gap-3 md:gap-4">
            <div className="relative flex-1 w-full group">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              <input
                type="text"
                placeholder={t.search_placeholder}
                className="w-full pl-11 md:pl-12 pr-4 py-2.5 md:py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm md:text-base text-gray-700"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="w-full lg:w-64 px-4 py-2.5 md:py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-sm md:text-base text-gray-700 cursor-pointer"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="barcha">{t.barcha}</option>
              <option value="teacher">{t.oqtuvchi}</option>
              <option value="staff">{t.xodim_role}</option>
            </select>
          </div>
        </div>

        <div className="p-2 overflow-x-auto scrollbar-hide">
          <ul className="flex items-center justify-between gap-4 bg-gray-100 p-4 rounded-xl min-w-[900px] mb-2">
            <li className="flex-1 font-bold text-gray-600 text-[10px] md:text-xs uppercase text-center">
              {t.uid}
            </li>
            <li className="flex-[2] font-bold text-gray-600 text-[10px] md:text-xs uppercase text-left">
              {t.familya}
            </li>
            <li className="flex-1 font-bold text-gray-600 text-[10px] md:text-xs uppercase text-center">
              {t.telefon}
            </li>
            <li className="flex-1 font-bold text-gray-600 text-[10px] md:text-xs uppercase text-center">
              {t.rol}
            </li>
            <li className="flex-1 font-bold text-gray-600 text-[10px] md:text-xs uppercase text-center">
              {t.balans}
            </li>
            <li className="flex-1 font-bold text-gray-600 text-[10px] md:text-xs uppercase text-center">
              {t.status}
            </li>
            <li className="flex-1 font-bold text-gray-600 text-[10px] md:text-xs uppercase text-right">
              {t.royhatdan_otgan}
            </li>
          </ul>

          <div className="min-w-[900px]">
            {loading ? (
              <div className="flex justify-center p-10">
                <div className="animate-pulse text-gray-400 font-medium">
                  {t.yuklanmoqda}
                </div>
              </div>
            ) : filteredWorkers.length === 0 ? (
              <p className="text-center p-10 text-gray-500">
                {t.xodimlar_topilmadi}
              </p>
            ) : (
              filteredWorkers.map((worker) => (
                <ul
                  key={worker.id}
                  className="flex items-center justify-between gap-4 p-4 border-b border-gray-50 hover:bg-gray-50/80 transition-all cursor-default"
                >
                  <li className="flex-1 text-center text-xs md:text-sm text-gray-500 font-mono">
                    {worker.uid || "—"}
                  </li>
                  <li className="flex-[2] text-left text-xs md:text-sm font-semibold text-gray-800 truncate">
                    {worker.full_name || worker.name || "Ismsiz"}
                  </li>
                  <li className="flex-1 text-center text-xs md:text-sm text-gray-600">
                    {worker.phone_number || "—"}
                  </li>
                  <li className="flex-1 text-center">
                    <span className="inline-block bg-blue-50 text-blue-700 px-2 py-0.5 rounded md:rounded-md text-[9px] md:text-[10px] font-bold uppercase border border-blue-100">
                      {worker.role || "Xodim"}
                    </span>
                  </li>
                  <li className="flex-1 text-center text-xs md:text-sm font-bold text-emerald-600">
                    {worker.balance
                      ? `${worker.balance.toLocaleString()} so'm`
                      : "0 so'm"}
                  </li>
                  <li className="flex-1 text-center">
                    <span
                      className={`${worker.is_active ? "bg-green-50 text-green-600 border-green-100" : "bg-red-50 text-red-600 border-red-100"} px-2 py-0.5 border rounded md:rounded-md text-[9px] md:text-[10px] font-bold`}
                    >
                      {worker.is_active ? "FAOL" : "FAOL EMAS"}
                    </span>
                  </li>
                  <li className="flex-1 text-right text-[10px] md:text-xs text-gray-400 font-medium italic">
                    {worker.created_at
                      ? new Date(worker.created_at).toLocaleDateString("uz-UZ")
                      : "—"}
                  </li>
                </ul>
              ))
            )}
          </div>
        </div>

        <div className="p-4 border-t border-gray-100 bg-gray-50/50">
          <p className="text-xs md:text-sm text-gray-500 font-medium">
            {t.jami}:{" "}
            <span className="font-bold text-slate-800">
              {filteredWorkers.length}
            </span>{" "}
            / {workers.length} {t.xodim}
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminTable;
