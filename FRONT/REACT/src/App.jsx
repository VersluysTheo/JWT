import React from 'react';
import ButtonAppBar from './components/Navbar/Navbar';
import Leaflet from './components/Leaflet/Leaflet';
import Cards from './components/Cards/Cards';
import SingleCard from './components/SingleCard/SingleCard';
import { BrowserRouter as Router, Route, Routes, Outlet } from 'react-router-dom';

import './App.css';

function App() {
  return (
    <Router>
      <>
        <ButtonAppBar />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Leaflet />
                <Cards/>
                <Outlet />
              </>
            }
          />
          <Route path="/salles/:id" element={<SingleCard />} />
        </Routes>
      </>
    </Router>
  );
}

export default App;