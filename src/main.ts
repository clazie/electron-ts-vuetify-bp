import { createApp, type Plugin } from 'vue'

import App from './App.vue'
import '@/assets/styles/index.css'

import {Hello} from './data/anzeigerdata'

console.log('Test')
const hello = new Hello()

const app = createApp(App)

Object.values(
  import.meta.glob<Plugin>('./plugins/*.ts', {
    eager: true,
    import: 'default',
  }),
).forEach((v) => app.use(v))

app.mount('#app')
