import { initializeApp} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import { getDatabase, ref , onValue} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js";


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

  //objects
  const postContainer = document.getElementById('post-container');
  const postContainerMV = document.getElementById('post-container-mv');
  var userName1 = document.getElementById('usernameProfile');
  var userProfile1 = document.getElementById('userProfileImage');
  
  //options
  const confessionRoom = document.getElementById('confessionRoom');

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
  

  function getUserDetails(){
    const user = ref(db,'Users/'+currentuser);
    onValue(user, (snapshot)=>{
      const data = snapshot.val();
      if(data){
        userName1.innerText = data.fullName;
        userProfile1.src = data.profileImage;
      }else{
        console.log("No data available");
      }
    });
  }


  getPosts();
  getUserDetails();

  //Clicks

  confessionRoom.addEventListener('click', (e)=>{
    e.preventDefault();
    window.location.href = "confessionRoom.html";
  });

  

  
