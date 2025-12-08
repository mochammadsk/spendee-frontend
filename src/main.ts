import App from '@/App.vue';
import router from '@/router';
import { createPinia } from 'pinia';
import { registerSW } from 'virtual:pwa-register';
import { createApp } from 'vue';

registerSW({
  immediate: true,
});

const pinia = createPinia();

createApp(App).use(pinia).use(router).mount('#app');
