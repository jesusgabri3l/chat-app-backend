import { cert, getApps, initializeApp } from 'firebase-admin/app';
import { getFirestore, Timestamp } from 'firebase-admin/firestore';

export type GoogleUser = {
  googleId: string;
  givenName: string;
  email: string;
};

export type ChatMessage = Record<string, unknown> & { time: string };

if (getApps().length === 0) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
  });
}

const firestore = getFirestore();
const users = firestore.collection('users');
const messages = firestore.collection('messages');

const addUser = async (user: GoogleUser) => {
  try {
    await users.doc(user.googleId).set({
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
    await messages.add({
      ...message,
      timeStamp: Timestamp.fromDate(new Date(message.time)),
    });
  } catch (e) {
    console.error(e);
  }
};

export const getMessages = async () => {
  try {
    const snapshot = await messages.orderBy('timeStamp').get();
    return snapshot.docs.map((doc) => doc.data());
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const checkUser = async (user: GoogleUser) => {
  try {
    const userSnap = await users.doc(user.googleId).get();
    if (!userSnap.exists) await addUser(user);
  } catch (e) {
    console.error('Error checking user: ', e);
  }
};
