import { auth } from "./firebaseConfig.js"
import {signInWithEmailAndPassword, onAuthStateChanged} from 'https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js'

document.addEventListener('DOMContentLoaded',()=>{
    onAuthStateChanged(auth, (user)=>{
        if(!user){
            window.location.href = 'login.html'
        }
    })
})