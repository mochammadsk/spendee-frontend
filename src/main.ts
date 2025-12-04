import '@/assets/css/main.css';
import ui from '@nuxt/ui/vue-plugin';
import { registerSW } from 'virtual:pwa-register';
import { createApp } from 'vue';
import App from './App.vue';
import router from './router/index';

const app = createApp(App);

registerSW({
  immediate: true,
});

app.use(router);
app.use(ui);

app.mount('#app');
