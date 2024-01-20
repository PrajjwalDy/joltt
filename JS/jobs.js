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

  const jobsContainer = document.getElementById('jobsContainer');
  //Option Objects
  const homePage = document.getElementById('homePage');
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

function itemOnClickListner(jobs){
    window.open(jobs.jobLink);
  }

function loadJobs(){
    const jobsRef = ref(db,'Jobs');

  onValue(jobsRef, (snapshot) => {
    jobsContainer.innerHTML = ''; // Clear previous content

    snapshot.forEach((childSnapshot) => {
      const job = childSnapshot.val();
      const jobCard = document.createElement('div');
      jobCard.classList.add('jobs-card');

      // Create elements for the job card
      const jobName = document.createElement('h6');
      jobName.classList.add('jobName');
      jobName.textContent = job.jobTitle || 'Job Name';

      const companyName = document.createElement('p');
      companyName.classList.add('companyName');
      companyName.textContent = job.jobCompany || 'Company Name';

      // Additional job details
      const details = [
        { icon: 'resource/img/placeholder.png', text: job.jobLocation || 'Location' },
        { icon: 'resource/img/rupee.png', text: job.jobSalary || 'Salary' },
        { icon: 'resource/img/suitcase.png', text: job.jobExperience || 'Experience' },
        { icon: 'resource/img/pencil.png', text: job.jobSkills || 'Skills' },
      ];

      details.forEach((detail) => {
        const detailView = document.createElement('div');
        detailView.classList.add('hz-view');

        const icon = document.createElement('img');
        icon.classList.add('icons');
        icon.src = detail.icon;

        const info = document.createElement('span');
        info.classList.add('info');
        info.textContent = detail.text;

        detailView.appendChild(icon);
        detailView.appendChild(info);
        jobCard.appendChild(detailView);
      });

      // Add click event listener to each job card
      jobCard.addEventListener('click', () => {
        itemOnClickListner(job);
      });

      // Append the job card to the container
      jobsContainer.appendChild(jobCard);
    });
  });
}


//Function Calls
loadJobs();
