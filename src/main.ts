import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
	apiKey: "apikey",
	authDomain: "authDomain",
	projectId: "projectId",
	storageBucket: "storageBucket",
	messagingSenderId: "messagingSenderId",
	appId: "appId",
	measurementId: "measurementId"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const analytics = getAnalytics(firebaseApp);
const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
