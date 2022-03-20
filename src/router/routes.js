import Home from '/@components/Home.vue';
import Profile from '/@components/Profile.vue';
import Application from '/@components/Application.vue';
import NotFound from '/@components/NotFound.vue';

const routes = [
    { path: '/', redirect: '/home' },
    { path: '/home', name: 'home', component: Home},
    { path: '/profile', name: 'profile', component: Profile},
    { path: '/application', name: 'application', component: Application},
    { path: '/:pathMatch(.*)*', component: NotFound },
]

export default routes;