import { useState, useEffect } from 'react';
import { doc, getDoc, DocumentSnapshot } from 'firebase/firestore';
import { db } from '../firebase/firebaseConfig';

interface DocData {
  id: string;
  name: string;
  price: string;
  imageUrl: string;
  description: string;
  // Define the structure of your document data here
}

interface UseDocResult {
  data: DocData | null;
  error: string | null;
  loading: boolean;
}

const useDoc = (collection: string, id: string): UseDocResult => {
  const [data, setData] = useState<DocData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getDocAsync = async () => {
      setLoading(true);
      const docRef = doc(db, collection, id);

      try {
        const docSnapshot: DocumentSnapshot = await getDoc(docRef);

        if (!docSnapshot.exists()) {
          setLoading(false);
          setError('Could not find document');
          return;
        }

        setData({ id: docSnapshot.id, ...docSnapshot.data() } as DocData);
        setLoading(false);
      } catch (err) {
        setLoading(false);
        setError(err instanceof Error ? err.message : 'Unknown error');
      }
    };

    getDocAsync();
  }, [collection, id]);

  return { data, error, loading };
};

export default useDoc;
