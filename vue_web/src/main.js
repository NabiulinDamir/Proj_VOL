
import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router'
import App from './App.vue'
import Aura from '@primevue/themes/aura';
import PrimeVue from 'primevue/config';

import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import FloatLabel from 'primevue/floatlabel';



const app = createApp(App)
const pinia = createPinia()

app
    .use(router)
    .use(pinia)
    .use(PrimeVue, {
    theme: {
        preset: Aura,
        options:{
            prefix: 'p',
            darkModeSelector: false,
            cssLayer: false,
        },
        cssLayer:{
            name: 'primevue',
            order: 'tailwind-base, primevue, tailwind-utilities'
        }
    }})
    .component('InputText', InputText)
    .component('Password', Password)
    .component('FloatLabel', FloatLabel)
;


app.mount('#app')

