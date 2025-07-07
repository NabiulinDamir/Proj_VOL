
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './app/providers/router.js'
import App from './app/App.vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';
const app = createApp(App)
const pinia = createPinia()
pinia.use(piniaPluginPersistedstate);
app
    .use(router)
    .use(pinia)
;
app.mount('#app')

