import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue'
import Login from './components/Login/LoginPage.vue';
import UserManagement from './components/UserManagement.vue';
import HomePage from './components/Home/HomePage.vue';

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
app.mount('#app')
