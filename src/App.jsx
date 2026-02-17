import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginaPage from "./pages/LoginaPage";
import Registration from "./pages/Registration";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import SuperAdmin from "./components/SuperAdmin";
import SuperAdminDashboard from "./components/SuperAdminDashboard";
import Languages from "./components/Languages";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/language" element={<Languages/>}/>
        <Route path="/" element={<LoginaPage />} />
        <Route path="/registration" element={<Registration/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/setting" element={<Settings/>}/>
        <Route path="/superadmin" element={<SuperAdmin/>}/>
        <Route path="/superadmindashboard" element={<SuperAdminDashboard/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
