// import React from 'react';

import { useState } from "react";
import LoginModal from "../components/LoginModal/LoginModal";
import MainPageBlock from "../components/MainPageBlock/MainPageBlock";

const HomePage = () => {
  const [isVisible, setIsVisible] = useState(false);


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