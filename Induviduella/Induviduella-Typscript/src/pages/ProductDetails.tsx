import React from 'react';
import useDoc from '../hooks/useDoc';
import {  useParams } from 'react-router-dom';
import './ProductDetails.css';

// interface ProductData {
// //   imageURL: string;
// //   name: string;
// //   description: string;
// //   price: string;
// // }

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id?: string }>();
  const { data, error } = useDoc('products', id || '');

  if (!data)
    return (
      <div>
        {error && <p>{error}</p>}
      </div>
    );

  return (
    <div className='details_container'>
      <div className="product_picture">
        <img src={data.imageUrl} alt={data.name} />
      </div>
      <div className="right">
        <h2>{data.name}</h2>
        <h4 className="product_description">
          Description: {data.description}
        </h4>

        <p>{data.price} SEK</p>
       
      </div>
    </div>
  );
}

export default ProductDetails;
