import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue'
import Login from './components/Login/LoginPage.vue';
import SignUp from './components/SignUp.vue';
import HomePage from './components/Home/HomePage.vue';
// import 'bootstrap/dist/css/bootstrap.css'
// import 'bootstrap-vue/dist/bootstrap-vue.css'
import bootstrap from 'bootstrap/dist/css/bootstrap.min.css';
// import fontawesome from 'font-awesome/css/font-awesome.css';
import fontawesome from 'font-awesome/css/font-awesome.css';
import fontawesomemin from 'font-awesome/css/font-awesome.min.css';
import vuex from 'vuex';
import cors from 'cors';
import { createStore } from 'vuex'
import CreateBirthday from './components/CreateBirthdays/CreateBirthday.vue'
import EmailTemplates from './components/Templates/EmailTemplates.vue'
import birthdayList from './components/birthdayList/birthdayList.vue'



const routes = [
    {
        path: '/', component: Login
    },
    {
        path: '/SignUp', component: SignUp
    },
    {
        path: '/home', 
        component: HomePage,
        children: [
            {
                path: '/home',
                component: birthdayList,
            },
            {
                path: '/create',
                component: CreateBirthday,
            },
            {
                path: '/template',
                component: EmailTemplates,
            },
        ]
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

// Create a new store instance.
const store = createStore({
    state() {
        return {
            username: "",
            userid: ""
        }
    },
    mutations: {
        getUsername(state, object) {
            state.username = object.username
            state.userid = object.userid
        }
    }
})


const app = createApp(App)
app.use(router)
app.use(store)
app.use(bootstrap)
app.use(cors)
app.use(fontawesome)
app.use(fontawesomemin)
app.use(vuex)
app.mount('#app')
