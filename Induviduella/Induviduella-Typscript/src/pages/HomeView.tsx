import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { getProducts, addToCart as addToCartAction } from '../store/product/productListSlice';
import ProductCard from '../components/productCard/productCard';
import { v4 as uuidv4 } from 'uuid';
import 'bootstrap/dist/css/bootstrap.min.css';

interface Product {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
  description: string;
}

const HomeView: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, AnyAction>>();

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const { products } = useSelector(
    (state: { productList: { products: Product[]; loading: boolean; error: string } }) =>
      state.productList
  );

  const addToCart = (product: Product) => {
    const cartItem: any = {
      cartItemId: uuidv4(), // Generate a unique identifier
      product,
      quantity: 1, // You can set the initial quantity to 1 or any other value
    };
    dispatch(addToCartAction(cartItem)); // Dispatch the addToCart action with the cart item
  };

  return (
    <div className="container">
      <h2 className="mt-4 mb-3">All our products</h2>

      <div className="row">
        {products.map((product: Product) => (
          <div className="col-md-4 mb-4" key={product.id}>
            <ProductCard
              product={product}
              imageUrl={product.imageUrl}
              addToCart={() => addToCart(product)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomeView;
