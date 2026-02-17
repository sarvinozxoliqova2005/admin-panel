import axios from "axios";
import React, { useEffect, useState } from "react";
import { FiCalendar, FiFileText, FiSearch, FiUsers } from "react-icons/fi";

const SuperAdminTable = () => {
  const [workers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState("barcha");

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
    <div className="pt-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex gap-2 bg-gray-200/50 p-1 rounded-xl">
          <button className="flex items-center gap-2 px-6 py-2.5 bg-blue-800 text-white cursor-pointer rounded-lg shadow-sm font-bold transition-all">
            <FiUsers /> Xodimlar
          </button>
          <button className="flex items-center gap-2 cursor-pointer px-6 py-2.5 text-white rounded-lg bg-gray-400 font-semibold transition-all">
            <FiCalendar /> Davomat
          </button>
        </div>

        <button className="flex items-center gap-2 bg-blue-800 cursor-pointer text-white px-5 py-2.5 rounded-lg font-bold transition-all shadow-lg">
          <FiFileText /> Excel
        </button>
      </div>

      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-50">
          <h1 className="text-xl font-bold text-slate-800 mb-6">
            Xodimlar ro'yxati
          </h1>
          <div className="flex flex-col md:flex-row items-center gap-4">
            <div className="relative flex-1 w-full group">
              <FiSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors" />
              <input
                type="text"
                placeholder="Ism, UID yoki telefon orqali qidirish..."
                className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-700"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <select
              className="w-full md:w-64 px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:bg-white focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all text-gray-700 cursor-pointer"
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
            >
              <option value="barcha">Barcha</option>
              <option value="teacher">O'qituvchi</option>
              <option value="staff">Xodim</option>
            </select>
          </div>
        </div>

        <div className="p-2 overflow-x-auto">
          <ul className="flex items-center justify-between gap-4 bg-gray-100 p-4 rounded-xl min-w-[900px] mb-2">
            <li className="flex-1 font-bold text-gray-600 text-xs uppercase text-center">
              UID
            </li>
            <li className="flex-[2] font-bold text-gray-600 text-xs uppercase text-left">
              Ism Familya
            </li>
            <li className="flex-1 font-bold text-gray-600 text-xs uppercase text-center">
              Telefon
            </li>
            <li className="flex-1 font-bold text-gray-600 text-xs uppercase text-center">
              Rol
            </li>
            <li className="flex-1 font-bold text-gray-600 text-xs uppercase text-center">
              Balans
            </li>
            <li className="flex-1 font-bold text-gray-600 text-xs uppercase text-center">
              Status
            </li>
            <li className="flex-1 font-bold text-gray-600 text-xs uppercase text-right">
              Ro'yxatdan o'tgan
            </li>
          </ul>

          {loading ? (
            <p className="text-center p-10 text-gray-500">Yuklanmoqda...</p>
          ) : filteredWorkers.length === 0 ? (
            <p className="text-center p-10 text-gray-500">Xodimlar topilmadi</p>
          ) : (
            filteredWorkers.map((worker) => (
              <ul
                key={worker.id}
                className="flex items-center justify-between gap-4 p-4 border-b border-gray-50 min-w-[900px] hover:bg-gray-50 transition-all"
              >
                <li className="flex-1 text-center text-sm text-gray-600">
                  {worker.uid || "—"}
                </li>
                <li className="flex-[2] text-left text-sm font-semibold text-gray-800">
                  {worker.full_name || worker.name || "Ismsiz"}
                </li>
                <li className="flex-1 text-center text-sm text-gray-600">
                  {worker.phone_number || "—"}
                </li>
                <li className="flex-1 text-center">
                  <span className="bg-blue-100 text-blue-700 px-2 py-1 rounded-md text-[10px] font-bold uppercase">
                    {worker.role || "Xodim"}
                  </span>
                </li>
                <li className="flex-1 text-center text-sm font-bold text-emerald-600">
                  {worker.balance
                    ? `${worker.balance.toLocaleString()} so'm`
                    : "0 so'm"}
                </li>
                <li className="flex-1 text-center">
                  <span
                    className={`${worker.is_active ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"} px-2 py-1 rounded-md text-[10px] font-bold`}
                  >
                    {worker.is_active ? "FAOL" : "FAOL EMAS"}
                  </span>
                </li>
                <li className="flex-1 text-right text-sm text-gray-500">
                  {worker.created_at
                    ? new Date(worker.created_at).toLocaleDateString("uz-UZ")
                    : "—"}
                </li>
              </ul>
            ))
          )}
        </div>

        <div className="p-4 border-t border-gray-100 bg-gray-50">
          <p className="text-sm text-gray-600">
            Jami: {filteredWorkers.length} / {workers.length} xodim
          </p>
        </div>
      </div>
    </div>
  );
};

export default SuperAdminTable;
