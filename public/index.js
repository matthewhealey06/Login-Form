const form = document.getElementById('form')
let username = document.getElementById('username')
let password = document.getElementById('password')
const rememberMe = document.getElementById('rememberMe')
const submit = document.getElementById('submit')
const errorMsg = document.getElementById('error-message')

const savedUser = JSON.parse(localStorage.getItem('savedUser'))
if(savedUser){
    username.value = savedUser.username
    password.value = savedUser.password
}
submit.addEventListener('click', (e) => {
    const usernameValue = username.value
    const passwordValue = password.value
    const storedUser = JSON.parse(localStorage.getItem('user'))

    if(usernameValue === storedUser.username && passwordValue === storedUser.password){
        window.location.href = 'welcome.html'
        if(rememberMe.checked){
            const savedUser = {
                username: usernameValue,
                password: passwordValue
            }
        localStorage.setItem('savedUser', JSON.stringify(savedUser))
        }
        else{
            localStorage.removeItem('savedUser')
        }
    }
    else{
        errorMsg.textContent = 'Incorrect Username Or Password'
    }
})
