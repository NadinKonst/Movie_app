const emailInput = document.querySelector('#email_input');
const passInput = document.querySelector('#pass_input');
const warningMessage = document.querySelector('.warning');
const loginBtn = document.querySelector('.form__btn');



function checkInputs(){
    if(emailInput.value.trim() ==="" || passInput.value.trim() === ""){
        warningMessage.textContent = 'Пожалуйста, заполните все поля'
    } else{
        warningMessage.textContent = ''
        checkUser();
    }
}

async function checkUser(){
    try{
        const resp = await fetch('http://localhost:3001/userData');
        const data = await resp.json();
        const getUsers = data.find(item => item.email === emailInput.value && item.password == passInput.value)
        if(!getUsers){
            warningMessage.textContent = 'Логин или пароль введен неверно'
        } else{
            warningMessage.textContent = ''
            window.localStorage.setItem('user', emailInput.value);
            window.location.href = './profile-page.html';
        }
    }catch(error){
        console.error(error);
    }
}



loginBtn.addEventListener('click', function(event){
    event.preventDefault();
    checkInputs();
})