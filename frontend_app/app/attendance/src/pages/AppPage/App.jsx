import './App.css'
import React from 'react';
import { Route, Routes } from 'react-router';
import { useEffect } from 'react';
import Home from '../HomePage/home';
//images
import bgImage from '../../assets/images/background.jpg'; // عدّل المسار حسب الحاجة

function App() {

  useEffect(() => {
    document.body.style.backgroundImage = `url(${bgImage})`;
    document.body.style.backgroundSize = 'cover';
    document.body.style.backgroundRepeat = 'no-repeat';
    document.body.style.backgroundPosition = 'center';
    document.body.style.minHeight = '100vh';
  }, []);
  
  const routes = [Home]
  return (
    <>
    <Routes>
      <Route path="/" element={<Home />} />
    </Routes>
    </>
  );
}

export default App;