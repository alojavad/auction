import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import AuctionContract from "./contracts/Auction.json";

import logo from './logo.svg';
import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './containers/home';
import Gallery from './containers/gallery';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' Component={Home} />
        <Route exact path='/gallery' Component={Gallery} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
