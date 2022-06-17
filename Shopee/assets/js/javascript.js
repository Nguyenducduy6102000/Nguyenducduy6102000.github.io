var registerBtn = document.getElementById("btn-register")
var loginBtn = document.getElementById("btn-login")
var modal = document.getElementById("myModal")
modalContainers = document.querySelectorAll(".auth-form")
console.log(modalContainer)
modalRegis = document.getElementById("regis")
modalLogin = document.getElementById("login")

/* Open */
registerBtn.onclick = openModalRegis;
loginBtn.onclick = openModalLogin

modal.addEventListener('click', closeModal)

for (var modalContainer of modalContainers) {
    modalContainer.addEventListener('click', function(event) {
        event.stopPropagation()
    })
}




function openModalRegis() {
    modal.style.display = 'block';
    modalRegis.style.display = 'block';
    modalLogin.style.display = 'none';
}

function openModalLogin() {
    modal.style.display = 'block';
    modalLogin.style.display = 'block';
    modalRegis.style.display = 'none';
}

function closeModal() {
    modal.style.display = 'none';
}


btnVn = document.getElementById('vn')
console.log(btnVn);
btnEng = document.getElementById('eng')
console.log(btnEng);
selected = document.getElementById("language-selected")

function vn() {
    document.getElementById("language-selected").innerHTML = "Tiếng Việt"
}

function en() {
    document.getElementById("language-selected").innerHTML = "English"
}