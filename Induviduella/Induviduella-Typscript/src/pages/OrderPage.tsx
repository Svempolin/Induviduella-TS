import {useEffect, useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, modifyCartItemQuantity } from '../store/product/productListSlice';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import 'bootstrap/dist/css/bootstrap.min.css';



const OrderPage: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, AnyAction>>();
  const cart = useSelector((state: { productList: { cart: CartItem[] } }) => state.productList.cart);

  const handleRemoveFromCart = async (cartItemId: string) => {
    try {
      dispatch(removeFromCart(cartItemId));
    } catch (error) {
      // Handle errors if needed
    }
  };

  const modifyQuantity = (cartItemId: string, modifier: number) => {
    const cartItem = cart.find((item) => item.cartItemId === cartItemId);
    if (cartItem) {
      const newQuantity = cartItem.quantity + modifier;
      if (newQuantity > 0) {
        const updatedCartItem = { ...cartItem, quantity: newQuantity };
        try {
          dispatch(modifyCartItemQuantity(updatedCartItem));
        } catch (error) {
          // Handle errors if needed
        }
      } else {
        handleRemoveFromCart(cartItemId);
      }
  }
  };

  return (
<div>
  <h2 className="mt-4 mb-3">Your Orders</h2>
  <ul className="list-group">
    {cart.map((cartItem) => (
      <li key={cartItem.cartItemId} className="list-group-item">
        <div>
          {cartItem.product && (
            <img
              src={cartItem.product.imageUrl}
              alt={cartItem.product.name}
              style={{ width: '100px', height: '100px' }}
              className="cart-item-img"
            />
          )}
        </div>
        <div>
          {cartItem.product ? (
            <>
              <h5 className="cart-item-name">{cartItem.product.name}</h5>
              <span className="cart-item-price">- {cartItem.product.price} kr</span>
              <div className="cart-item-quantity">
                <button
                  onClick={() => modifyQuantity(cartItem.cartItemId, 1)}
                  className="btn btn-success btn-sm"
                >
                  +
                </button>
                {cartItem.quantity}
                <button
                  onClick={() => modifyQuantity(cartItem.cartItemId, -1)}
                  className="btn btn-danger btn-sm"
                >
                  -
                </button>
              </div>
            </>
          ) : (
            <span>Product not available</span>
          )}
        </div>
      </li>
    ))}
  </ul>
</div>
  );
};

export default OrderPage;
