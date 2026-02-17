import { HiOutlineArrowRight } from "react-icons/hi";
import { MdLanguage } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const Languages = () => {
  const navigate = useNavigate(); 

  const languages = [
    { code: "uz", name: "O'zbekcha", flag: "🇺🇿" },
    { code: "ru", name: "Русский", flag: "🇷🇺" },
    { code: "en", name: "English", flag: "🇺🇸" },
  ];

  const handleLanguageSelect = (code) => {
    localStorage.setItem("selectedLanguage", code);
        navigate("/"); 
  };

  return (
   <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-700 to-purple-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl shadow-2xl overflow-hidden transition-all duration-500">
        
        <div className="p-8 animate-fadeIn">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-4 shadow-inner">
              <MdLanguage className="text-white text-3xl animate-pulse" />
            </div>
            <h1 className="text-2xl font-bold text-white text-center max-[600px]:text-xl">
              Tilni tanlang / Выберите язык
            </h1>
            <p className="text-blue-100 text-sm mt-2">Ilovadan foydalanish uchun tilni tanlang</p>
          </div>

          <div className="space-y-4">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => handleLanguageSelect(lang.code)} 
                className="w-full group flex items-center justify-between bg-white/10 cursor-pointer hover:bg-white/20 p-4 rounded-2xl border border-white/5 transition-all active:scale-95"
              >
                <div className="flex items-center gap-4">
                  <span className="text-2xl">{lang.flag}</span>
                  <span className="text-white font-medium text-lg">{lang.name}</span>
                </div>
                <HiOutlineArrowRight className="text-white opacity-0 group-hover:opacity-100 transition-all transform translate-x-2 group-hover:translate-x-0" />
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Languages;