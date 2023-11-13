import { initializeApp } from "firebase/app";
import{ getFirestore, getStorage } from 'firebase/storage'


const firebaseConfig = {
  apiKey: "AIzaSyCwXbw5B6U9qp2eHUu10QOKh_GmiRhxkDU",
  authDomain: "dashboard-http-676f6.firebaseapp.com",
  databaseURL: "https://dashboard-http-676f6-default-rtdb.firebaseio.com",
  projectId: "dashboard-http-676f6",
  storageBucket: "dashboard-http-676f6.appspot.com",
  messagingSenderId: "627209844146",
  appId: "1:627209844146:web:a4a047b55f1756685fa0ab"
};

const app = initializeApp(firebaseConfig);
export const deleteObject = getStorage(app).deleteObject;
export const storage= getStorage(app)