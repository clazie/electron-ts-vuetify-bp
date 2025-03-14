import { createRouter, createWebHashHistory } from 'vue-router/auto'
import { routes } from 'vue-router/auto-routes'
import { setupLayouts } from 'virtual:meta-layouts'

export default createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes,
  extendRoutes: (routes:any) => setupLayouts(routes),
})
