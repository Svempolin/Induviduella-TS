import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  updateDoc,
  doc,
  DocumentReference,
} from 'firebase/firestore';
import{db} from '../../firebase/firebaseConfig'; // Justera sökvägen till firebaseConfig.js

interface ProductData {
  id: string;
  name: string;
  price: number;
  imageURL: string;
  description: string;
  // Lägg till andra attribut för produkten här
}

const createProduct = async (productData: Omit<ProductData, 'id'>): Promise<ProductData> => {
  const collectionRef = collection(db, 'products');
  const docRef = await addDoc(collectionRef, productData);

  if (!docRef.id) throw new Error('Something went wrong');

  console.log(docRef);
  return { id: docRef.id, ...productData };
};


const getAllAsync = async (col: string): Promise<ProductData[]> => {
  const colRef = collection(db, col);
  const querySnapshot = await getDocs(colRef);

  const products: ProductData[] = [];
  querySnapshot.forEach((doc) => {
    products.push({ id: doc.id, ...doc.data() } as ProductData);
  });

  return products;
};

const updateProduct = async (productData: ProductData): Promise<void> => {
  const { id, ...data } = productData;
  const productRef = doc(db, 'products', id);

  await updateDoc(productRef, data);
};

const deleteProduct = async (productId: string): Promise<void> => {
  const productRef = doc(db, 'products', productId);
  await deleteDoc(productRef);
};

const productService = {
  createProduct,
  getAllAsync,
  deleteProduct,
  updateProduct,
};

export default productService;
