import Profile from '/@components/Profile.vue';
import NotFound from '/@components/NotFound.vue';

const routes = [
    { path: '/', redirect: '/profile' },
    { path: '/profile', name: 'profile', component: Profile, alias: '/home' },
    { path: '/:pathMatch(.*)*', component: NotFound },
]

export default routes;