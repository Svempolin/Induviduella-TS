import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, addToCart } from '../store/product/productListSlice';
import { Product } from '../interface/Interface';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

const OrderPage: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, AnyAction>>();
  const cart = useSelector((state: { productList: { cart: Product[] } }) => state.productList.cart);
  console.log(cart);

  const handleRemoveFromCart = async (cartItemId: string) => {
    try {
      await dispatch(removeFromCart(cartItemId));
      // Thunk action completed successfully
    } catch (error) {
      // Handle errors if needed
    }
  };

  const handleIncrement = (product: Product) => {
    try {
      dispatch(addToCart(product));
    } catch (error) {
      // Handle errors if needed
    }
  };

  return (
    <div>
      <h2>Your Orders</h2>
      <ul>
        {cart.map((cartItem) => (
          <li key={cartItem.cartItemId}>
            <div>
              {cartItem.product && (
                <img src={cartItem.product.imageUrl} alt={cartItem.product.name} style={{ width: '100px', height: '100px' }} />
              )}
            </div>
            <div>
              {cartItem.product ? (
                <>
                  {cartItem.product.name} - {cartItem.product.price} kr
                  <div>
                    <button onClick={() => handleIncrement(cartItem.cartItemId)}>+</button>
                    {cartItem.quantity}
                    <button onClick={() => handleRemoveFromCart(cartItem.cartItemId)}>-</button>
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
