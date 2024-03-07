import { createStore } from 'vuex'
import axios from 'axios'
import sweet from 'sweetalert';
import { useCookies } from 'vue3-cookies'
const {cookies} = useCookies()
import router from '@/router'
import {AuthenticateUser, applyToken} from '../Service/AuthenticateUser.js'
const forbidden = 'https://forbdden-fruit.onrender.com/'

export default createStore({
  state: {
    users: null,
    user: null,
    items: null,
    item: null
  },
  getters: {
  },
  mutations: {
    setUsers(state, value) {
      state.users = value
    },
    setUser(state, value) {
      state.user = value
    },
    setItems(state, value) {
      state.items = value
    },
    setItem(state, value) {
      state.item = value
    },
  },
  actions: {
    // Add User
    async register(context, payload) {
      try {
        let { msg, token } = (await axios.post(`${forbidden}users/register`, payload)).data;
        if (msg && token) {
          // Apply the token
          applyToken(token);
    
          context.dispatch('fetchUsers');
          sweet({
            title: 'Registration',
            text: msg,
            icon: 'success',
            timer: 2000,
          });
          router.push({ name: 'login' });
        }
      } catch (e) {
        sweet({
          title: 'Error',
          text: 'Please try again later',
          icon: 'error',
          timer: 2000,
        });
      }
    },
    
    // fetch a Mulitple User
    async fetchUsers(context) {
      try{
        let {results} = (await axios.get(`${forbidden}users`)).data
        if(results) {
          context.commit('setUsers', results)
        }
      }catch(e) {
        sweet({
          title: 'Error',
          text: 'An error occurred when retrieving users.',
          icon: "error",
          timer: 2000
        }) 
      }
    },
    // fetchsingle Users
    async fetchUser(context, payload) {
      try{
        let {result} = (await axios.get(`${forbidden}users/${payload.id}`)).data
        if(result) {
          context.commit('setUser', result)
        }else {
          sweet({
            title: 'Retrieving a single user',
            text: 'User was not found',
            icon: "info",
            timer: 2000
          }) 
        }
      }catch(e) {
        sweet({
          title: 'Error',
          text: 'A user was not found.',
          icon: "error",
          timer: 2000
        }) 
      }
    },

    // Updating user
    async updateUser(context, payload) {
      try{
        let {msg} = await axios.patch(`${forbidden}users/update/${payload.id}`)
        if(msg) {
          context.dispatch('fetchUsers')
          sweet({
            title: 'Update user',
            text: msg,
            icon: "success",
            timer: 2000
          }) 
        }
      }catch(e) {
        sweet({
          title: 'Error',
          text: 'An error occurred when updating a user.',
          icon: "success",
          timer: 2000
        }) 
      }
    },
    // Deleting user
    async deleteUser(context, payload) {
      try{
        let {msg} = await axios.delete(`${forbidden}users/${payload.id}`)
        if(msg) {
          context.dispatch('fetchUsers')
          sweet({
            title: 'Delete user',
            text: msg,
            icon: "success",
            timer: 2000
          }) 
        }
      }catch(e) {
        sweet({
          title: 'Error',
          text: 'An error occurred when deleting a user.',
          icon: "error",
          timer: 2000
        }) 
      }
    },
    // Login user
    async login(context, payload) {
      try{
       const {msg, token, result} = (await axios.post(`${forbidden}users/login`, payload)).data 
       if(result){
        context.commit('setUser', {msg, result})
        cookies.set('LegitUser', {
          msg, token, result
        })
        AuthenticateUser.applyToken(token)
        sweet({
          title: msg,
          text: `Welcome back, 
          ${result?.firstName} ${result?.lastName}`,
          icon: "success",
          timer: 2000
        })
          router.push({name: 'home'})
        }else {
          sweet({
            title: 'info',
            text: msg,
            icon: "info",
            timer: 2000
          })
        }
      } catch (e) {
        console.error('Error during login:', e);
        sweet({
          title: 'Error',
          text: 'Failed to login.',
          icon: 'error',
          timer: 2000
        });
      }
      
      

    },
    async fetchItems(context) {
      try{
        let {results} = 
        (await axios.get(`${forbidden}items`)).data
        if(results) {
          context.commit('setItems', results)
        }
      }catch(e) {
        sweet({
          title: 'Error',
          text: 'An error occurred when retrieving items.',
          icon: "error",
          timer: 2000
        }) 
      }
    },
    async fetchItem(context, payload) {
      try{
        let {result} = (await axios.get(`${forbidden}items/${payload.id}`)).data
        if(result) {
          context.commit('setItem', result)
        }else {
          sweet({
            title: 'Retrieving a single item',
            text: 'Item was not found',
            icon: "info",
            timer: 2000
          }) 
        }
      }catch(e) {
        sweet({
          title: 'Error',
          text: 'A item was not found.',
          icon: "error",
          timer: 2000
        }) 
      }
    }
  },
  modules: {
  }
})
