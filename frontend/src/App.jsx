import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Login from './components/Login';
import Signup from './components/Signup';
import Order from './components/Order';
import ProductList from './components/ProductList';
import Home from './components/Home';



function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes> 
        <Route path="/" element={<Home />} />
        <Route path="/order" element={<Order />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/product" element={<ProductList/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
