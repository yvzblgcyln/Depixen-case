import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  addDoc,
  updateDoc,
  serverTimestamp,
  deleteDoc,
  query,
  where,
} from "firebase/firestore/lite";
import { getDownloadURL, ref as storageRef, uploadBytes, getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const storage = getStorage();

// get
export const getReq = async (collectionName) => {
  try {
    const response = await getDocs(collection(db, collectionName));
    return response.docs.map((doc) => doc.data());
  } catch (error) {}
};

// add
export const addReq = async (collectionName, data) => {
  if (data === null) return;
  try {
    const docRef = await addDoc(collection(db, collectionName), data);
    await updateDoc(doc(db, collectionName, docRef.id), {
      id: docRef.id,
      timestamp: serverTimestamp(),
    });
    return true;
  } catch (error) {}
};

// update
export const updateReq = async (collectionName, id, data) => {
  if (data === null) return;
  try {
    await updateDoc(doc(db, collectionName, id), data);
    return true;
  } catch (error) {}
};

// delete
export const deleteReq = async (collectionName, id) => {
  try {
    await deleteDoc(doc(db, collectionName, id));
    return true;
  } catch (error) {}
};

// filter single option
export const filterReq = async (collectionName, filter) => {
  if (filter === null) return;
  try {
    const response = await getDocs(query(collection(db, collectionName), where(filter.field, "==", filter.value)));
    return response.docs.map((doc) => doc.data());
  } catch (error) {}
};

// filter multi options
export const filterMultiReq = async (collectionName, filters) => {
  if (filters === null) return;
  try {
    const queryConditions = filters.map((filter) => where(filter.field, "==", filter.value));
    const response = await getDocs(query(collection(db, collectionName), ...queryConditions));
    return response.docs.map((doc) => doc.data());
  } catch (error) {}
};

// add file
export const uploadFile = async (file, collectioName) => {
  if (file === null) return;
  try {
    const snapshot = await uploadBytes(storageRef(storage, `${collectioName}/${file.name}`), file);
    return await getDownloadURL(snapshot.ref);
  } catch (error) {}
};
