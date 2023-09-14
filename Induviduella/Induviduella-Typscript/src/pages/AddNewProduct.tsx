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
import 'bootstrap/dist/css/bootstrap.min.css';




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
     <div className="container mt-5">
      <div className="row">
        <div className="col-md-6">
          <h2>Add New Product</h2>
          <form>
            <div className="mb-3">
              <label htmlFor="productName" className="form-label">Product Name:</label>
              <input
                type="text"
                className="form-control"
                id="productName"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="productPrice" className="form-label">Product Price:</label>
              <input
                type="text"
                className="form-control"
                id="productPrice"
                value={newProduct.price}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, price: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="imageUrl" className="form-label">Image URL:</label>
              <input
                type="text"
                className="form-control"
                id="imageUrl"
                value={newProduct.imageUrl}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, imageUrl: e.target.value })
                }
              />
            </div>
            <div className="mb-3">
              <label htmlFor="description" className="form-label">Description:</label>
              <input
                type="text"
                className="form-control"
                id="description"
                value={newProduct.description}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, description: e.target.value })
                }
              />
            </div>
            <button type="button" className="btn btn-primary" onClick={handleNew}>Add Product</button>
          </form>
        </div>
        <div className="col-md-6">
          <h2>Product List</h2>
          <ul className="list-group">
            {products.map((product) => (
              <li key={product.id} className="list-group-item">
                <h3>{product.name}</h3>
                <p>Price: ${product.price}</p>
                <img src={product.imageUrl} alt={product.name} className="img-fluid" />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
      
    </>
  );
}

export default App;
