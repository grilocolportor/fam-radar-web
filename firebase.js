 // Import the functions you need from the SDKs you need

 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
 import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-analytics.js";
 import { getFirestore } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js";
 import { collection, getDocs,  doc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-firestore.js"; 
  
 // TODO: Add SDKs for Firebase products that you want to use
 // https://firebase.google.com/docs/web/setup#available-libraries

 // Your web app's Firebase configuration
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
 const firebaseConfig = {
   apiKey: "AIzaSyCPTIAjkP6qFhqw1Y2JkO6YTqsM99uualA",
   authDomain: "fam-radar.firebaseapp.com",
   projectId: "fam-radar",
   storageBucket: "fam-radar.appspot.com",
   messagingSenderId: "644911681418",
   appId: "1:644911681418:web:2e5dfccdc1bf7d8e5fc273",
   measurementId: "G-LZJTPZLG8G"
 };

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
 const analytics = getAnalytics(app);
 const db  = getFirestore(app);

 export {app, analytics, db,  collection, getDocs,  doc, onSnapshot}


