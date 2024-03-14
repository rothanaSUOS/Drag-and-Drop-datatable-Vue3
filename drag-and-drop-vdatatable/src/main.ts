import './assets/main.css'
import '@mdi/font/css/materialdesignicons.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vuetifyPlugin from './plugins/Vuetify'

const app = createApp(App)

app.use(router)
app.use(vuetifyPlugin)

app.mount('#app')
