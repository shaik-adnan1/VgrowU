import logo from "./logo.svg";
import "./App.css";
import Funnel from "./components/funnel/funnel.component.js";
import VideoPlayer from "./components/videoPlayer/VideoPlayer.component.js";
import ContactForm from "./components/detailsPopup/contactForm.js";
import { React, useState } from "react";
import { createContext } from "react";
export const GlobalContext = createContext();

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [detailsFilled, setDetailsFIlled] = useState(false);
  const value = {
    isModalOpen,
    setIsModalOpen,
    detailsFilled,
    setDetailsFIlled,
  };
  return (
    <>
      <GlobalContext.Provider value={value}>
        <Funnel />
      </GlobalContext.Provider>
    </>
  );
}

export default App;
