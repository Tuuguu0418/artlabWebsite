"use client";

import { createContext, useContext, useState } from "react";

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
  const [expended, setExpended] = useState(false);

  const toggleSidebar = () => {
    setExpended((prev) => !prev);
  };

  return (
    <SidebarContext.Provider value={{ expended, toggleSidebar }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const useSidebar = () => useContext(SidebarContext);
