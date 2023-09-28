import { initializeApp} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import { getDatabase, ref , onValue, set,remove} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js";



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

  const currentuser = localStorage.getItem('currentUserUid');

  var userName1 = document.getElementById('usernameProfile');
  var userProfile1 = document.getElementById('userProfileImage');


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


const homepage = document.getElementById('homepage');


function createConfessionCard(post){

  var confessionId = post.confessionId;

  // Create the confession-card div
const confessionCard = document.createElement('div');
confessionCard.className = 'confession-card';

// Create the publisher-info div
const publisherInfo = document.createElement('div');
publisherInfo.className = 'publisher-info';

// Create the circular image element
const circularImage = document.createElement('img');
circularImage.className = 'circular-image';
circularImage.src = '/resource/img/conf_heart_logo.png';
circularImage.alt = 'heart';

// Create the username paragraph
const username = document.createElement('p');
username.className = 'username';
username.textContent = 'Confessed With Love';

// Append circularImage and username to publisherInfo
publisherInfo.appendChild(circularImage);
publisherInfo.appendChild(username);

// Create the caption paragraph
const caption = document.createElement('p');
caption.className = 'caption';
caption.innerHTML = post.confessionText;

// Append publisherInfo and caption to confessionCard
confessionCard.appendChild(publisherInfo);
confessionCard.appendChild(caption);

// Create the confession-option div
const confessionOption = document.createElement('div');
confessionOption.className = 'confession-option';
// Create the object-image elements for more, comment, and like-heart
const moreImage = document.createElement('img');
moreImage.className = 'object-image';
moreImage.src = '/resource/img/more.png';
moreImage.alt = 'more-option';

const commentImage = document.createElement('img');
commentImage.className = 'object-image';
commentImage.src = '/resource/img/conf_comment.png';
commentImage.alt = 'comment';

const likeHeartImage = document.createElement('img');
likeHeartImage.className = 'object-image';
likeHeartImage.src = '/resource/img/blank_heart.png';
likeHeartImage.alt = 'like-heart';
likeHeartImage.id = `like-confess-${confessionId}`
// Append moreImage, commentImage, and likeHeartImage to confessionOption
confessionOption.appendChild(moreImage);
confessionOption.appendChild(commentImage);
confessionOption.appendChild(likeHeartImage);

// Append confessionCard and confessionOption to a parent element in your HTML (e.g., a div with an ID)
const parentElement = document.getElementById('confession-container');
parentElement.appendChild(confessionCard);
parentElement.appendChild(confessionOption);

likeConfession(confessionId);
isLike(confessionId)

}

function loadConfession(){
  const confessionData = ref(db,'Confession');
  onValue(confessionData, (snapshot)=>{
    const confession = snapshot.val();
    if(confession){
      for(const confessionId in confession){
        const confessionPost = confession[confessionId];
        createConfessionCard(confessionPost);
      }
    }else{
      console.log("No data available");
    }
  });
}

function likeConfession(confessionId){
  const likeButton = document.getElementById(`like-confess-${confessionId}`);
  let clicked = false;

  likeButton.addEventListener('click', (e) => {
    e.preventDefault();
    const likeRef = ref(db, `ConfessionLike/${confessionId}/${currentuser}`);
    if (clicked) {
      remove(likeRef);
      clicked = false;
    } else {
      set(likeRef,true);
      clicked = true;
    }

    isLike(confessionId)
  });
}

function isLike(confessionId){
  const likeButton = document.getElementById(`like-confess-${confessionId}`);
  const likeRef = ref(db, `ConfessionLike/${confessionId}/${currentuser}`);
  onValue(likeRef, (snapshot)=>{
    const data = snapshot.val();
    if(data){
      likeButton.src = '/resource/img/filled_heart.png';
    }else{
      likeButton.src = '/resource/img/blank_heart.png';
    }
  });
}



homepage.addEventListener('click', (e)=>{
    e.preventDefault();
    window.location.href = "homepage.html";
});


getUserDetails();

loadConfession()