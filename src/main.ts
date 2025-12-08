import App from '@/App.vue';
import i18n from '@/i18n';
import router from '@/router';
import { createPinia } from 'pinia';
import { registerSW } from 'virtual:pwa-register';
import { createApp } from 'vue';
import ToastPlugin from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-default.css';

const app = createApp(App);
const pinia = createPinia();

registerSW({
  immediate: true,
});

app.use(pinia);
app.use(router);
app.use(i18n);
app.use(ToastPlugin);
app.mount('#app');
