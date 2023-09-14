import React, { useState, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { FaTrashAlt } from 'react-icons/fa';
import { MdModeEdit } from 'react-icons/md';
import { FaCheck } from 'react-icons/fa';
import { deleteProduct, updateProduct, addToCart } from '../../store/product/productListSlice';
import { Link } from 'react-router-dom';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import 'bootstrap/dist/css/bootstrap.min.css';




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
    <div className="card mb-3" style={{ objectFit: 'cover', height: '100%', width: '100%' }}>
      <Link to={`/productsDetails/${product.id}`} className="link">
        <div className="card-img-top">
          <img src={product.imageUrl} alt={product.name} className="img-fluid" style={{ objectFit: 'cover', height: '100%', width: '100%' }} />
        </div>
      </Link>
      <div className="card-body">
        {isEditing ? (
          <input
            type="text"
            value={editedName}
            onChange={handleNameChange}
            className="form-control"
          />
        ) : (
          <h5 className="card-title">{product.name}</h5>
        )}
        {isEditing ? (
          <textarea
            value={editedDescription}
            onChange={handleDescriptionChange}
            className="form-control"
          />
        ) : (
          <p className="card-text">{truncateDescription(product.description, 50)}</p>
        )}
        <div className="card-price">
          {isEditing ? (
            <input
              type="number"
              value={editedPrice}
              onChange={handlePriceChange}
              className="form-control"
            />
          ) : (
            <span>{product.price} kr</span>
          )}
        </div>
      </div>
      <div className="card-footer">
        <button className="btn btn-success add-to-cart-btn" onClick={() => {
          addToCart(product);
          console.log(`Product added to cart: ${product.name}`);
        }}>
          Add to Cart
        </button>
        <button className="btn btn-primary edit-btn me-3" onClick={handleEdit}>
          {isEditing ? <FaCheck /> : <MdModeEdit />}
        </button>
        <button className="btn btn-danger delete-btn me-2" onClick={handleDelete}>
          <FaTrashAlt />
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
