import store from './store.js'

import DashView from './components/Dash.vue'
import LoginView from './components/Login.vue'
import NotFoundView from './components/404.vue'

// Import Views - Dash
import DashboardView from './components/dash/Dashboard.vue'
import Page from './components/dash/Page.vue'
import Settings from './components/dash/Settings.vue'
import Menus from './components/dash/Menus.vue'
import MenuEditor from './components/dash/MenuEditor.vue'
import Galleries from './components/dash/Galleries.vue'
import GalleryEditor from './components/dash/GalleryEditor.vue'
import Events from './components/dash/Events.vue'
import EventEditor from './components/dash/EventEditor.vue'

// Routes
const routes = [
  {
    path: '/login',
    component: LoginView
  }, {
    path: '/admin',
    component: DashView,
    auth: true,
    beforeEnter: ((to, from, next) => {
      if(!store.getters.isInitialized){
        store.dispatch('init', {})
            .then( () => {
              next()
            }, () => {
              next()
            })
      }
      next()
    }),
    children: [
      {
        path: '',
        component: DashboardView,
        name: 'Dashboard',
        meta: {description: 'Overview of environment'}
      },
      {
        path: 'page/:id',
        component: Page,
        name: 'Page editor',
        meta: {description: 'Edit the content on your page'}
      },
      {
        path: 'settings',
        component: Settings,
        name: 'Settings',
        meta: {description: 'Alter the site settings'}
      },
      {
        path: 'menus',
        component: Menus,
        name: 'Menus',
        meta: {description: 'Add, edit and delete menus'}
      },
      {
        path: 'menus/:id',
        component: MenuEditor,
        name: "Menu Editor",
        meta: {description: 'Edit your menu'}
      },
      {
        path: 'galleries',
        component: Galleries,
        name: 'Galleries',
        meta: {description: 'Your galleries'}
      },
      {
        path: 'galleries/:id',
        component: GalleryEditor,
        name: 'Gallery Editor',
        meta: {description: 'Edit your gallery'}
      },
      {
        path: 'events',
        component: Events,
        name: "Events",
        meta: {description: 'Your Events'}
      },
      {
        path: 'events/:id',
        component: EventEditor,
        name: 'Event Editor',
        meta: {description: 'Edit your event'}
      }
    ]
  }, {
    // not found handler
    path: '*',
    component: NotFoundView
  }
]

export default routes
