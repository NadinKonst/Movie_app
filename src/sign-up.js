const emailInput = document.querySelector('#email-input');
const passInput = document.querySelector('#pass-input');
const passSecondInput = document.querySelector('#second-pass-input');
const warningMessage = document.querySelector('.warning');
const btn = document.querySelector('.form__btn');



function checkInputs(){
    if(emailInput.value.trim() === '' || passInput.value.trim() === '' || passSecondInput.value.trim() === ''){
        warningMessage.textContent = 'Пожалуйста, заполните все поля';
    }else if(passInput.value.trim().length < 6){
        warningMessage.textContent = 'Пароль должен быть не менее 6 символов';
    } else if(passInput.value.trim() !== passSecondInput.value.trim()){
        warningMessage.textContent = 'Пароли не совпадают';
    } else{
        checkUser()
        warningMessage.textContent = '';
    }
}

async function checkUser(){
    try{
        const resp = await fetch('http://localhost:3001/userData');
        const data = await resp.json();
        const getUsers = data.find(item => item.email === emailInput.value)
        if(!getUsers){
            signUp()
        } else{
            warningMessage.textContent = 'Пользователь с таким email уже зарегистрирован';
        }
    }catch(error){
        console.error(error);
    }
}


function signUp(){
    const userData = {
        "email": emailInput.value,
        "password": passInput.value,
    }
    fetch('http://localhost:3001/userData', {
        method: 'POST',
        body: JSON.stringify(userData),
        headers:{
            'content-type':'application/json;charset=UTF-8'
        }
    })
    .then((res)=>{
        if(res.ok){
            warningMessage.textContent = ''
            window.localStorage.setItem('user', emailInput.value);
            window.location.href = './profile-page.html'
        } else{
            warningMessage.textContent = 'На сервере произошла ошибка, попробуйте еще раз';
        }
    })
    .catch((error)=>{
        console.error(error);
    })
}

btn.addEventListener('click', function(event){
    event.preventDefault();
    checkInputs()
})