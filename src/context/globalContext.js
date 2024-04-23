import React, { createContext, useState } from "react";

export const GlobalContext = createContext();

const GlobalProvider = ({ children }) => {

    // states

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [detailsFilled, setDetailsFIlled] = useState(false);
    
    const detailsPopup = () => {
      console.log("button clicked");
      isModalOpen ? setIsModalOpen(false) : setIsModalOpen(true);
      console.log(isModalOpen);
    };
    
    const value = {
      isModalOpen,
      detailsFilled,
      setDetailsFIlled,
      detailsPopup
    };

  return (
    <GlobalContext.Provider value={value}>
      {children}
    </GlobalContext.Provider>
  );
};

export default GlobalProvider;
