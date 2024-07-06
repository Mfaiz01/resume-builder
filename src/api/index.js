import { collection, doc, onSnapshot, orderBy, query, setDoc } from "firebase/firestore";
import { auth, db } from "../config/firebase.config";

export const getUserDetail = async () => {
  return new Promise((resolve, reject) => {
    const authUnsubscribe = auth.onAuthStateChanged((userCred) => {
      if (userCred) {
        const userData = userCred.providerData[0];

        const userDocUnsubscribe = onSnapshot(doc(db, "users", userData?.uid), (_doc) => {
          if (_doc.exists()) {
            resolve(_doc.data());
          } else {
            setDoc(doc(db, "users", userData?.uid), userData).then(() => {
              resolve(userData);
            }).catch((error) => {
              reject(error);
            });
          }
        });

        // Ensure cleanup of the Firestore listener
        return userDocUnsubscribe;
      } else {
        reject(new Error("User is not authenticated"));
      }

      // Make sure to unsubscribe from the auth listener to prevent memory leaks
      authUnsubscribe();
    });
  });
};

export const getTemplates = () => {
  return new Promise((resolve, reject) => {
    const templateQuery = query(
      collection(db, "templates"),
      orderBy("timestamp", "asc")
    );
    const unsubscribe = onSnapshot(templateQuery, (querySnapshot) => {
      const templates = querySnapshot.docs.map((doc) => doc.data());
      resolve(templates);
    }, reject);

    // Ensure cleanup of the Firestore listener
    return unsubscribe;
  });
};
