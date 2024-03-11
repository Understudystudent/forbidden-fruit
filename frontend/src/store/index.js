import {createStore} from 'vuex'
import axios from 'axios'
import sweet from 'sweetalert';
import {useCookies} from 'vue3-cookies'
const { cookies} = useCookies()
import router from '@/router'
import applyToken from '../Service/AuthenticateUser.js'
const forbidden = 'https://forbdden-fruit.onrender.com/'

export default createStore({
    state: {
        users: null,
        user: null,
        items: null,
        item: null
    },
    getters: {},
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
                const { msg, token} = await (await axios.post(`${forbidden}users/register`, payload)).data;
                // console.log(`await, this is coming from index.js register  `+ msg)
                if (token) {
                    // console.log(`message after result index.js`+ msg)
                    // context.commit('setUser', {
                    //     msg,
                          
                    // });
                    // cookies.set('userAuthenticated', {
                    //     msg,
                    //     token
                    // });
                    // applyToken(token);
                    context.dispatch('fetchUsers');
                    sweet({
                        title: 'Registration',
                        text: msg,
                        icon: 'success',
                        timer: 2000,
                    });
                    router.push('/login');
                } else {
                    sweet({
                        title: 'info',
                        text: "Backend store information message",
                        icon: 'info',
                        timer: 2000,
                    });
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
            try {
                let {
                    results
                } = (await axios.get(`${forbidden}users`)).data
                if (results) {
                    context.commit('setUsers', results)
                }
            } catch (e) {
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
            try {
                let {
                    result
                } = (await axios.get(`${forbidden}users/${payload.id}`)).data
                if (result) {
                    context.commit('setUser', result)
                } else {
                    sweet({
                        title: 'Retrieving a single user',
                        text: 'User was not found',
                        icon: "info",
                        timer: 2000
                    })
                }
            } catch (e) {
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
            try {
                let {
                    msg
                } = await axios.patch(`${forbidden}users/update/${payload.id}`)
                if (msg) {
                    context.dispatch('fetchUsers')
                    sweet({
                        title: 'Update user',
                        text: msg,
                        icon: "success",
                        timer: 2000
                    })
                }
            } catch (e) {
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
            try {
                let {
                    msg
                } = await axios.delete(`${forbidden}users/${payload.id}`)
                if (msg) {
                    context.dispatch('fetchUsers')
                    sweet({
                        title: 'Delete user',
                        text: msg,
                        icon: "success",
                        timer: 2000
                    })
                }
            } catch (e) {
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
            try {
                const {
                    msg,
                    token,
                    results
                } = (await axios.post(`${forbidden}users/login`, payload)).data
                if (token) {
                    context.commit('setUser', {
                        msg,
                        results
                    })
                    cookies.set('userAuthenticated', {
                        msg,
                        token,
                        results
                    })
                    // check the name
                    applyToken(token)
                    sweet({
                        title: msg,
                        text: `Welcome back, 
                         ${results?.firstName} ${results?.lastName}`,
                        icon: "success",
                        timer: 2000
                    })
                    router.push({
                        name: 'home'
                    })
                } else {
                    sweet({
                        title: 'info',
                        text: msg,
                        icon: 'info',
                        timer: 2000,
                    });
                }
            } catch (e) {
                console.error('Error during login:', e);
                sweet({
                    title: 'Error',
                    text: 'Failed to login.',
                    icon: 'error',
                    timer: 2000,
                });
            }
        },
        // fetch all items
        async fetchItems(context) {
            try {
                let {
                    results
                } =
                (await axios.get(`${forbidden}items`)).data
                if (results) {
                    context.commit('setItems', results)
                }
            } catch (e) {
                sweet({
                    title: 'Error',
                    text: 'An error occurred when retrieving items.',
                    icon: "error",
                    timer: 2000
                })
            }
        },
        // fetch single item
        async fetchItem(context, payload) {
            try {
                let {
                    result
                } = (await axios.get(`${forbidden}items/${payload.id}`)).data
                if (result) {
                    context.commit('setItem', result)
                } else {
                    sweet({
                        title: 'Retrieving a single item',
                        text: 'Item was not found',
                        icon: "info",
                        timer: 2000
                    })
                }
            } catch (e) {
                sweet({
                    title: 'Error',
                    text: 'A item was not found.',
                    icon: "error",
                    timer: 2000
                })
            }
        }
    },
    modules: {}
})