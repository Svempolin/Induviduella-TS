import React, { useEffect, useState } from 'react';
import {
  onSnapshot,
  collection,
  DocumentData,
  QueryDocumentSnapshot,
  addDoc,
  Unsubscribe,
} from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';
import { Product } from '../interface/Interface';
import './AddProduct.css';

function AddProduct() {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    imageUrl: '',
    description: '',
  });

  useEffect(() => {
    let unsubscribe: Unsubscribe | undefined;

    unsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
      const productData: Product[] = snapshot.docs.map(
        (doc: QueryDocumentSnapshot<DocumentData>) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name,
            price: data.price,
            imageUrl: data.imageUrl,
            description: data.description,
          };
        }
      );

      setProducts(productData);
    });

    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [db]);

  const handleNew = async () => {
    if (
      newProduct.name &&
      newProduct.price &&
      newProduct.imageUrl &&
      newProduct.description
    ) {
      const payload = { ...newProduct };

      await addDoc(collection(db, 'products'), payload);

      setNewProduct({ name: '', price: '', imageUrl: '', description: '' });
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <div className="add-product-container">
      <div className="add-product-form">
        <label>
          Product Name:
          <input
            type="text"
            value={newProduct.name}
            onChange={(e) =>
              setNewProduct({ ...newProduct, name: e.target.value })
            }
          />
        </label>
        <label>
          Product Price:
          <input
            type="text"
            value={newProduct.price}
            onChange={(e) =>
              setNewProduct({ ...newProduct, price: e.target.value })
            }
          />
        </label>
        <label>
          Image URL:
          <input
            type="text"
            value={newProduct.imageUrl}
            onChange={(e) =>
              setNewProduct({ ...newProduct, imageUrl: e.target.value })
            }
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
          />
        </label>
        <button onClick={handleNew}>Add Product</button>
      </div>
      <ul className="product-list">
        {products.map((product) => (
          <li key={product.id} className="product-item">
            <h2>{product.name}</h2>
            <p>{product.price}</p>
            <div className="product-image-wrapper">
              <img
                src={product.imageUrl}
                alt={product.name}
                className="product-image"
              />
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AddProduct;
