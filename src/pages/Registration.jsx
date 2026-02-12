import React, { useState, useEffect } from "react";
import { 
  Cpu, Phone, CreditCard, Eye, EyeOff, ArrowLeft, 
  RefreshCw, CheckCircle, UserPlus, Trash2 
} from "lucide-react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { TbLockPassword } from "react-icons/tb";
import { motion, AnimatePresence } from "framer-motion";

const NFCRegistration = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "", surname: "", phone: "", uid: "", balance: "0", password: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0, scale: 0.98 },
    visible: { 
      opacity: 1, 
      scale: 1, 
      transition: { duration: 0.4, staggerChildren: 0.1 } 
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 }
  };

  useEffect(() => {
    const checkRemoteScan = async () => {
      try {
        const response = await axios.get("http://192.168.0.193:8000/api/get_temp_scan");
        if (response.data?.uid && response.data.uid !== formData.uid) {
          setFormData((prev) => ({ ...prev, uid: response.data.uid }));
          toast.success(`Card Detected: ${response.data.uid}`, { icon: "💳" });
        }
      } catch (error) {
        console.error("Unable to detect card:", error);
      }
    };
    const interval = setInterval(checkRemoteScan, 1000);
    return () => clearInterval(interval);
  }, [formData.uid]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.uid) {
      toast.warning("Please scan the card on your phone first!");
      return;
    }
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      Object.keys(formData).forEach(key => params.append(key, formData[key]));
      
      const response = await axios.post("http://192.168.0.193:8000/api/register", params, {
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
      });

      if (response.status === 200 || response.status === 201) {
        toast.success("User registered successfully!");
        setTimeout(() => navigate("/dashboard"), 1500);
      }
    } catch (error) {
      toast.error(error.response?.data?.detail || "Request failed");
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

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="max-w-4xl w-full bg-white rounded-[10px] shadow-2xl flex flex-col md:flex-row overflow-hidden border border-white"
      >
        <div className="md:w-2/5 bg-gradient-to-br from-indigo-600 to-blue-800 p-10 text-white flex flex-col justify-between">
          <motion.div variants={itemVariants}>
            <div className="flex items-center gap-2 mb-12 w-fit px-4 py-2 bg-white/10 rounded-full">
              <Cpu size={18} className="text-blue-200" />
              <span className="font-bold text-[10px] uppercase tracking-widest">NFC Manager</span>
            </div>
            <h1 className="text-4xl font-black leading-tight mb-4">Secure Card Issuance</h1>
            <p className="text-blue-100/60 text-xs leading-relaxed uppercase tracking-tighter">
               Scan the card on your phone, and the details will appear automatically.           
            </p>
          </motion.div>

          <motion.div
            variants={itemVariants}
            animate={formData.uid ? { scale: [1, 1.05, 1] } : {}}
            className={`p-6 rounded-3xl border-2 transition-all duration-500 ${
              formData.uid ? "bg-green-500/20 border-green-400" : "bg-white/5 border-white/10"
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-2xl ${formData.uid ? "bg-green-500 shadow-lg shadow-green-500/50" : "bg-blue-400 animate-pulse"}`}>
                {formData.uid ? <CheckCircle size={22} /> : <RefreshCw size={22} className="animate-spin" />}
              </div>
              <div className="overflow-hidden">
                <p className="text-[10px] font-black uppercase opacity-60 tracking-widest">Status</p>
                <p className="text-sm font-bold truncate font-mono tracking-wider">{formData.uid || "Awaiting scan..."}</p>
              </div>
            </div>
          </motion.div>
        </div>

        <div className="md:w-3/5 p-10 bg-white">
          <motion.div variants={itemVariants} className="mb-8">
            <h1 className="font-black text-[24px] text-slate-800 tracking-tight">Register New Tag</h1>
            <p className="text-sm text-slate-400 font-bold uppercase tracking-wider">Fill in the details to initialize card</p>
          </motion.div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Name</label>
                <input required name="name" value={formData.name} onChange={handleInputChange} className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none text-xs font-bold focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all" placeholder="Enter name" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Surname</label>
                <input required name="surname" value={formData.surname} onChange={handleInputChange} className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none text-xs font-bold focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/5 transition-all" placeholder="Enter surname" />
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-1.5">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Phone number</label>
              <div className="relative group">
                <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500 transition-colors" />
                <input required name="phone" value={formData.phone} onChange={handleInputChange} className="w-full p-3.5 pl-12 bg-slate-50 border border-slate-200 rounded-xl outline-none text-xs font-bold focus:border-indigo-500 transition-all" placeholder="9989..." />
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="space-y-1.5">
              <label className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] ml-1">Card id (uid)</label>
              <div className={`flex items-center p-4 rounded-xl border-2 transition-all ${formData.uid ? "bg-indigo-50 border-indigo-200" : "border-dashed border-slate-200 bg-slate-50/50"}`}>
                <CreditCard size={18} className={formData.uid ? "text-indigo-600" : "text-slate-300"} />
                <span className={`ml-4 font-mono font-black text-[12px] ${formData.uid ? "text-indigo-700" : "text-slate-400"}`}>
                  {formData.uid || "Please scan NFC hardware"}
                </span>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="grid grid-cols-2 gap-4">
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Balance</label>
                <input name="balance" type="number" value={formData.balance} onChange={handleInputChange} className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none text-xs font-bold focus:border-indigo-500 transition-all" />
              </div>
              <div className="space-y-1.5">
                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Password</label>
                <div className="relative group">
                  <TbLockPassword className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-300 group-focus-within:text-indigo-500" size={18} />
                  <input required name="password" type={showPassword ? "text" : "password"} value={formData.password} onChange={handleInputChange} className="w-full p-3.5 pl-12 bg-slate-50 border border-slate-200 rounded-xl outline-none text-xs font-bold focus:border-indigo-500 transition-all" placeholder="••••••••" />
                  <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors">
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </motion.div>

            <motion.button
              variants={itemVariants}
              type="submit"
              disabled={isLoading || !formData.uid}
              className={`w-full py-4 rounded-xl font-black text-[10px] uppercase tracking-[0.2em] shadow-xl transition-all mt-4 flex items-center justify-center gap-2 ${
                formData.uid ? " text-white bg-indigo-700 shadow-indigo-200" : "bg-indigo-600 text-white cursor-pointer"
              }`}
            >
              {isLoading ? (
                <RefreshCw size={18} className="animate-spin" />
              ) : (
                <><UserPlus size={18} /> <span>Register NFC Card</span></>
              )}
            </motion.button>
          </form>

          <motion.div variants={itemVariants} className="mt-5 pt-2 border-t border-slate-50 flex justify-center gap-5 items-center ">
            <button onClick={() => navigate("/")} className="text-[10px] font-black uppercase text-indigo-600 flex items-center gap-2 hover:opacity-70 transition-all">
              <ArrowLeft size={14} /> Back to Dashboard
            </button>
            <button 
              onClick={() => setFormData({name:"", surname:"", phone:"", uid:"", balance:"0", password:""})} 
              className="text-[10px] font-black uppercase text-red-400 flex items-center gap-1.5 hover:text-red-500 transition-all"
            >
              <Trash2 size={14} /> Clear Form
            </button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default NFCRegistration;