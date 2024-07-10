import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getAuth } from 'https://www.gstatic.com/firebasejs/10.12.3/firebase-auth.js'
import { getDatabase } from 'https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js'

const firebaseConfig = {
    apiKey: "AIzaSyBqhJHZhAk3CO7DkEpv_mq5XU7UkzGbI3U",
    authDomain: "cadastroziontek.firebaseapp.com",
    projectId: "cadastroziontek",
    storageBucket: "cadastroziontek.appspot.com",
    messagingSenderId: "807410554549",
    appId: "1:807410554549:web:dbba7b66859cfc3a9190fc"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app)
const database = getDatabase(app)

export { app, auth, database }
