var profile = document.querySelector('.profile');
var hide = document.querySelector('#hide');



var view = document.querySelector('.dash-img').addEventListener('click', displayprofile);
function displayprofile(){
    console.log('12345')
    profile.style.display = 'unset'
    setTimeout(() => profile.style.transform = 'translateX(0%)', 100)
}
hide.addEventListener('click',closeprofile)
function closeprofile(){
    profile.style.transform = 'translateX(100%)';
    setTimeout(() => profile.style.display = 'none', 100)
}

