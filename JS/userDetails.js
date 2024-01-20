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


  //Objects
  const male = document.getElementById("male");
  const female = document.getElementById("female");
  const locationProceed = document.getElementById("proceed-location");
  const educationProceed = document.getElementById("proceed-education");

  //Animations
  const elementIn = document.querySelector('.element-in');
  const elementOut = document.querySelector('.element-out');

  //Divs
  const genderDiv = document.getElementById("gender-div");
  const locationDiv = document.getElementById("location-div");
  const educationDev = document.getElementById("education-div");
  const interestDiv = document.getElementById("interest-div");

  const currentUser = localStorage.getItem('currentUserUid');
  var genderMale = false;
  var genderFemale = false;


  male.addEventListener("click", (e)=>{
    genderMale=true ;
    genderDiv.style.display ="none";
    locationDiv.style.display ="flex"; 
    saveData();
  });

  female.addEventListener("click",(e)=>{
    genderFemale= true;
    genderDiv.style.display ="none";
    locationDiv.style.display ="flex";
    saveData();
  });

  locationProceed.addEventListener("click",(e)=>{
    locationDiv.style.display ="none";
    educationDev.style.display ="flex";
    saveData();
  });

  educationProceed.addEventListener("click", (e)=>{
    educationDev.style.display ="none";
    interestDiv.style.display ="flex";
    saveData();
  })

  function saveData(){
    const db = getDatabase();
    set(ref(db,'Users/'+currentUser),{
        male:genderMale,
        female:genderFemale
    })
  }


