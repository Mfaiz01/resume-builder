import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import {getStorage} from "firebase/storage"

const firebaseConfig = {
  apiKey: "AIzaSyApU2fvohgTGRMo2bJv5ZFnT0O_5gNgZp4",
  authDomain: "resume-builder-f7f2f.firebaseapp.com",
  databaseURL: "https://resume-builder-f7f2f-default-rtdb.firebaseio.com",
  projectId: "resume-builder-f7f2f",
  storageBucket: "resume-builder-f7f2f.appspot.com",
  messagingSenderId: "760781476559",
  appId: "1:760781476559:web:c8423fad92532ac9425dba",
};

const app = getApps.length > 0 ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export { auth, db, storage };
