import { useEffect, useState } from 'react';
import './App.css';
import {
  onSnapshot,
  collection,
  DocumentData,
  QueryDocumentSnapshot,
  addDoc,
} from '@firebase/firestore';
import db from '../firebaseConfig'; // Adjusted the path to firebaseConfig.js

interface Product {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
}

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: "",
    imageUrl: '',
  });

  useEffect(() => {
    // Using onSnapshot returns an unsubscribe function, so we store it in a variable
    const unsubscribe = onSnapshot(collection(db, 'products'), (snapshot) => {
      const productData: Product[] = snapshot.docs.map(
        (doc: QueryDocumentSnapshot<DocumentData>) => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name,
            price: data.price,
            imageUrl: data.imageUrl,
          };
        }
      );
      setProducts(productData);
    });

    // Cleanup the subscription when the component unmounts
    return () => unsubscribe();
  }, []);

  const handleNew = async () => {
    // Check if all fields are filled before adding a new product
    if (newProduct.name && newProduct.price && newProduct.imageUrl) {
      const payload = { ...newProduct };

      // Add the new product to Firestore
      await addDoc(collection(db, 'products'), payload);

      // Clear the input fields after adding
      setNewProduct({ name: '', price: "", imageUrl: '' });
    } else {
      alert('Please fill in all fields.');
    }
  };

  return (
    <>
      <div>
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
        <button onClick={handleNew}>Add Product</button>
      </div>
      <ul>
        {products.map((product) => (
          <li key={product.id}>
            <h2>{product.name}</h2>
            <p>{product.price}</p>
            <img src={product.imageUrl} alt={product.name} />
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
