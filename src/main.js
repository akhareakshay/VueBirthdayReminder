import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue'
import Login from './components/Login/LoginPage.vue';
import UserManagement from './components/UserManagement.vue';
import HomePage from './components/Home/HomePage.vue';
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
import  cors from 'cors';


const routes = [
    {
        path: '/', component: Login
    },
    {
        path: '/SignUp', component: UserManagement
    },
    {
        path: '/home', component: HomePage
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes
})
const app = createApp(App)
app.use(router)
app.use(bootstrap)
app.use(cors)
app.mount('#app')
