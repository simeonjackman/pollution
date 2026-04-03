import { createApp } from 'vue'
import { createRouter, createWebHistory } from 'vue-router'
import './style.css'
import App from './App.vue'
import IntroductionView from './views/IntroductionView.vue'
import DataUploaderView from './views/DataUploaderView.vue'
import DataAnalysisView from './views/DataAnalysisView.vue'

const routes = [
    { path: '/', redirect: '/introduction' },
    { path: '/introduction', name: 'introduction', component: IntroductionView },
    { path: '/data-uploader', name: 'data-uploader', component: DataUploaderView },
    { path: '/data-analysis', name: 'data-analysis', component: DataAnalysisView },
    { path: '/:pathMatch(.*)*', redirect: '/introduction' },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

createApp(App).use(router).mount('#app')
