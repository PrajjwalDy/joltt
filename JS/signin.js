import { initializeApp} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
// import { getAnalytics } from "firebase/analytics";
// import {getDatabase} from "firebase/database";
import { getAuth, signInWithEmailAndPassword  } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js";

const firebaseConfig = {
    apiKey: "AIzaSyAe4gVjFgLjqVxu12dCaqn-UHzKwGT9pgU",
    authDomain: "cunow-2fcfa.firebaseapp.com",
    databaseURL: "https://cunow-2fcfa-default-rtdb.firebaseio.com",
    projectId: "cunow-2fcfa",
    storageBucket: "cunow-2fcfa.appspot.com",
    messagingSenderId: "264576983495",
    appId: "1:264576983495:web:b9157b50654bb4e06679e2",
    measurementId: "G-766ZLGP6PE"
  };

    const email = document.getElementById("userEmail");
    const password = document.getElementById("userPassword");

    const signInbtn = document.getElementById('signinbtn-mv')


    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);

    var currentUser = null;

    const signIn = document.getElementById("signinbtn");

    signIn.addEventListener("click",(e) =>{
        e.preventDefault();
        signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential)=>{
            currentUser = userCredential.user.uid;
            localStorage.setItem('currentUserUid',currentUser);
            window.location.href = "homepage.html";
        })
    });

    signInbtn.addEventListener("click",(e) =>{
        e.preventDefault();
        signInWithEmailAndPassword(auth, email.value, password.value)
        .then((userCredential)=>{
            currentUser = userCredential.user.uid;
            localStorage.setItem('currentUserUid',currentUser);
            window.location.href = "homepage.html";
        })
    })