import React from 'react';
import './App.css';
import {Footer, Navbar, SearchComponent, Mainpage,Carousel, Rtables} from "../../screeners/src/components"
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <div className="App h-screen w-screen overflow-x-hidden">
      
      <Navbar/>
     <Mainpage/>
    <Carousel/>
    <div className="w-screen">
    </div>
    </div>  
  );
}

export default App;
