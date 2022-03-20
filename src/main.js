import { createApp } from 'vue'
import App from './App.vue'
import './index.css';
import { store } from '/@store/index.js'
import { router } from './router/router';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.esm.js';


const app = createApp(App);
app.use(store);
app.use(router);    
app.mount('#app');
