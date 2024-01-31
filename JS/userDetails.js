import { initializeApp} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import { getDatabase, ref , set, update} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js";
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

  const app = initializeApp(firebaseConfig);

  const db = getDatabase(app);
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

  //Inputs 
  const locationInput = document.getElementById("location");
  const college = document.getElementById("college");
  const course = document.getElementById("course");
  const branch = document.getElementById("branch");
  const year = document.getElementById("year");

  const insterest = document.getElementById("interests");
  const experience = document.getElementById("userExpereice");

  const finish = document.getElementById("proceed-interest")

  const currentUser = "bL7302pxMnZwajOOUIKTIDsseM03"; //localStorage.getItem('currentUserUid');
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

  finish.addEventListener("click", (e)=>{
    e.preventDefault();
    alert("Your profile has been created successfully! Please log in to start using the app.");
    window.location.replace("/loginpage.html");
  })





  function saveData(){
    update(ref(db,'Users/'+currentUser),{
        male:genderMale,
        female:genderFemale,
        place: locationInput.value,
        branch: branch.value,
        year: year.value,
        skills:insterest.value,
        experience:experience.value,
        college:college.value,
        course:course.value

    })
  }






