import { auth } from "./firebaseConfig.js"
import { signInWithEmailAndPassword, onAuthStateChanged, signOut } from 'https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js'

document.addEventListener('DOMContentLoaded', () => {
    const formLogin = document.querySelector('.form-login')
    const inputEmail = document.querySelector('.input-email')
    const inputSenha = document.querySelector('.input-senha')
    const linkEntrar = document.querySelector('.link-entrar')
    const linkSair = document.querySelector('.link-sair')
    const linkCadastro = document.querySelector('.link-cadastro')
    // const usuario = user.currentUser



    if(formLogin) {
        formLogin.addEventListener('submit', (e) => {
            e.preventDefault()
            const email = inputEmail.value
            const password = inputSenha.value

            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user
                    alert('Logado com sucesso')
                    window.location.replace('index.html')
                })
                .catch((error) => {
                    alert(`Erro ${error.code} - ${error.message}`)
                })
        })
    }

    onAuthStateChanged(auth, (user) => {
        if (user) {
            const uid = user.uid
            const userEmail = user.email;
            if (linkEntrar) linkEntrar.classList.add('hide')
            if (linkSair) linkSair.classList.remove('hide')
            if (linkCadastro) linkCadastro.classList.remove('hide')
        } else {
            if (linkEntrar) linkEntrar.classList.remove('hide')
            if (linkSair) linkSair.classList.add('hide')
            if (linkCadastro) linkCadastro.classList.add('hide')
        }
    })

    if(linkSair) {
        linkSair.addEventListener('click', () => {
            signOut(auth)
        })
    }

})