import { useEffect, useState } from 'react';
import {
  onSnapshot,
  collection,
  DocumentData,
  QueryDocumentSnapshot,
  addDoc,
  Unsubscribe,
} from 'firebase/firestore'; // Ändra '@firebase/firestore' beroende på hur din firestore är installerad
import {db} from '../firebase/firebaseConfig'; // Justera sökvägen till firebaseConfig.js



function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [newProduct, setNewProduct] = useState({
    name: '',
    price: '',
    imageUrl: '',
    description: "",
  });

  useEffect(() => {
    let unsubscribe: Unsubscribe | undefined;

    // Använd onSnapshot för att prenumerera på ändringar och lagra unsubscribe-funktionen
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

      // Uppdatera produkter när data ändras
      setProducts(productData);
    });

    // Cleanup the subscription when the component unmounts
    return () => {
      if (unsubscribe) {
        unsubscribe();
      }
    };
  }, [db]); // Lägg till db i beroendediagrammet om det används

  const handleNew = async () => {
    if (newProduct.name && newProduct.price && newProduct.imageUrl && newProduct.description) {
      const payload = { ...newProduct };

      // Lägg till det nya produktobjektet i Firestore
      await addDoc(collection(db, 'products'), payload);

      // Rensa inputfälten efter att produkten lagts till
      setNewProduct({ name: '', price: '', imageUrl: '', description: '' });
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
