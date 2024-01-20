import { initializeApp} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import { getDatabase, ref , onValue, get} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js";


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

  //Menu
  const exploreWeb = document.getElementById('explore-web');

  var exploreMenu = document.getElementById('explore-menuh');

  const schemeContainer = document.getElementById('schemContainer');
  //Option Objects
  const homePage = document.getElementById('homePage');
  const jobsPage = document.getElementById('jobsPage');
  const confessionRoom = document.getElementById('confessionRoom');
  const coursePage = document.getElementById('coursePage');


  //WEB CLICKS
  homePage.addEventListener('click',(e)=>{
    e.preventDefault();
    window.location.href = "homepage.html"
  })

  confessionRoom.addEventListener('click', (e)=>{
    e.preventDefault();
    window.location.href = "confessionRoom.html";
  });

  jobsPage.addEventListener('click', (e)=>{
    e.preventDefault();
    window.location.href = "jobs.html";
  });



  exploreWeb.addEventListener('click', (e) => {
    e.preventDefault();
    
    if(getComputedStyle(exploreMenu).display === "none"){
      exploreMenu.style.display = "flex";
    } else {
      exploreMenu.style.display = "none";
    }
    
});


function itemOnClickListner(scheme){
  window.open(scheme.schemeLink);
}

function createGrid(){
  const schemesRef = ref(db,'GovtSchemes');

  onValue(schemesRef, (snapshot) => {
    schemeContainer.innerHTML = ''; // Clear previous content

    snapshot.forEach((childSnapshot) => {
      const scheme = childSnapshot.val();
      const schemeCard = document.createElement('div');
      schemeCard.classList.add('scheme-card');

      // Create elements for each scheme and set their content
      const schemeImage = document.createElement('img');
      schemeImage.classList.add('scheme-image');
      schemeImage.src = scheme.schemeImage || 'resource/img/default_image.png'; // Replace 'default_image.png' with your default image

      const schemeName = document.createElement('h5');
      schemeName.classList.add('scheme-name');
      schemeName.textContent = scheme.schemeName || 'Scheme Name';

      const governmentName = document.createElement('h6');
      governmentName.classList.add('government-name');
      governmentName.textContent = scheme.schmeBy || 'Government';

      // Append elements to the scheme card
      schemeCard.appendChild(schemeImage);
      schemeCard.appendChild(schemeName);
      schemeCard.appendChild(governmentName);

      // Append the scheme card to the container
      schemeCard.addEventListener('click',()=>{
        itemOnClickListner(scheme);
      })
      schemeContainer.appendChild(schemeCard);

      
    });
  });
}


//Functions Call
createGrid();
