import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginaPage from "./pages/LoginaPage";
import Registration from "./pages/Registration";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginaPage />} />
        <Route path="/registration" element={<Registration/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/setting" element={<Settings/>}/>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
