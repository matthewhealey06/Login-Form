const form = document.getElementById('form')
let username = document.getElementById('username')
let password = document.getElementById('password')
const rememberMe = document.getElementById('rememberMe')
const submit = document.getElementById('submit')
const errorMsg = document.getElementById('error-message')

submit.addEventListener('click', (e) => {
    const usernameValue = username.value
    const passwordValue = password.value
    const storedUser = JSON.parse(localStorage.getItem('user'))

    if(usernameValue === storedUser.username && passwordValue === storedUser.password){
        window.location.href = 'welcome.html'
    }
    else{
        errorMsg.textContent = 'Username & Password dont match'
    }
})
