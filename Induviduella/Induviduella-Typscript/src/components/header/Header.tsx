import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import styles from './Headers.module.css';
import { Product } from '../../interface/Interface';
import logo from '../../assets/placeholders/Logo.png';

interface HeaderProps {
  cart: Product[]; 
  cartValue: number
  setCartValue: (value: number) => void;
}

const Header: React.FC<HeaderProps> = ({ cart }) => {
  // Function to check if a product is in the cart
  const isProductInCart = (productId: string) => {
    return cart.some((product) => product.id === productId);
  };

  return (
    <header>
      <nav className={styles.nav_container}>
        <div className={styles.logo_div}>
          <Link to="/">
            <img className={styles.logo} src={logo} alt="" />
          </Link>
        </div>
        <div className={styles.nav_links_div}>
          <ul>
            <li>
              <NavLink to="/addProduct">Add Products</NavLink>
            </li>
            <li>
              <NavLink to="/orders">Orders</NavLink>
            </li>
          </ul>
        </div>
      </nav>
      <div className={styles.cart_container}>
        <Link to="/orders">
          <FaShoppingCart /> {/* Shopping cart icon */}
          <span>{cart.length}</span> {/* Display cart value as the length of the cart array */}
        </Link>
        {isProductInCart('product_id_to_check') && (
          <p>This product is in the cart.</p>
        )}
      </div>
    </header>
  );
};

export default Header;
