import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomeView from './pages/HomeView';
import Header from './components/header/Header'; // Import the Header component
import Footer from './components/footer/Footer';
import AddNewProduct from './pages/AddNewProduct';
import ProductDetails from './pages/ProductDetails';
import OrderPage from './pages/OrderPage';

function App() {
  
  // State to manage cart value
  const [cartValue, setCartValue] = useState(0); // Initialize cartValue with 0

  // Function to update the cart value when a product is added
  const addToCart = () => {
    // Logic to update the cart value, e.g., increment it by 1
    setCartValue(cartValue + 1);
    // You can also perform other cart-related operations here
  };
 
  return (
    <Router>
      <Header cart={[]} cartValue={cartValue} setCartValue={setCartValue} /> {/* Pass cartValue as a prop to Header */}
      <Routes>
        <Route path="/" element={<HomeView addToCart={addToCart} />} />
        <Route path="/productsDetails/:id" element={<ProductDetails />} />
        <Route path="/addProduct" element={<AddNewProduct />} />
        <Route path="/orders" element={<OrderPage />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
