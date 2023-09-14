import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import styles from './Headers.module.css';
import logo from '../../assets/placeholders/Logo.png';
import { useSelector } from 'react-redux';
import './Headers.module.css';

import 'bootstrap/dist/css/bootstrap.min.css';

const Header: React.FC = () => {
  // Function to check if a product is in the cart
  const cart = useSelector((state: { productList: { cart: CartItem[] } }) => state.productList.cart);
  console.log("CART",cart);
  const isProductInCart = (cartItemId: string) => {
    return cart.some((cartItem) => cartItem.cartItemId === cartItemId);
  };

  return (
   <header className="bg-dark text-light">
  <nav className={`navbar navbar-expand-lg navbar-dark ${styles.nav_container}`}>
    <div className={`container ${styles.nav_container}`}>
      <NavLink to="/" className={`navbar-brand ${styles.logo_div}`}>
        <img className={styles.logo} src={logo} alt="" />
      </NavLink>

      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#navbarNav"
        aria-controls="navbarNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      <div className={`collapse navbar-collapse ${styles.nav_links_div}`} id="navbarNav">
        <ul className="navbar-nav">
          <li className="nav-item">
            <NavLink to="/addProduct" className="nav-link">
              Add Products
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/orders" className="nav-link">
              Orders
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  </nav>

  <div className={`container ${styles.cart_container}`}>
    <Link to="/orders" className="text-light text-decoration-none">
      <FaShoppingCart className="mr-2" /> {/* Shopping cart icon */}
      <span className="badge badge-light">{cart.length}</span> {/* Display cart value as the length of the cart array */}
    </Link>
    {isProductInCart('product_id_to_check') && (
      <p>This product is in the cart.</p>
    )}
  </div>
</header>

  );
};

export default Header;
