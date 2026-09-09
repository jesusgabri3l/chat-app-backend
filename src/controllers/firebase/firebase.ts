import { initializeApp } from 'firebase/app';
import {
  collection,
  getFirestore,
  doc,
  getDoc,
  setDoc,
  addDoc,
  getDocs,
  query,
  orderBy,
  Timestamp,
} from 'firebase/firestore';

export type GoogleUser = {
  googleId: string;
  givenName: string;
  email: string;
};

export type ChatMessage = Record<string, unknown> & { time: string };

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};

initializeApp(firebaseConfig);
const firestore = getFirestore();

const users = collection(firestore, 'users');
const messages = collection(firestore, 'messages');

const addUser = async (user: GoogleUser) => {
  try {
    await setDoc(doc(users, user.googleId), {
      id: user.googleId,
      name: user.givenName,
      email: user.email,
    });
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};

export const addMessage = async (message: ChatMessage) => {
  try {
    await addDoc(messages, {
      ...message,
      timeStamp: Timestamp.fromDate(new Date(message.time)),
    });
  } catch (e) {
    console.error(e);
  }
};

export const getMessages = async () => {
  try {
    const q = query(messages, orderBy('timeStamp'));
    const messagesSnapShot = await getDocs(q);
    const messagesArr: unknown[] = [];
    messagesSnapShot.forEach((d) => messagesArr.push(d.data()));
    return messagesArr;
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const checkUser = async (user: GoogleUser) => {
  const userRef = doc(firestore, 'users', user.googleId);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) await addUser(user);
};
