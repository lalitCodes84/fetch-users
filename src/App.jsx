import React from "react";
import Home from "./pages/Home";
import { Routes, Route } from "react-router-dom";
import UserDetail from "./pages/UserDetail";
import { ThemeProvider } from "./components/themeContext";

function App() {
  return (
    <div className="text-3xl h-screen">
      <ThemeProvider>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user-detail/:id" element={<UserDetail />} />
        </Routes>
      </ThemeProvider>
    </div>
  );
}

export default App;
