import { React, useState } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { createContext } from "react";
import Funnel from "./components/funnel/funnel.component.js";
import "./App.css";
import VgrowU_Info from "./routes/vgrowu_info/vgrowu_info.js";
export const GlobalContext = createContext();

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const detailsPopup = () => {
    console.log("button clicked");
    isModalOpen ? setIsModalOpen(false) : setIsModalOpen(true);
    console.log(isModalOpen);
  };
  const [detailsFilled, setDetailsFIlled] = useState(false);
  const value = {
    isModalOpen,
    setIsModalOpen,
    detailsFilled,
    setDetailsFIlled,
    detailsPopup
  };
  return (
    <>
    <BrowserRouter>
      <GlobalContext.Provider value={value}>
        <Routes>
          <Route path="/" element={<Funnel />} />
          <Route path="/vgrowU-info" element={<VgrowU_Info />} />
        </Routes>
      </GlobalContext.Provider>
      
    </BrowserRouter>
    </>
  );
}

export default App;
