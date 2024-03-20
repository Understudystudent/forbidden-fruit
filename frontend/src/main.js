import { createApp } from 'vue';
import App from './App.vue';
import './registerServiceWorker';
import router from './router';
import store from './store';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap';
import { useCookies } from 'vue3-cookies';

const app = createApp(App);

app.use(store);
app.use(router);
app.use(useCookies());

// Dispatch the getUserData action after the store is installed
store.dispatch('getUserData').then(() => {
});

// Mount the app to the DOM
app.mount('#app');
