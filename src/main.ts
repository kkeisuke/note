import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'

import '@/styles/tailwind.scss'

// setup DB
import '@/repository/NoteRepositoryProvider'

createApp(App).mount('#app')
