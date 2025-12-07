import axios from 'axios';
import { registerSW } from 'virtual:pwa-register';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router';

registerSW({
  immediate: true,
});

axios.defaults.withCredentials = true;

createApp(App).use(router).mount('#app');
