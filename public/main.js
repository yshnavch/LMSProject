const chat1 = document.querySelector('#one')
const chat2 = document.querySelector('#two')
const chat3 = document.querySelector('#three')
const chat4 = document.querySelector('#four')
const chat5 = document.querySelector('#five')
const typing = document.querySelector('#dots')
const head = document.querySelector('.heading')
var regi = document.querySelector('#reg').addEventListener('click', responsereg);
function responsereg(){
    chat5.innerHTML = "Alright! Let's register"
    chat5.style.display = 'unset'
    
    
}
var login = document.querySelector('#login').addEventListener('click', responselogin);
function responselogin(){
    chat5.innerHTML = "Alright! Let's login"
    chat5.style.display = 'block'
    
}

setTimeout(() =>{
    //typing.style.display = 'flex';
    head.style.transform = 'translateY(0px)';
    head.style.opacity = '1';
},1000)

setTimeout(() =>{
    typing.style.display = 'flex';

},2000)


setTimeout(() =>{
    chat1.style.display = 'block';
    typing.style.display = 'none';
},3000)
setTimeout(() =>{
    chat2.style.display = 'block';
},4000)
setTimeout(() =>{
    chat3.style.display = 'block';
},5000)
setTimeout(() =>{
    chat4.style.display = 'block';
},6000)


//chat1.style.display = 'block';