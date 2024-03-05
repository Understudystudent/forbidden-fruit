import { createStore } from 'vuex'
import axios from 'axios'
import sweet from 'sweetalert'
import { useCookies } from 'vue3-cookies'
const {cookies} = useCookies()
import router from '@/router'
import AuthenticateUser from '../Service/AuthenticateUser.js'
const onlyWater = 'https://forbdden-fruit.onrender.com/'

export default createStore({
  state: {
    users: null,
    user: null,
    products: null,
    product: null
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
    setProducts(state, value) {
      state.products = value
    },
    setProduct(state, value) {
      state.product = value
    },
  },
  actions: {
    // register

    async register(context, payload) {
      try {
        let { msg } = (await axios.post(`${onlyWater}users/register`, payload)).data;
        if (msg) {
          context.dispatch('fetchUsers');
          sweet({
            title: 'Registration',
            text: msg,
            icon: "success",
            timer: 2000
          });
          router.push({ name: 'login' });
        }
      } catch (e) {
        sweet({
          title: 'Error',
          text: 'Please try again later',
          icon: "error",
          timer: 2000
        });
      }
    },
    // fetch a Mulitple User
    async fetchUsers(context) {
      try{
        let {results} = (await axios.get(`${onlyWater}users`)).data
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
        let {result} = (await axios.get(`${onlyWater}users/${payload.id}`)).data
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
        let {msg} = await axios.patch(`${onlyWater}users/update/${payload.id}`)
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
        let {msg} = await axios.delete(`${onlyWater}/users/delete/${payload.id}`)
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
       const {msg, token, result} = (await axios.post(`${onlyWater}users/login`, payload)).data 
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
      }catch(e) {
        sweet({
          title: 'Error',
          text: 'Failed to login.',
          icon: "error",
          timer: 2000
        })
      }
      

    },
    // Fetch Product
    async fetchProducts(context) {
      try{
        let {results} = 
        (await axios.get(`${onlyWater}products`)).data
        if(results) {
          context.commit('setProducts', results)
        }
      }catch(e) {
        sweet({
          title: 'Error',
          text: 'An error occurred when retrieving products.',
          icon: "error",
          timer: 2000
        }) 
      }
    },
    // Fetch Products
    async fetchProduct(context, payload) {
      try{
        let {result} = (await axios.get(`${onlyWater}products/${payload.id}`)).data
        if(result) {
          context.commit('setProduct', result)
        }else {
          sweet({
            title: 'Retrieving a single product',
            text: 'Product was not found',
            icon: "info",
            timer: 2000
          }) 
        }
      }catch(e) {
        sweet({
          title: 'Error',
          text: 'A product was not found.',
          icon: "error",
          timer: 2000
        }) 
      }
    },
    // Add Product
    async addProduct(context, payload) {
      try {
        let { msg } = (await axios.post(`${onlyWater}products/addProduct`, payload));
        if (msg) {
          context.dispatch('fetchProducts');
          sweet({
            title: 'Product Added',
            text: msg,
            icon: "success",
            timer: 2000
          });
        }
      } catch (e) {
        sweet({
          title: 'Error',
          text: 'Failed to add product. Please try again later.',
          icon: "error",
          timer: 2000
        });
      }
    },
     // Delete Product
     async deleteProduct(context, payload) {
      try {
        const { msg } = await axios.delete(`${onlyWater}products/delete/${payload.id}`);
        // if (msg) {
          context.dispatch('fetchProducts');
          sweet({
            title: 'Delete Product',
            text: msg,
            icon: 'success',
            timer: 2000,
          });
        // }
      } catch (error) {
        console.error(error);
        sweet({
          title: 'Error',
          text: 'Failed to delete product. Please try again later.',
          icon: 'error',
          timer: 2000,
        });
      }
    },
    // Update Product
async updateProduct(context, payload) {
  try {
    let { msg } = await axios.patch(`${onlyWater}/products/update/${payload.id}`, payload);
    if (msg) {
      context.dispatch('fetchProducts');
      sweet({
        title: 'Update Product',
        text: msg,
        icon: "success",
        timer: 2000
      });
    }
  } catch (e) {
    sweet({
      title: 'Error',
      text: 'An error occurred when updating a product.',
      icon: "error",
      timer: 2000
    });
  }
},

  },
  modules: {
  }
})