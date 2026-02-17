import axios from "axios";
import { useState, FormEvent } from "react";
import { FaCrown, FaUser, FaLock } from "react-icons/fa";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const SuperAdmin = () => {
  const navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!phone || !password) {
      toast.warning("Iltimos, barcha maydonlarni to'ldiring!");
      return;
    }

    setLoading(true);
    const urls = [
      "http://192.168.0.193:8000/super_admin/login",
      "http://192.168.0.193:8000/api/super_admin/login",
      "http://192.168.0.193:8000/super_admin",
      "http://192.168.0.193:8000/api/super_admin",
      "http://192.168.0.193:8000/admin/login",
      "http://192.168.0.193:8000/superadmin/login"
    ];
    for (const url of urls) {
      try {
        console.log(`Tekshirilmoqda: ${url} (POST)`);
                const response = await axios.post(url, 
          { 
            phone: phone.trim(), 
            password: password 
          },
          { 
            headers: { 
              "Content-Type": "application/json",
              "Accept": "application/json" 
            },
            timeout: 5000
          }
        );

        if (response.status === 200 || response.status === 201) {
          console.log("✅ Muvaffaqiyatli javob:", response.data);
                    const token = response.data.token || 
                       response.data.access_token || 
                       response.data.accessToken;
          
          if (token) {
            localStorage.setItem("token", token);
            console.log("Token saqlandi");
          } else {
            console.warn("Token topilmadi!");
          }
          
          if (response.data.user) {
            localStorage.setItem("user", JSON.stringify(response.data.user));
          }
          
          toast.success("Tizimga muvaffaqiyatli kirdingiz!");
                    setTimeout(() => {
            navigate("/superadmindashboard");
          }, 1500);
          
          setLoading(false);
          return; 
        }
        
      } catch (error: any) {
        console.log(`Xatolik ${url}:`, error.response?.status);
                if (error.response?.status === 405) {
          try {
            console.log(`GET bilan tekshirilmoqda: ${url}`);
            
            const getResponse = await axios.get(url, {
              params: { 
                phone: phone.trim(), 
                password: password 
              },
              headers: { "Accept": "application/json" },
              timeout: 5000
            });
            
            if (getResponse.status === 200) {
              console.log("✅ GET muvaffaqiyatli:", getResponse.data);
              
              const token = getResponse.data.token || 
                           getResponse.data.access_token;
              
              if (token) {
                localStorage.setItem("token", token);
              }
              
              if (getResponse.data.user) {
                localStorage.setItem("user", JSON.stringify(getResponse.data.user));
              }
              
              toast.success("Tizimga muvaffaqiyatli kirdingiz!");
              
              setTimeout(() => {
                navigate("/superadmindashboard");
              }, 1500);
              
              setLoading(false);
              return;
            }
          } catch (getError) {
            console.log(`GET ham ishlamadi ${url}`);
          }
        }
        
        if (error.response?.status === 404) {
          console.log(`${url} topilmadi, keyingisiga o'tamiz`);
          continue;
        }
                if (error.response?.status === 401) {
          toast.error("Telefon raqam yoki parol noto'g'ri!");
          setLoading(false);
          return;
        }
        if (error.response?.status === 500) {
          toast.error("Serverda xatolik yuz berdi!");
          setLoading(false);
          return;
        }
      }
    }
    toast.error("Serverga ulanishda xatolik! Backend manzilini tekshiring.");
    setLoading(false);
  };
  const testBackendConnection = async () => {
    try {
      const testUrl = "http://192.168.0.193:8000";
      const response = await axios.get(testUrl, { timeout: 3000 });
      toast.info(`Server ulanishi mavjud: ${response.status}`);
    } catch (error: any) {
      if (error.code === 'ERR_NETWORK') {
        toast.error("Serverga ulanish yo'q! Backend ishlayotganini tekshiring.");
      } else {
        toast.info(`Server javob berdi: ${error.message}`);
      }
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center p-5 bg-gradient-to-br from-blue-600 to-blue-800">
      <div className="bg-white/95 backdrop-blur-sm shadow-2xl rounded-2xl max-w-[500px] w-full p-8">
        
        <div className="flex flex-col items-center mb-8">
          <div className="bg-amber-100 p-4 rounded-full mb-4 shadow-inner">
            <FaCrown className="text-amber-500 text-4xl" />
          </div>
          <h1 className="text-3xl font-bold font-mono text-gray-800 tracking-tight">
            Super Admin
          </h1>
          <p className="text-gray-500 text-sm mt-1">
            Tizimga kirish uchun ma'lumotlarni kiriting
          </p>
        </div>


        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="relative">
            <FaUser className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              type="text"
              placeholder="Telefon raqami"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
              disabled={loading}
            />
          </div>

          <div className="relative">
            <FaLock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              type="password"
              placeholder="Parol"
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition-all"
              disabled={loading}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-gradient-to-r from-blue-600 to-blue-800 text-white font-bold py-3 rounded-lg transition-all shadow-lg flex justify-center items-center ${
              loading ? "opacity-70 cursor-not-allowed" : "hover:shadow-xl active:scale-95"
            }`}
          >
            {loading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Kirish...
              </>
            ) : (
              "Kirish"
            )}
          </button>
        </form>

        <div className="mt-6 text-center">
          <button 
            type="button" 
            onClick={() => toast.info("Admin bilan bog'lanishingiz mumkin")}
            className="text-sm text-blue-600 hover:underline focus:outline-none cursor-pointer"
          >
            Parolni unutdingizmi?
          </button>
        </div>
      </div>
    </section>
  );
};

export default SuperAdmin;