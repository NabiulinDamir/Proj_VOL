
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './app/providers/router.js'
import App from './app/App.vue'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

import Aura from '@primevue/themes/aura';
import PrimeVue from 'primevue/config';

import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import FloatLabel from 'primevue/floatlabel';



const app = createApp(App)
const pinia = createPinia()

pinia.use(piniaPluginPersistedstate);

app
    .use(router)
    .use(pinia)
;


app.mount('#app')

