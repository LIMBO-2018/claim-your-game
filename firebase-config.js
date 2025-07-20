<script type="module">
  // Import the functions you need from the SDKs you need
  import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";
  import { getAnalytics } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-analytics.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  const firebaseConfig = {
    apiKey: "AIzaSyBLHRnFtECe0vY3yiES4ZBzRrHYivkNsHc",
    authDomain: "claimyourgames-122c6.firebaseapp.com",
    projectId: "claimyourgames-122c6",
    storageBucket: "claimyourgames-122c6.firebasestorage.app",
    messagingSenderId: "987221975249",
    appId: "1:987221975249:web:b8c70b8d65fdba9ed065f0",
    measurementId: "G-7TJH50ZNL0"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);
  const analytics = getAnalytics(app);
</script>