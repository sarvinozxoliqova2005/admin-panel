import { useNavigate, useLocation } from "react-router-dom";
import { MdDashboard, MdSettings } from "react-icons/md";
import { BsCreditCardFill, BsStopwatch } from "react-icons/bs";
import { CgInsights } from "react-icons/cg";

const menuItems = [
  { label: "Dashboard", path: "/dashboard", icon: <MdDashboard size={18} /> },
  { label: "Cards", icon: <BsCreditCardFill size={18} /> },
  { label: "Activity", icon: <BsStopwatch size={18} /> },
  { label: "Insights", icon: <CgInsights size={18} /> },
  { label: "Settings", path: "/setting", icon: <MdSettings size={18} /> },
];

const Settings = () => {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-[#F3F4F6] font-sans text-slate-700">
      <aside className="w-64 bg-white border-r border-slate-200 flex flex-col p-6 hidden lg:flex fixed left-0 top-0 h-screen z-10">
        <div className="flex items-center gap-2 mb-10">
          <div className="w-8 h-8 bg-blue-700 rounded-lg flex items-center justify-center text-white font-bold text-sm">
            N
          </div>
          <div>
            <h1 className="text-xs font-black text-slate-800 uppercase tracking-tight">
              NFC MANAGER
            </h1>
            <p className="text-[9px] text-slate-400 font-bold -mt-1 uppercase">
              Admin Portal
            </p>
          </div>
        </div>

        <nav className="flex-1 space-y-1">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <div
                key={item.label}
                onClick={() => navigate(item.path)}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl cursor-pointer transition-all duration-200
                ${isActive ? "bg-blue-50 text-blue-700 shadow-sm" : "text-slate-500 hover:bg-slate-50"}`}
              >
                <span className={isActive ? "text-blue-700" : "text-slate-400"}>
                  {item.icon}
                </span>
                <span className="text-xs font-bold">{item.label}</span>
              </div>
            );
          })}
        </nav>

        <div className="mt-auto flex items-center gap-3 pt- border-t border-slate-100">
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
        </div>
      </aside>

      <main className="flex-1 p-3 md:p-10 overflow-y-auto md:ml-64">
        <div className="pb-6 border-b border-slate-100 flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-black text-slate-900">Settings</h1>
            <p className="text-xs text-slate-500 font-medium">
              Manage your account, security, and notification preferences.
            </p>
          </div>
          <div className="flex gap-3">
            <button className="px-5 py-2 text-xs font-bold text-slate-600 bg-white border border-slate-200 rounded-xl hover:bg-slate-50 transition-all">
              Cancel
            </button>
            <button className="px-5 py-2 text-xs font-bold text-white bg-blue-700 rounded-xl shadow-lg shadow-blue-100 hover:bg-blue-800 transition-all">
              Save Changes
            </button>
          </div>
        </div>
        <div className=" mx-auto bg-white rounded-[10px]  shadow-sm overflow-hidden">
          <div className="p-8 space-y-12">
            <section>
              <h2 className="text-sm font-black text-slate-900 mb-1">
                Profile Information
              </h2>
              <p className="text-[11px] text-slate-400 font-bold mb-6">
                Update your photo and personal details.
              </p>

              <div className="flex items-center gap-6 mb-8">
                <div className="w-16 h-16 bg-orange-50 rounded-2xl flex items-center justify-center text-orange-200 border-2 border-orange-100 relative">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                    <circle cx="12" cy="7" r="4"></circle>
                  </svg>
                </div>
                <div>
                  <p className="text-[11px] font-black text-slate-800 mb-1">
                    Profile Picture
                  </p>
                  <p className="text-[10px] text-slate-400 font-medium mb-2">
                    JPG, GIF or PNG. Max size 2MB.
                  </p>
                  <div className="flex gap-4">
                    <button className="text-blue-700 text-[10px] font-black uppercase tracking-wider hover:underline">
                      Upload New
                    </button>
                    <button className="text-red-500 text-[10px] font-black uppercase tracking-wider hover:underline">
                      Remove
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <InputBox label="First Name" value="Alex" />
                <InputBox label="Last Name" value="Morgan" />
                <InputBox label="Email Address" value="alex.m@nfcmanager.com" />
                <InputBox label="Phone Number" value="+1 (555) 012-3456" />
              </div>
            </section>

            <section className="pt-8 border-t border-slate-100">
              <h2 className="text-sm font-black text-slate-900 mb-6">
                Security
              </h2>
              <div className="max-w-md space-y-4">
                <InputBox
                  label="Current Password"
                  type="password"
                  value="********"
                />
                <InputBox
                  label="New Password"
                  placeholder="Min. 8 characters"
                />
                <InputBox
                  label="Confirm New Password"
                  type="password"
                  value="********"
                />
                <button className="text-blue-700 text-[11px] font-black mt-2">
                  Update Password
                </button>
              </div>
            </section>

            <section className="pt-8 border-t border-slate-100">
              <h2 className="text-sm font-black text-slate-900 mb-6">
                Preferences
              </h2>
              <div className="space-y-3">
                <ToggleRow
                  title="Transaction Alerts"
                  desc="Get notified whenever a card is used or scanned."
                  checked
                />
                <ToggleRow
                  title="Marketing Emails"
                  desc="Receive news, updates, and promotional offers."
                />
                <ToggleRow
                  title="Security Alerts"
                  desc="Critical notifications about account access."
                  checked
                />
              </div>
            </section>

            <section className="pt-8 border-t border-slate-100">
              <div className="bg-red-50/50 border border-red-100 rounded-[20px] p-6 flex justify-between items-center">
                <div>
                  <p className="text-[10px] font-black text-red-600 uppercase tracking-widest mb-1">
                    Danger Zone
                  </p>
                  <p className="text-[11px] text-slate-600 font-bold">
                    Permanently delete your account and all associated data.
                  </p>
                </div>
                <button className="bg-red-600 text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase hover:bg-red-700 transition-all">
                  Deactivate Account
                </button>
              </div>
            </section>
          </div>
        </div>
      </main>
    </div>
  );
};

const InputBox = ({ label, value, type = "text", placeholder }) => (
  <div className="space-y-1.5">
    <label className="block text-[11px] font-bold text-slate-500 uppercase tracking-wide">
      {label}
    </label>
    <input
      type={type}
      defaultValue={value}
      placeholder={placeholder}
      className="w-full px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs font-bold text-slate-800 outline-none focus:ring-2 focus:ring-blue-500/10 focus:border-blue-500 transition-all"
    />
  </div>
);

const ToggleRow = ({ title, desc, checked }) => (
  <div className="flex items-center justify-between p-4 bg-slate-50/50 rounded-2xl border border-transparent hover:border-slate-100 transition-all">
    <div>
      <p className="text-[12px] font-black text-slate-800">{title}</p>
      <p className="text-[10px] text-slate-400 font-bold">{desc}</p>
    </div>
    <div
      className={`w-10 h-5 rounded-full relative cursor-pointer transition-all duration-300 ${checked ? "bg-blue-600" : "bg-slate-200"}`}
    >
      <div
        className={`absolute top-1 w-3 h-3 bg-white rounded-full transition-all duration-300 ${checked ? "right-1" : "left-1"}`}
      ></div>
    </div>
  </div>
);

export default Settings;
