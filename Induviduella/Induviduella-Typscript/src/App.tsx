import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeView from './pages/HomeView';
import Header from './components/header/Header'; // Import the Header component
import Footer from './components/footer/Footer';
import AddNewProduct from './pages/AddNewProduct';
import ProductDetails from './pages/ProductDetails';
import OrderPage from './pages/OrderPage';
import { getCart } from './store/product/productListSlice';
import { useDispatch } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from '@reduxjs/toolkit';
import HeroImage from './components/Hero/Hero';

function App() {
  const dispatch = useDispatch<ThunkDispatch<any, any, AnyAction>>();

  useEffect(() => {
    dispatch(getCart());
  },[]);
 
  return (
    <Router>
      <Header /> {/* Pass cartValue as a prop to Header */}
      <HeroImage />
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/productsDetails/:id" element={<ProductDetails />} />
        <Route path="/addProduct" element={<AddNewProduct />} />
        <Route path="/orders" element={<OrderPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
