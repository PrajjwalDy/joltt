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

//Menu------------------------------------------------
  const exploreWeb = document.getElementById('explore-web');

  var exploreMenu = document.getElementById('explore-menuh');

  const jobsContainer = document.getElementById('jobsContainer');
  //Option Objects
  const homePage = document.getElementById('home');
  const schemesPage = document.getElementById('schemesPage');
  const confessionRoom = document.getElementById('confessionRoom');
  const coursePage = document.getElementById('coursePage');




  //Web Clicks

  homePage.addEventListener('click',(e)=>{
    e.preventDefault();
    window.location.href = "homepage.html"
  })

  confessionRoom.addEventListener('click', (e)=>{
    e.preventDefault();
    window.location.href = "confessionRoom.html";
  });

  schemesPage.addEventListener('click', (e)=>{
    e.preventDefault();
    window.location.href = "schemes.html";
  });

  exploreWeb.addEventListener('click', (e) => {
    e.preventDefault();
    
    if(getComputedStyle(exploreMenu).display === "none"){
        exploreMenu.style.display = "flex";
      } else {
        exploreMenu.style.display = "none";
      }
    
});

function createInternCard(data) {
    const internCard = document.createElement('div');
    internCard.classList.add('intern-card');

    const title = document.createElement('p');
    title.classList.add('internship-title');
    title.textContent = data.internTitle; // Assuming 'title' is the key for internship title in your database

    const firm = document.createElement('p');
    firm.classList.add('internship-firm');
    firm.textContent = data.iOffered; // Assuming 'firm' is the key for firm name in your database

    const type = document.createElement('p');
    type.classList.add('internship-type');
    type.textContent = data.iLocation; // Assuming 'type' is the key for internship type in your database

    const detailsContainer = document.createElement('div');
    detailsContainer.classList.add('intern-details');

    // Creating and appending details elements
    const details = [
        { title: 'Start Date', key: 'iStart' },
        { title: 'Duration', key: 'iDuration' },
        { title: 'Stipend', key: 'iStipend' }
    ];

    details.forEach(detail => {
        const detailContainer = document.createElement('div');
        detailContainer.classList.add('int-dCont');

        const detailHead = document.createElement('div');
        detailHead.classList.add('dHead');

        const detailTitle = document.createElement('p');
        detailTitle.classList.add('dTitle');
        detailTitle.textContent = detail.title;

        const detailText = document.createElement('p');
        detailText.classList.add('dText');
        detailText.textContent = data[detail.key]; // Assuming keys like 'startDate', 'duration', 'stipend'

        detailHead.appendChild(detailTitle);
        detailContainer.appendChild(detailHead);
        detailContainer.appendChild(detailText);
        detailsContainer.appendChild(detailContainer);
    });

    internCard.appendChild(title);
    internCard.appendChild(firm);
    internCard.appendChild(type);
    internCard.appendChild(detailsContainer);

    return internCard;
}

function loadInternshipsFromFirebase() {
    const internContainer = document.getElementById('internContainer');
    const internRef = ref(db,'Internships') // Replace with your database path

    onValue(internRef, (snapshot) => {
        snapshot.forEach((childSnapshot) => {
            const data = childSnapshot.val();
            const internCard = createInternCard(data);
            internContainer.appendChild(internCard);
        });
    }, (error) => {
        console.error(error);
    });
}

loadInternshipsFromFirebase();