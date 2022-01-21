import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'

import '@/styles/tailwind.css'
import '@/styles/toastui.css'

// setup DB
import { initRepositoryProvider } from '@/repository/NoteRepositoryProvider'
initRepositoryProvider('dexie')

createApp(App).mount('#app')
