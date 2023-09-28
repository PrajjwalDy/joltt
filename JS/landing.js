const signinbtn = document.getElementById('signinbtn');
const signupbtn = document.getElementById('signupbtn');

signinbtn.addEventListener("click",(e)=>{
    e.preventDefault();
    window.location.href = "loginpage.html";
})

signupbtn.addEventListener("click",(e)=>{
    e.preventDefault();
    window.location.href = "signup.html";
})