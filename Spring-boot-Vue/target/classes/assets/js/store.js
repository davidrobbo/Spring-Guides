import Vue from 'vue'
import Vuex from 'vuex'
import event from './event.js'

Vue.use(Vuex)

const state = {
  init: false,
  callingAPI: false,
  searching: '',
  serverURI: 'https://www.robocms.co.uk',
  user: null,
  token: null,
  userInfo: {
    messages: [{1: 'test', 2: 'test'}],
    notifications: [],
    tasks: []
  },
  pages: [],
  settings: [],
  menus: [],
  galleries: [],
  events: []
}

const mutations = {
  TOGGLE_LOADING (state) {
    state.callingAPI = !state.callingAPI
  },
  TOGGLE_SEARCHING (state) {
    state.searching = (state.searching === '') ? 'loading' : ''
  },
  SET_USER (state, user) {
    state.user = user
  },
  SET_TOKEN (state, token) {
    state.token = token
  },
  ADD_PAGE (state, page) {
    state.pages.push(page)
  },
  SET_PAGES (state, pages) {
    state.pages = pages
  },
  SET_SETTINGS (state, settings) {
    state.settings = settings
  },
  UPDATE_SETTING (state, setting) {
      let stateSetting = state.settings.find( ({id}) => {
          return id == setting.id
      })
      if(stateSetting){
          for(let prop in setting){
              stateSetting[prop] = setting[prop]
          }
      }
  },
  SET_MENUS (state, menus) {
    state.menus = menus
  },
  DELETE_MENU (state, {id}){
    const index = state.menus.findIndex((menu) => {
      return id == menu.id
    })
    if(index > -1) {
      state.menus.splice(index, 1)
      event.$emit('message', {
        message: 'Menu deleted',
        text: 'Your menu has successfully been deleted',
        type: 'success'
      })
    }
  },
  ADD_MENU (state, {menu}){
    state.menus.push(menu)
  },
  UPDATE_MENU (state, {menu}){
    const index = state.menus.findIndex( ({id}) => {
      return menu.id == id
    })
    if(index > -1){
      for(let prop in menu){
        Vue.set(state.menus[index], prop, menu[prop])
      }
    }
  },
  SET_GALLERIES(state, galleries){
    state.galleries = galleries
  },
  SET_EVENTS(state, events){
    state.events = events
  },
  DELETE_GALLERY(state, {id}){
    const index = state.galleries.findIndex((g) => {
      return id == g.id
    })
    if(index > -1) {
      state.galleries.splice(index, 1)
      event.$emit('message', {
        message: 'Gallery deleted',
        text: 'Your gallery has successfully been deleted',
        type: 'success'
      })
    }
  },
  SAVE_GALLERY(state, {gallery}){
    state.galleries.push(gallery)
  },
  UPDATE_GALLERY(state, {gallery}){
    const index = state.galleries.findIndex( ({id}) => {
      return gallery.id == id
    })
    if(index > -1){
      for(let prop in gallery){
        Vue.set(state.galleries[index], prop, gallery[prop])
      }
    }
  },
  UPDATE_PAGE(state, {page}){
    const index = state.pages.findIndex( ({id}) => {
      return page.id == id
    })
    if(index > -1){
      for(let prop in page){
        Vue.set(state.pages[index], prop, page[prop])
      }
    }
  },
  DELETE_EVENT(state, {id}){
        const index = state.events.findIndex((g) => {
            return id == g.id
        })
        if(index > -1) {
            state.events.splice(index, 1)
            event.$emit('message', {
                message: 'Event deleted',
                text: 'Your gallery has successfully been deleted',
                type: 'success'
            })
        }
  },
  SAVE_EVENT(state, {event}){
        state.events.push(event)
  },
  UPDATE_EVENT(state, {event}){
        const index = state.events.findIndex( ({id}) => {
            return event.id == id
        })
        if(index > -1){
            for(let prop in event){
                Vue.set(state.events[index], prop, event[prop])
            }
        }
  },


  SAVE_MODEL(state, {model, collectionName}){
    state[collectionName].push(model)
  },
  UPDATE_MODEL(state, {model, collectionName}){
    const index = state[collectionName].findIndex( ({id}) => {
      return model.id == id
    })
    if(index > -1){
      for(let prop in model){
        Vue.set(state[collectionName][index], prop, model[prop])
      }
    }
  },
  DELETE_MODEL(state, {id, collectionName}){
    const index = state[collectionName].findIndex((m) => {
      return id == m.id
    })
    if(index > -1) {
      state[collectionName].splice(index, 1)
      event.$emit('message', {
        message: 'Event deleted',
        text: 'Your gallery has successfully been deleted',
        type: 'success'
      })
    }
  }
}

const actions = {
  updateModel({commit}, {model, modelName, collectionName}){
    return new Promise( (res, rej) => {
      const req = Vue.http.patch(`/api/${collectionName}/${model.id}`, model);
      req.then( ({data}) => {
        res(data)
        if(data.status == 'ok'){
          commit('UPDATE_MODEL', {model: data.model, collectionName: collectionName})
        }
      }, () => {
        rej()
      })
    })
  },
  updateCollection({commit}, data){

  },
  saveModel({commit}, {model, modelName, collectionName}){
    return new Promise( (res, rej) => {
      const req = Vue.http.post(`/api/${collectionName}`, model)
      req.then( ({data}) => {
        res(data)
        if(data.status == 'ok'){
          commit('SAVE_MODEL', {model: data.model, collectionName: collectionName})
        }
      }, () => {
        rej()
      })
    })

  },
  deleteModel({commit}, {id, collectionName}){
    const req = Vue.http.delete(`/api/${collectionName}/${id}`)
    req.then( ({data}) => {
      commit('DELETE_MODEL', {id:id, collectionName: collectionName})
    }, () => {
    })
  },






  updateEvent({commit}, {event}){
        return new Promise( (res, rej) => {
            const req = Vue.http.patch(`/api/events/${event.id}`, event);
            req.then( ({data}) => {
                res(data)
                if(data.status == 'ok'){
                    commit('UPDATE_EVENT', {event: data.event})
                }
            }, () => {
                rej()
            })
        })
  },
  updateGallery({commit}, {gallery}){
    return new Promise( (res, rej) => {
      const req = Vue.http.patch(`/api/galleries/${gallery.id}`, gallery);
      req.then( ({data}) => {
        res(data)
        if(data.status == 'ok'){
          commit('UPDATE_GALLERY', {gallery: data.gallery})
        }
      }, () => {
        rej()
      })
    })
  },
  saveGallery({commit}, {gallery}){
    return new Promise( (res, rej) => {
      const req = Vue.http.post('/api/galleries', gallery)
      req.then( ({data}) => {
        res(data)
        if(data.status == 'ok'){
          commit('SAVE_GALLERY', {gallery: data.gallery})
        }
      }, () => {
        rej()
      })
    })
  },
  deleteGallery({commit}, {id}) {
    const req = Vue.http.delete(`/api/galleries/${id}`)
    req.then( ({data}) => {
      commit('DELETE_GALLERY', {id:id})
    }, () => {
    })
  },
  saveEvent({commit}, {event}){
        return new Promise( (res, rej) => {
            const req = Vue.http.post('/api/events', event)
            req.then( ({data}) => {
                res(data)
                if(data.status == 'ok'){
                    commit('SAVE_EVENT', {event: data.event})
                }
            }, () => {
                rej()
            })
        })
  },
  deleteEvent({commit}, {id}) {
        const req = Vue.http.delete(`/api/events/${id}`)
        req.then( ({data}) => {
            commit('DELETE_EVENT', {id:id})
        }, () => {
        })
  },
  loadGalleries({commit}, data){
    const req = Vue.http.get('/api/galleries')
    req.then( ({data}) => {
      if(data.status == 'ok'){
        commit('SET_GALLERIES', data.galleries)
      }
    }, ()=>{

    })
  },
  saveMenu({commit}, {menu}){
    return new Promise( (res, rej) => {
      const req = Vue.http.post('/api/menus', menu);
      req.then( ({data}) => {
        res(data)
        if(data.status == 'ok'){
          commit('ADD_MENU', {menu: data.menu})
        }
      }, () => {
        rej()
      })
    })
  },
  updateMenu({commit}, data){
    return new Promise( (res, rej) => {
      const req = Vue.http.patch(`/api/menus/${data.menu.id}`, data.menu);
      req.then( ({data}) => {
        res(data)
        if(data.status == 'ok'){
          commit('UPDATE_MENU', {menu: data.menu})
        }
      }, () => {
        rej()
      })
    })
  },
  deleteMenu({commit}, {id}){
    const req = Vue.http.delete(`/api/menus/${id}`)
    req.then( ({data}) => {
      commit('DELETE_MENU', {id:id})
    }, () => {
    })
  },
  loadMenus({commit}, d) {
    const req = Vue.http.get('/api/menus');
    req.then( ({data}) => {
      if (data.status == 'ok') {
        commit('SET_MENUS', data.menus)
      }
    }, () => {

    })
  },
  updatePage({commit}, {page}){
    return new Promise( (res, rej) => {
      const req = Vue.http.patch(`/api/pages/${page.id}`, page)
      req.then( ({data}) => {
        if(data.status == 'ok'){
          res(data)
          commit('UPDATE_PAGE', {page: data.page})
          event.$emit('message', {
            type: 'success',
            message: "Page Saved",
            text: "Your page has successfully been saved"
          })
        } else {
          event.$emit('message', {
            type: 'warning',
            message: "Page unable to be saved",
            text: "Please try again"
          })
        }
      }, () => {
        event.$emit('message', {
          type: 'warning',
          message: "Page unable to be saved",
          text: "Please try again"
        })
      })
    })
  },
  addPage({commit}, {page}) {
    const req = Vue.http.post('/api/pages', page)
    req.then( ({data}) => {
      if(data.status === 'ok'){
        commit('ADD_PAGE', data.page)
        event.$emit('message', {
          type: 'success',
          message: "Page Added",
          text: "Your page has successfully been added"
        })
        event.$emit('redirect', {name: 'Dashboard', params: {}})
      } else {
        event.$emit('message', {
          type: 'warning',
          message: "Page add failed",
          text: "Your page could not be added"
        })
      }
    }, () => {
      event.$emit('message', {
        type: 'warning',
        message: "Page add failed",
        text: "Your page could not be added"
      })
    })
  },
  init({commit}, data){
    const req = Vue.http.get('/api/init')
    req.then( ({data}) => {
      if(data.status == 'ok'){
        commit('SET_PAGES', data.pages)
        commit('SET_SETTINGS', data.settings)
        commit('SET_MENUS', data.menus)
        commit('SET_GALLERIES', data.galleries)
        commit('SET_EVENTS', data.events)
      }
        return new Promise((res, rej) => {
            if(true){
                res()
            }else{
                rej()
            }
        })
    })
  },
  setPages({commit}, {pages}){
     let count = 1
     let newPages = pages.map( (page) => {
         return Object.assign({}, page, {order: count++})
     })
     const req = Vue.http.patch('api/pages/orderupdate', {pages: newPages})
     req.then (({data}) => {
         if(data.status == 'ok'){
             commit('SET_PAGES', newPages)
         }
     }, () => {

     })
  },
  updateSetting({commit}, {setting}){
    const req = Vue.http.patch(`/api/setting/${setting.id}`, setting)
    req.then( ({data}) => {
      if(data.status == 'ok') {
        commit('UPDATE_SETTING', data.setting)
        event.$emit('message', {
          type: 'success',
          message: "Saved",
          text: "Updates completed"
        })
      } else {
        event.$emit('message', {
          type: 'warning',
          message: "Update failed",
          text: "Please try again"
        })
      }
    }, () => {
      event.$emit('message', {
        type: 'warning',
        message: "Update failed",
        text: "Please try again"
      })
    })
  }
}

const getters = {
  isInitialized: state => {
    return state.init
  },
  pages: state => {
    return state.pages
  },
  settings: state => {
    return state.settings
  },
  canNestPages: state => {
    const setting = state.settings.find( (setting) => {
      return setting.name == 'nestPages'
    })
    return typeof setting != 'undefined' && setting.value != '0'
  },
  canOrderMenu: state => {
    const setting = state.settings.find( (setting) => {
      return setting.name == 'reOrderPages'
    })
    return typeof setting != 'undefined' && setting.value != '0'
  },
  menus: state => {
    return state.menus
  },
  galleries: state => {
    return state.galleries
  },
  events: state => {
    return state.events
  }
}

export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
