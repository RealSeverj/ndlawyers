import { createWebHistory, createRouter } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AboutView from '@/views/About.vue'
import ContactView from '@/views/Contact.vue'
import ArticleDetail from '@/views/ArticleDetail.vue'
import SearchView from '@/views/SearchView.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/about', name: 'About', component: AboutView },
  { path: '/contact', name: 'Contact', component: ContactView },
  { path: '/article/:id', name: 'Article', component: ArticleDetail },
  { path: '/article/category=:category', name: 'ArticleCategory', component: ArticleDetail },
  { path: '/article/search=:search', name: 'ArticleSearch', component: SearchView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
