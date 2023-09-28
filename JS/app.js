import { initializeApp} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import { getDatabase, ref , set} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js";
// import { getAnalytics } from "firebase/analytics";
import { getAuth, createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.6.6/firebase-auth.js";



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


  const name = document.getElementById("fullNameUser");
  const email = document.getElementById("userEmail");
  const password = document.getElementById("userPassword");
  const phone = document.getElementById("userPhone");

  const signUp = document.getElementById("signupbtn");


  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);

  var currentUser = null;

  const signin = document.getElementById('signin-txt');

  signUp.addEventListener("click", (e) => {

    e.preventDefault();
    var obj ={
      name: name.value,
      email: email.value,
      password: password.value,
      phone: phone.value
    }
    createUserWithEmailAndPassword(auth, obj.email, obj.password)
  .then((userCredential)=>{
    currentUser = userCredential.user.uid;
    localStorage.setItem('currentUserUid',currentUser);
    savedata(obj)
  })
  .catch((error)=>{
    const errorCode = error.code;
    const errorMsg = error.message;
    alert(errorMsg);
  });
  });

  function savedata(obj){
    var name = obj.name;
    var email = obj.email;
    var password = obj.password;
    var phone = obj.phone;

   const db = getDatabase();

   set(ref(db, 'Users/'+currentUser),{
    fullName: name,
    ID: email,
    password: password,
    phone: phone,
    profielImage:"https://firebasestorage.googleapis.com/v0/b/cunow-2fcfa.appspot.com/o/user.png?alt=media&token=af6c2872-edb2-4d9b-ac62-2b61cefc8ad1",
    verification:false,
    firstVist:true,
    private:false,
    confessionVisited:true
   })
   .then(()=>{
    window.location.href = "userdetails.html";
   })
   .catch((error)=>{
    alert("error ="+ error);
   })
  }

  signin.addEventListener("click",()=>{
    window.location.href = "loginpage.html";
  })



