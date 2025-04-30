import './App.css'
import React from 'react';
import { Route, Routes} from 'react-router';
import Home from '../HomePage/home';
function App() {
  const routes = [Home]
  return (
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
  );
}

export default App;