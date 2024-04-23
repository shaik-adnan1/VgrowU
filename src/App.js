import { React, useState } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createContext } from "react";
import Funnel from "./components/funnel/funnel.component.js";
import "./App.css";
import VgrowU_Info from "./routes/vgrowu_info/vgrowu_info.js";
import GlobalProvider from "./context/globalContext.js";

function App() {
  
  return (
    <>
    <BrowserRouter>
      <GlobalProvider>
        <Routes>
          <Route path="/" element={<Funnel />} />
          <Route path="/vgrowU-info" element={<VgrowU_Info />} />
        </Routes>
      </GlobalProvider>
      
    </BrowserRouter>
    </>
  );
}

export default App;
