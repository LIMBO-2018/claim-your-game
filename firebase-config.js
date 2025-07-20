// firebase-config.js

const firebaseConfig = {
  apiKey: "AIzaSyBLHRnFtECe0vY3yiES4ZBzRrHYivkNsHc",
  authDomain: "claimyourgames-122c6.firebaseapp.com",
  projectId: "claimyourgames-122c6",
  storageBucket: "claimyourgames-122c6.appspot.com",
  messagingSenderId: "987221975249",
  appId: "1:987221975249:web:b8c70b8d65fdba9ed065f0",
  measurementId: "G-7TJH50ZNL0"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Firebase services references
const auth = firebase.auth();
const db = firebase.firestore();
