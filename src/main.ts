import { createApp } from 'vue'
import App from './App.vue'
import { route } from './routes'
import { loadComponents } from './components'
import { ServiceProvider } from './ServiceProvider'

const app = createApp(App).use(route)
ServiceProvider.boot(app)

loadComponents(app)

app.mount('#app')
