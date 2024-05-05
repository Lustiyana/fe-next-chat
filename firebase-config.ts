// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import "firebase/database";
import { getDatabase, ref, onValue, get, child } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC976U6dPNvL0JSu8UL7dQWfuTfvu34GWU",
  authDomain: "chatbot-c0517.firebaseapp.com",
  databaseURL:
    "https://chatbot-c0517-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "chatbot-c0517",
  storageBucket: "chatbot-c0517.appspot.com",
  messagingSenderId: "595284718306",
  appId: "1:595284718306:web:9a3b2fa975c9ebfe9f64bb",
  measurementId: "G-B7RVCCW6HG",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const dbRef = ref(database);
export const getValue = (roomId: string) =>
  get(child(dbRef, `chats/${roomId}`))
    .then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        console.log("No data available");
      }
    })
    .catch((error) => {
      console.error(error);
    });

export const chatRef = ref(database, "chats");

export const onGetValue = onValue(chatRef, (snapshot) => {
  const data = snapshot.val();
  // console.log(data);
  return data;
});
