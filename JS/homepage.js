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

  //Containers
  const postContainer = document.getElementById('post-container');
  const postContainerMV = document.getElementById('post-container-mv');
  const peopleCardContainer = document.getElementById('people-cardContainer');

  //User Details Variables
  var userName1 = document.getElementById('usernameProfile');
  var userProfile1 = document.getElementById('userProfileImage');
  var userBio = document.getElementById('user-bio');
  var followerCount = document.getElementById('followerCount');
  var followingCount = document.getElementById('followingCount');


  const exploreWeb = document.getElementById('explore-web');

  //MENUS
  var exploreMenu = document.getElementById('explore-menuh');
  
  //options
  const confessionRoom = document.getElementById('confessionRoom');
  const schem = document.getElementById('schemePage');
  const jobs = document.getElementById('jobsPage');
  const course = document.getElementById('coursePage');


  const currentuser = localStorage.getItem('currentUserUid');


  function createPostCard(post) {
    // Create a post card element
    const postCard = document.createElement('div');
    postCard.className = 'post-card';
  
    const publisherId = post.publisher;
    var username = null;
    var profileImage = null; 

    const publisherData = ref(db,'Users/'+publisherId);
    onValue(publisherData, (snapshot)=>{
      const userdata = snapshot.val();
      if(userdata){
        username = userdata.fullName;
        profileImage = userdata.profileImage;

        const publisherInfo = document.createElement('div');
        publisherInfo.className = 'publisher-info';
      
        const circularImage = document.createElement('div');
        circularImage.id = 'circular-image';
      
        const publisherImage = document.createElement('img');
        publisherImage.id = 'publisher-image';
        publisherImage.className = 'publisher-image';
        publisherImage.src = profileImage; // Update with the actual data
      
        const publisherName = document.createElement('h5');
        publisherName.id = 'publisher-name';
        publisherName.innerText =username; // Update with the actual data
      
        // Append elements for publisher info
        circularImage.appendChild(publisherImage);
        publisherInfo.appendChild(circularImage);
        publisherInfo.appendChild(publisherName);
  
    // Create elements for post data
        const postContent = document.createElement('div');
        postContent.className = 'post-data';
      
        const postCaption = document.createElement('p');
        postCaption.id = 'post-caption';
        postCaption.innerText = post.caption; // Update with the actual data
      
        const postImage = document.createElement('img');
        postImage.id = 'postImage';
        postImage.className = 'post-image';
        if(post.iImage){
          postImage.src = post.image;
        }else{
          postImage.style.display = "none";
        }
        // Update with the actual data
      
        // Append elements for post data
        postContent.appendChild(postCaption);
        postContent.appendChild(postImage);
      
        // Append publisher info and post data to the post card
        postCard.appendChild(publisherInfo);
        postCard.appendChild(postContent);
        const postCardClone = postCard.cloneNode(true);
      
        // Append the post card to the post container
        postContainerMV.appendChild(postCard);
        postContainer.appendChild(postCardClone);
      }else{
        console.log("No data available");
      }
    });
    // Create elements for publisher info
        
  }

  function getPosts(){
    const posts = ref(db,'Post');
    onValue(posts, (snapshot)=>{
      const data = snapshot.val();
      if(data){
        Object.keys(data).forEach((postId)=>{
          const post = data[postId];
          createPostCard(post);
        });
      }else{
        console.log("No data available");
      }
    });
  }

  console.log("this is console");

  //NAVIGATION DECLEARAITON FOR MOBILE VIEW BOTTOM-NAV----------------------------------------------

  const home = document.getElementById('nav-home');
  const profile = document.getElementById('nav-profile');
  const notification = document.getElementById('nav-notification');
  const explore = document.getElementById('nav-explore');
  
  explore.addEventListener("click",(e)=>{
    e.preventDefault();
    window.location.href = "explore.html";
  })

  //Function User Details
  function getUserDetails(){
    const user = ref(db,'Users/'+currentuser);
    onValue(user, (snapshot)=>{
      const data = snapshot.val();
      if(data){
        userName1.innerText = data.fullName;
        userProfile1.src = data.profileImage;
        userBio.innerText = data.bio;
      }else{
        console.log("No data available");
      }
    });
  }

  //Function Gettting Follower and following

  function getFollower(){
    const followers = ref(db,'Follow/'+currentuser+'/Followers');
    onValue(followers, (snapshot)=>{
      const data = snapshot.val();
      if(data){
        followerCount.innerText = Object.keys(data).length;
      }else{
        console.log("No data available");
      }
    })
  }

  function getFollowing(){
    const followers = ref(db,'Follow/'+currentuser+'/Following');
    onValue(followers, (snapshot)=>{
      const data = snapshot.val();
      if(data){
        followingCount.innerText = Object.keys(data).length;
      }else{
        console.log("No data available");
      }
    })
  }


  //Loading People
  function createPeopleCard(data){
    const card = document.createElement('div');
    card.classList.add('people-card');

    const img = document.createElement('img');
    img.classList.add('person-pic');
    img.src = data.profileImage; // Assuming 'profilePicUrl' is the key for the image URL in your database
    img.alt = 'person-pic';

    const name = document.createElement('p');
    name.classList.add('person-name');
    name.textContent = data.fullName; // Assuming 'name' is the key for the person's name in your database

    const followBtn = document.createElement('div');
    followBtn.classList.add('follow-btn');
    const btn = document.createElement('p');
    btn.id = 'follow-btn';
    btn.textContent = 'Follow';
    followBtn.appendChild(btn);

    card.appendChild(img);
    card.appendChild(name);
    card.appendChild(followBtn);

    peopleCardContainer.appendChild(card); 
  }

  function getPeople(){
    const people = ref(db,'Users');
    onValue(people, (snapshot)=>{
      const data = snapshot.val();
      if(data){
        Object.keys(data).forEach((uid)=>{
          const userid = data[uid];
          createPeopleCard(userid);
        })
      }
    })
  }

  //Trending----------------------------------------------Trending---------------------------Function----------------

  // Function to load tags from Firebase Realtime Database
function loadTags() {
  const tagList = [];
  const refe = ref(db,'hashtags');

  onValue(refe, (snapshot) => {
      snapshot.forEach((childSnapshot) => {
          const data = childSnapshot.val();
          tagList.push(data);
      });

      // Sort the tagList by postCount
      tagList.sort((a, b) => b.postCount - a.postCount);

      // Accessing the HTML container
      const container = document.querySelector('.trending-container');

      // Clear previous content
      container.innerHTML = '';

      // Loop through tagList and create cards
      tagList.forEach((tag) => {
          const card = document.createElement('div');
          card.classList.add('trending-card');

          const img = document.createElement('img');
          img.classList.add('hash-img');
          img.src = 'resource/img/hashtag.png'; // Set your image URL here
          img.alt = 'image';

          const trendText = document.createElement('p');
          trendText.id = 'trendText';
          trendText.innerText = `${tag.tagName}`; // Assuming 'tag' is the key for hashtag in your database

          const postCount = document.createElement('p');
          postCount.id = 'post-count';
          postCount.innerText = `${tag.postCount} Posts`; // Assuming 'postCount' is the key for post count in your database

          card.appendChild(img);
          card.appendChild(trendText);
          card.appendChild(postCount);

          container.appendChild(card);
      });
  }, (error) => {
      // Handle error
      console.error(error);
  });
}

// Call the function to load tags
loadTags();




  getPosts();
  getUserDetails();
  getFollower();
  getFollowing();
  getPeople();

  //Clicks-----------------------------WEB CLICKS-----------------------------------------------------

  confessionRoom.addEventListener('click', (e)=>{
    e.preventDefault();
    window.location.href = "confessionRoom.html"
  });

  exploreWeb.addEventListener('click', (e) => {
    e.preventDefault();
    
    if(getComputedStyle(exploreMenu).display === "none"){
      exploreMenu.style.display = "flex";
    } else {
      exploreMenu.style.display = "none";
    }
});

schem.addEventListener('click',(e)=>{
  e.preventDefault();
  window.location.href = "schemes.html"
})

jobs.addEventListener('click',(e)=>{
  e.preventDefault();
  window.location.href = "jobs.html"
})


  

  
