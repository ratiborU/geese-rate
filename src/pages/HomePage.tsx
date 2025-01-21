// import React from 'react';

import { useState } from "react";
import LoginModal from "../components/LoginModal/LoginModal";
import MainPageBlock from "../components/MainPageBlock/MainPageBlock";

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false);

  const apiKey = import.meta.env.VITE_BACKEND_URL;
  const apiUrl = import.meta.env.VITE_FRONTEND_URL;

  console.log("API Key:", apiKey);
  console.log("API URL:", apiUrl);


  const change = (state: boolean) => {
    setIsVisible(state);
  }

  return (
    <>
      <MainPageBlock change={change} />
      <LoginModal isVisible={isVisible} change={change} />
    </>
  );
};

export default HomePage;