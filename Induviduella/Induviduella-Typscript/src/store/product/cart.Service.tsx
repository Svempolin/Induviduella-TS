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

const addToCart = async (cartData: Omit<CartItem, 'cartItemId'>): Promise<CartItem> => {
  const collectionRef = collection(db, 'cart');
  const docRef = await addDoc(collectionRef, cartData);

  if (!docRef.id) throw new Error('Something went wrong');

  console.log(docRef);
  return { ...cartData, cartItemId: docRef.id,};
};


const getCart = async (): Promise<CartItem[]> => {
  const colRef = collection(db, "cart");
  const querySnapshot = await getDocs(colRef);
  console.log("query",querySnapshot);
  const cart: CartItem[] = [];
  querySnapshot.forEach((doc) => {
    cart.push({ cartItemId: doc.id, ...doc.data() } as CartItem);
  });

  return cart;
};

const updateCartItem = async (cartData: CartItem): Promise<CartItem> => {
  const { cartItemId, ...data } = cartData;
  const cartRef = doc(db, 'cart', cartItemId);

  await updateDoc(cartRef, data);

  return { ...cartData };
  
};

const removeFromCart = async (cartId: string): Promise<string> => {
  const cartRef = doc(db, 'cart', cartId);
  await deleteDoc(cartRef);

  return cartId;
};

const clearCart = async (): Promise<void> => {
  const cartRef = collection(db, 'cart');
  const querySnapshot = await getDocs(cartRef);

  querySnapshot.forEach(async (doc) => {
    await deleteDoc(doc.ref);
  });
}

const cartService = {
  addToCart,
  getCart,
  removeFromCart,
  updateCartItem,
  clearCart,
};

export default cartService;
