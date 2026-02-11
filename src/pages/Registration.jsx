import React, { useState, useEffect } from "react";
import {
  Cpu,
  Phone,
  CreditCard,
  Eye,
  EyeOff,
  ArrowLeft,
  RefreshCw,
  CheckCircle,
  UserPlus,
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TbLockPassword } from "react-icons/tb";

const NFCRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    phone: "",
    uid: "",
    balance: "0",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isScanning, setIsScanning] = useState(true);

  useEffect(() => {
    const checkRemoteScan = async () => {
      try {
        const response = await axios.get(
          "http://192.168.0.193:8000/api/get_temp_scan",
        );

        if (response.data?.uid && response.data.uid !== formData.uid) {
          setFormData((prev) => ({ ...prev, uid: response.data.uid }));
          setIsScanning(false);
          toast.success(`Karta aniqlandi: ${response.data.uid}`, {
            icon: "💳",
          });
        }
      } catch (error) {
        console.error("Skanerlashda xato:", error);
      }
    };

    const interval = setInterval(checkRemoteScan, 1000);

    return () => clearInterval(interval);
  }, [formData.uid]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.uid) {
      toast.warning("Iltimos, avval kartani telefonda skanerlang!");
      return;
    }

    setIsLoading(true);

    try {
      const params = new URLSearchParams();
      params.append("name", formData.name.trim());
      params.append("surname", formData.surname.trim());
      params.append("phone", formData.phone.replace(/\D/g, ""));
      params.append("uid", formData.uid);
      params.append("password", formData.password);
      params.append("balance", formData.balance);

      const response = await axios.post(
        "http://192.168.0.193:8000/api/register",
        params,
        { headers: { "Content-Type": "application/x-www-form-urlencoded" } },
      );

      if (response.status === 200 || response.status === 201) {
        toast.success("Xodim muvaffaqiyatli ro'yxatdan o'tdi!");
        setTimeout(() => navigate("/dashboard"), 1500);
      }
    } catch (error) {
      const errorMsg = error.response?.data?.detail || "Xatolik yuz berdi!";
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-4 font-sans antialiased">
      <ToastContainer position="top-right" />

      <div className="max-w-4xl w-full bg-white rounded-[1rem] shadow-2xl flex flex-col md:flex-row overflow-hidden border border-white">
        <div className="md:w-2/5 bg-gradient-to-br from-indigo-600 to-blue-800 p-10 text-white flex flex-col justify-between">
          <div>
            <div className="flex items-center gap-2 mb-12 w-fit px-4 py-2  ">
              <Cpu size={20} className="text-blue-200" />
              <span className="font-bold text-sm = uppercase">
               NFC Manager
              </span>
            </div>
            <h1 className="text-4xl font-black leading-tight mb-4">
             Secure Card Issuance Portal
            </h1>
            <p className="text-blue-100/60 text-xs leading-relaxed uppercase tracking-tighter">
               Scan the card on your phone, and the details will appear automatically.           
            </p>
          </div>

          <div
            className={`p-6 rounded-3xl border-2 transition-all duration-500 ${formData.uid ? "bg-green-500/20 border-green-400" : "bg-white/5 border-white/10"}`}
          >
            <div className="flex items-center gap-4">
              <div
                className={`p-3 rounded-2xl ${formData.uid ? "bg-green-500" : "bg-blue-400 animate-pulse"}`}
              >
                {formData.uid ? (
                  <CheckCircle size={22} />
                ) : (
                  <RefreshCw size={22} className="animate-spin" />
                )}
              </div>
              <div className="overflow-hidden">
                <p className="text-[10px] font-black uppercase opacity-60">
                  Ready to Scan
                </p>
                <p className="text-sm font-bold truncate">
                  {formData.uid
                    ? `UID: ${formData.uid}`
                    : "Awaiting card scan..."}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* O'ng qism: Forma */}
        <div className="md:w-3/5 p-10 bg-white">
          <h1 className="font-bold text-[24px]">Register New Tag</h1>
          <p className="text-gray-400 ">
            Fill in the details below to initialize new user card
          </p>

          <form className="space-y-4 mt-4" onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] font-black text-slate-400 uppercase">
                  Name
                </label>
                <input
                  required
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full p-3.5  focus:border-indigo-500 border-[1px] cursor-pointer border-gray-400 focus:bg-white rounded-md outline-none text-sm  transition-all"
                  placeholder="Name"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-black text-slate-400 uppercase">
                  Surname
                </label>
                <input
                  required
                  name="surname"
                  value={formData.surname}
                  onChange={handleInputChange}
                  className="w-full p-3.5 border-[1px] border-gray-400 cursor-pointer focus:border-indigo-500 focus:bg-white rounded-md outline-none text-sm  transition-all"
                  placeholder="Surname"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-black text-slate-400 uppercase">
                Phone number
              </label>
              <div className="relative">
                <Phone
                  size={16}
                  className="absolute left-4 top-4 text-slate-300"
                />
                <input
                  required
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full p-3.5 pl-12 border-[1px] border-gray-400 cursor-pointer focus:border-indigo-500 focus:bg-white rounded-md outline-none text-sm  transition-all"
                  placeholder="998901234567"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-[11px] font-black text-indigo-600 uppercase tracking-widest">
                Card id (uid)
              </label>
              <div
                className={`flex items-center p-4 rounded-md border-2 transition-all cursor-pointer ${formData.uid ? "bg-green-50 border-green-200 shadow-sm shadow-green-100" : " border-dashed border-slate-200"}`}
              >
                <CreditCard
                  size={18}
                  className={formData.uid ? "text-green-600" : "text-slate-300"}
                />
                <span
                  className={`ml-4 font-mono font-black text-sm ${formData.uid ? "text-green-700" : "text-slate-400"}`}
                >
                  {formData.uid || "Scan or enter Hex ID"}
                </span>
                {formData.uid && (
                  <CheckCircle size={18} className="ml-auto text-green-500" />
                )}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-[11px] font-black text-slate-400 uppercase">
                  Intial Balance
                </label>
                <input
                  name="balance"
                  type="number"
                  value={formData.balance}
                  onChange={handleInputChange}
                  className="w-full p-3.5  border-[1px] border-gray-400 cursor-pointer focus:border-indigo-500 focus:bg-white rounded-md outline-none text-sm transition-all"
                />
              </div>
              <div className="space-y-1">
                <label className="text-[11px] font-black text-slate-400 uppercase ">
                  Password
                </label>
                <div className="relative">
                  <TbLockPassword className="absolute left-3 top-4.5" />
                  <input
                    required
                    name="password"
                    type={showPassword ? "text" : "password"}
                    value={formData.password}
                    onChange={handleInputChange}
                    className=" w-full p-3.5  pl-8 border-[1px] cursor-pointer border-gray-400 focus:border-indigo-500 focus:bg-white rounded-md outline-none text-sm  transition-all"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-4"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading || !formData.uid}
              className={`w-full py-4 rounded-md font-black text-xs uppercase tracking-[0.2em] shadow-xl transition-all active:scale-[0.98] mt-4 flex items-center justify-center gap-2 ${
                formData.uid
                  ? "bg-blue-700 hover:bg-blue-800 text-white cursor-pointer"
                  : "bg-blue-800 text-white cursor-pointer "
              }`}
            >
              {isLoading ? (
                "SAQLANMOQDA..."
              ) : (
                <>
                  <UserPlus size={18} />
                  <span>Register NFC Card</span>
                </>
              )}
            </button>
          </form>

          <div className="mt-6 flex justify-center gap-8 text-[10px] font-black uppercase text-slate-400">
            <button
              onClick={() => navigate("/dashboard")}
              className="text-indigo-600 flex items-center gap-1 transition-colors cursor-pointer"
            >
              <ArrowLeft size={12} /> Back to Dashboard
            </button>
            <button
              onClick={() => setFormData((p) => ({ ...p, uid: "" }))}
              className="text-red-500 transition-colors cursor-pointer"
            >
              Clear Form
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NFCRegistration;
