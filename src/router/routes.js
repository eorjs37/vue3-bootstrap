import Home from '/@components/Home.vue';
import Profile from '/@components/Profile.vue';
import Application from '/@components/Application.vue';
import Admin from '/@components/Admin.vue';
import Edit from '/@components/Edit.vue';
import NotFound from '/@components/NotFound.vue';

const routes = [
    { path: '/', redirect: '/home' },
    { path: '/home', name: 'home', component: Home},
    { path: '/profile', name: 'profile', component: Profile},
    { path: '/application', name: 'application', component: Application },
    { path: '/admin', name: 'admin', component: Admin },
    { path: '/edit', name: 'edit', component: Edit },
    { path: '/:pathMatch(.*)*', component: NotFound },
]

export default routes;