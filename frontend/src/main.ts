import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/css/main.scss'
import firebase from 'firebase/app'

const firebaseConfig = {
  apiKey: 'AIzaSyAD1difIuoVd6AHW5tC3FGiQmkBodsIMGU',
  authDomain: 'sohosai-2021-cms.firebaseapp.com',
  projectId: 'sohosai-2021-cms',
  storageBucket: 'sohosai-2021-cms.appspot.com',
  messagingSenderId: '1065736286133',
  appId: '1:1065736286133:web:2d6925461832eb9cca73fc',
}

firebase.initializeApp(firebaseConfig)

if (location.hostname === 'localhost') {
  firebase.auth().useEmulator('http://localhost:9099')
  firebase.firestore().useEmulator('localhost', 8080)
  firebase.functions().useEmulator('localhost', 5001)
}

createApp(App).use(router).mount('#app')
