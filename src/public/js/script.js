let password = document.getElementById('password');
let validaPass = false;

let confirmPassword = document.getElementById('confirmPassword');
let validaConfimPass = false;

let msgEquals = document.getElementById('msgEquals')
let msgcharacters = document.getElementById('msgcharacters')
// desativar mensagem de alerta
const message = document.querySelector(".alert");
setTimeout(() => {
    message.style.display = "none"
}, 2000);
//
// desativar mensagem de alerta
const messageBootstrap = document.querySelector(".message");
setTimeout(() => {
    messageBootstrap.style.display = "none"
}, 2000);
document.addEventListener('DOMContentLoaded', 
function () {window.setTimeout(document.querySelector('img')
.classList.add('animated'),1000);})


confirmPassword.addEventListener('keyup', ()=> {
    if (password.value !=  confirmPassword.value ){
        confirmPassword.setAttribute('style', 'border-color: red')
        msgEquals.innerText = 'As senhas devem ser iguais.'
        msgEquals.style.color = "red"
        validaConfimPass = false;
    }else{
        msgEquals.innerText = 'As senhas devem ser iguais.';
        msgEquals.setAttribute('style','color:green')
        password.setAttribute('style', 'color: black')
        validaConfimPass = true; 
    }

});
password.addEventListener('keyup', ()=> {
    if (password.value.length <= 5  ){
        password.setAttribute('style', 'border-color: red')
        msgcharacters.innerText = ' No mínimo 6 Caracteres.'
        msgcharacters.style.color = "red"
        validaPass = false;
    
    }else{
        msgcharacters.innerHTML = 'No mínimo 6 Caracteres..'
        password.setAttribute('style', 'color: green')
        msgcharacters.style.color = "green"
        validaPass = true;
    }
});