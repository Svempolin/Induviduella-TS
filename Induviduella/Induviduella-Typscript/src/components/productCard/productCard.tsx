import React, { useState, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { FaTrashAlt } from 'react-icons/fa';
import { MdModeEdit } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa';
import { deleteProduct, updateProduct, addToCart } from '../../store/product/productListSlice';
import { Link } from 'react-router-dom';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';


interface Product {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
  description: string;
 
}
interface ProductCardProps {
  product: Product;
  imageUrl: string;
  addToCart: (product: Product) => void; // Receive addToCart as a prop
}

const ProductCard: React.FC<ProductCardProps> = ({ product, addToCart }) => {
  const dispatch: ThunkDispatch<any, any, AnyAction> = useDispatch();
  const [isEditing, setIsEditing] = useState(false);
  const [editedName, setEditedName] = useState(product.name);
  const [editedPrice, setEditedPrice] = useState(product.price ? product.price.toString() : '');

  const [editedDescription, setEditedDescription] = useState(product.description);

  const handleDelete = () => {
    dispatch(deleteProduct(product.id));
  };
 

  const handleEdit = () => {
    if (isEditing) {
      dispatch(
        updateProduct({
          id: product.id,
          name: editedName,
          price: parseFloat(editedPrice),
          imageUrl: product.imageUrl,
          description: editedDescription,
        })
      );
    }
    setIsEditing(!isEditing);
  };

  const handleNameChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditedName(e.target.value);
  };

  const handlePriceChange = (e: ChangeEvent<HTMLInputElement>) => {
    setEditedPrice(e.target.value);
  };

  const handleDescriptionChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setEditedDescription(e.target.value);
  };

  const truncateDescription = (text: string | undefined | null, maxLength: number) => {
    if (text && text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text || '';
  };
  

  return (
    <div className="product_item">
      <div className="left_box">
        <Link className="link" to={`/productsDetails/${product.id}`}>
          <div className="product_img">
          <img src={product.imageUrl} alt={product.name} />
          </div>
        </Link>
        <div className="product-name">
          {isEditing ? (
            <input
              type="text"
              value={editedName}
              onChange={handleNameChange}
            />
          ) : (
            <h5>{product.name}</h5>
          )}
        </div>
      </div>
      <div className="right_box">
        <div className="product-description">
          {isEditing ? (
            <textarea
              value={editedDescription}
              onChange={handleDescriptionChange}
            />
          ) : (
            <p>{truncateDescription(product.description, 50)}</p>
          )}
          <div className="product-price">
            {isEditing ? (
              <input
                type="number"
                value={editedPrice}
                onChange={handlePriceChange}
              />
            ) : (
              <span>{product.price} kr</span>
            )}
          </div>
        </div>
        <div className="productList-btns">
          <button className="edit-btn" onClick={handleEdit}>
            {isEditing ? <FaCheck /> : <MdModeEdit />}
          </button>
          <button className="delete-btn" onClick={handleDelete}>
            <FaTrashAlt />
          </button>
          <button className="add-to-cart-btn" onClick={() => {
      addToCart(product);
        console.log(`Product added to cart: ${product.name}`);
        }}>
  Add to Cart
</button> {/* Call addToCart with the product */}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
