import { ComponentPublicInstance, createApp } from 'vue'
import App from './App.vue'
import { route } from './routes'
import { loadComponents } from './components'
import { ServiceProvider } from './ServiceProvider'
import { ErrorHandler } from '@/lib/error-handler/ErrorHandler'

const app = createApp(App).use(route)
ServiceProvider.boot(app)

loadComponents(app)

app.mount('#app')

app.config.errorHandler = (err: unknown, instance: ComponentPublicInstance | null, info: string) => {
  ErrorHandler.fromVueError(err, instance, info)
}
window.addEventListener('error', (event) => {
  ErrorHandler.fromGeneralError(event)
})
window.addEventListener('unhandledrejection', (event) => {
  ErrorHandler.fromPromiseError(event)
})
