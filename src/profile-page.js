const changeAvatarButton = document.querySelector(".divBut");
const imgAvatar = document.querySelector(".cardAvatar");
const email = document.querySelector(".email");
const pass = document.querySelector(".pass");

imgAvatar.addEventListener("mouseover", () => {
    changeAvatarButton.classList.remove("hide");
});
imgAvatar.addEventListener("mouseout", () => {
    changeAvatarButton.classList.add("hide");
});

const now = new Date();
const time = document.getElementById("time");
time.innerHTML = "Current time: " + now.toString();



document.addEventListener("DOMContentLoaded", function(){
    checkUser()
})

async function checkUser(){
    try{
        const resp = await fetch('http://localhost:3001/userData');
        const data = await resp.json();
        const getUsers = data.find(item => item.email === window.localStorage.getItem('user'))
        if(getUsers){
            email.textContent = `Email address: ${getUsers.email}`;
            pass.textContent = `Email address: ${getUsers.password}`;
        } else{
            email.textContent = `Email address:`;
            pass.textContent = `Email address:`;
        }
    }catch(error){
        console.error(error);
    }
}