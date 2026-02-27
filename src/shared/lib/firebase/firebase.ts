/* eslint-disable no-console */
// src/lib/firebase.ts
import { initializeApp } from "firebase/app";
import { getMessaging, getToken } from "firebase/messaging";

import { env } from "@/core";

const firebaseConfig = {
  apiKey: "AIzaSyCkim4moSpmQ1645MyT3NWjj5A11esXI9w",
  authDomain: "book-store-app-4e96b.firebaseapp.com",
  projectId: "book-store-app-4e96b",
  storageBucket: "book-store-app-4e96b.firebasestorage.app",
  messagingSenderId: "847592073138",
  appId: "1:847592073138:web:22e069d365338a5c7626ab",
  measurementId: "G-EHLPJEY90Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Messaging
export const messaging = getMessaging(app);

export const fetchToken = async () => {
  try {
    const permission = await Notification.requestPermission();
    if (permission === "granted") {
      const token = await getToken(messaging, {
        vapidKey: env.firebaseVapkeyId
      });
      return token;

    } else {
      console.log("Notification permission denied");
      return null;
    }
  } catch (error) {
    console.error("An error occurred while retrieving token:", error);
    return null;
  }
};