
const { initializeApp } = require('firebase/app');
const {
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
} = require('firebase/firestore');

const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID,
};
// eslint-disable-next-line
const firebaseApp = initializeApp(firebaseConfig);
const firestore = getFirestore();

const users = collection(firestore, 'users');
const messages = collection(firestore, 'messages');

const addUser = async (res: any) => {
  try {
    await setDoc(doc(users, res.googleId), {
      id: res.googleId,
      name: res.givenName,
      email: res.email,
    });
  } catch (e) {
    console.error('Error adding document: ', e);
  }
};
const addMessage = async (res: any) => {
  try {
    await addDoc(messages, {
      ...res,
      timeStamp: Timestamp.fromDate(new Date(res.time)),
    });
  } catch (e: any) {
    console.log(e);
  }
};

const getMessages = async () => {
    try{
      const q = query(messages, orderBy('timeStamp'));
        const messagesSnapShot = await getDocs(q);
        const messagesArr: any = [];
        messagesSnapShot.forEach((doc: any) => messagesArr.push(doc.data()));
        return messagesArr;
    }catch(e){
        console.log(e);
        return null;
    }
};

const checkUser = async (res: any) => {
  const userRef = doc(firestore, 'users', res.googleId);
  const userSnap = await getDoc(userRef);
  if (!userSnap.exists()) addUser(res);
};

module.exports = { firebaseApp, firestore, checkUser, addMessage, getMessages };
