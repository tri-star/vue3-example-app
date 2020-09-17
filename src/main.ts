import { createApp } from 'vue'
import App from './App.vue'
import {route} from './routes'
import { ServiceProvider } from './ServiceProvider'

const app = createApp(App).use(route)
ServiceProvider.boot(app)

app.mount('#app')
