import { createStore } from "vuex";
import axios from "axios";
import sweet from "sweetalert";
import { useCookies } from "vue3-cookies";
const { cookies } = useCookies();
import router from "@/router";
import { applyToken } from "../Service/AuthenticateUser.js";
const forbidden = "https://forbdden-fruit.onrender.com/";

export default createStore({
  state: {
    users: null,
    user: null,
    items: null,
    item: null,
  },
  getters: {},
  mutations: {
    setUsers(state, value) {
      state.users = value;
    },
    setUser(state, value) {
      state.user = value;
    },
    setItems(state, value) {
      state.items = value;
    },
    setItem(state, value) {
      state.item = value;
    },
  },
  actions: {
    // Add User
    async register(context, payload) {
      try {
        const { msg, token } = await (
          await axios.post(`${forbidden}users/register`, payload)
        ).data;
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
          context.dispatch("fetchUsers");
          sweet({
            title: "Registration",
            text: msg,
            icon: "success",
            timer: 2000,
          });
          router.push("/login");
        } else {
          sweet({
            title: "info",
            text: "Please try again later",
            icon: "info",
            timer: 2000,
          });
        }
      } catch (e) {
        sweet({
          title: "Error",
          text: "Please try again later",
          icon: "error",
          timer: 2000,
        });
      }
    },
    // fetch a Mulitple User
    async fetchUsers(context) {
      try {
        let { results } = (await axios.get(`${forbidden}users`)).data;
        if (results) {
          context.commit("setUsers", results);
        }
      } catch (e) {
        sweet({
          title: "Error",
          text: "An error occurred when retrieving users.",
          icon: "error",
          timer: 2000,
        });
      }
    },
    // fetchsingle Users
    async fetchUser(context, payload) {
      try {
        let { result } = (await axios.get(`${forbidden}users/${payload.id}`))
          .data;
        if (result) {
          context.commit("setUser", result);
        } else {
          sweet({
            title: "Retrieving a single user",
            text: "User was not found",
            icon: "info",
            timer: 2000,
          });
        }
      } catch (e) {
        sweet({
          title: "Error",
          text: "A user was not found.",
          icon: "error",
          timer: 2000,
        });
      }
    },
    // Updating user
    async updateUser(context, payload) {
      try {
        let { msg } = await axios.patch(
          `${forbidden}users/update/${payload.id}`
        );
        if (msg) {
          context.dispatch("fetchUsers");
          sweet({
            title: "Update user",
            text: msg,
            icon: "success",
            timer: 2000,
          });
        }
      } catch (e) {
        sweet({
          title: "Error",
          text: "An error occurred when updating a user.",
          icon: "success",
          timer: 2000,
        });
      }
    },
    // Deleting user
    async deleteUser(context, payload) {
      try {
        let { msg } = await axios.delete(
          `${forbidden}users/delete/${payload.id}`
        );
        // if (msg) {
        context.dispatch("fetchUsers");
        sweet({
          title: "User Deleted",
          text: msg,
          icon: "success",
          timer: 2000,
        });
        // }
      } catch (e) {
        sweet({
          title: "Error",
          text: "An error occurred when deleting a user.",
          icon: "error",
          timer: 2000,
        });
      }
    },
    // Login user
    async login(context, payload) {
      try {
        const { msg, token, result } = (
          await axios.post(`${forbidden}users/login`, payload)
        ).data;
        if (result) {
          context.commit("setUser", { msg, result });
          cookies.set("userAuthenticated", { msg, token, result });
          applyToken(token);

          sweet({
            title: msg,
            text: `Welcome, ${result?.firstName} ${result?.lastName}`,
            icon: "success",
            timer: 3000,
          });
          setTimeout(() => {
            window.location.reload();
          });
          router.push({
            name: "home",
          });
        } else {
          sweet({
            title: "info",
            text: msg,
            icon: "info",
            timer: 2000,
          });
        }
      } catch (e) {
        console.error("Error during login:", e);
        sweet({
          title: "Error",
          text: "Failed to login.",
          icon: "error",
          timer: 2000,
        });
      }
    },
    // Fetch all Items
    async fetchItems(context) {
      try {
        let { results } = (await axios.get(`${forbidden}items`)).data;
        if (results) {
          context.commit("setItems", results);
        }
      } catch (e) {
        sweet({
          title: "Error",
          text: "An error occurred when retrieving items.",
          icon: "error",
          timer: 2000,
        });
      }
    },
    // Fetch Single Items
    async fetchItem(context, payload) {
      try {
        let { result } = (await axios.get(`${forbidden}items/${payload.id}`))
          .data;
        if (result) {
          context.commit("setItem", result);
        } else {
          sweet({
            title: "Retrieving a single item",
            text: "Item was not found",
            icon: "info",
            timer: 2000,
          });
        }
      } catch (e) {
        sweet({
          title: "Error",
          text: "A item was not found.",
          icon: "error",
          timer: 2000,
        });
      }
    },
    // Add Item
    async addItem(context, payload) {
      try {
        let { msg } = await axios.post(`${forbidden}items/addItem`, payload);
        if (msg) {
          context.dispatch("fetchItems");
          sweet({
            title: "Item Added",
            text: msg,
            icon: "success",
            timer: 2000,
          });
        }
      } catch (e) {
        sweet({
          title: "Error",
          text: "Failed to add Item. Please try again later.",
          icon: "error",
          timer: 2000,
        });
      }
    },
    // Delete Item
    async deleteItem(context, payload) {
      try {
        const { msg } = await axios.delete(
          `${forbidden}items/delete/${payload.id}`
        );
        // if (msg) {
        context.dispatch("fetchItems");
        sweet({
          title: "Delete Item",
          text: msg,
          icon: "success",
          timer: 2000,
        });
        // }
      } catch (error) {
        console.error(error);
        sweet({
          title: "Error",
          text: "Failed to delete Item. Please try again later.",
          icon: "error",
          timer: 2000,
        });
      }
    },
    // Update Item
    async updateItems(context, payload) {
      try {
        let { msg } = await axios.patch(
          `${forbidden}/items/update/${payload.id}`,
          payload
        );
        if (msg) {
          context.dispatch("fetchItems");
          sweet({
            title: "Update item",
            text: msg,
            icon: "success",
            timer: 2000,
          });
        }
      } catch (e) {
        sweet({
          title: "Error",
          text: "An error occurred when updating a Item.",
          icon: "error",
          timer: 2000,
        });
      }
    },
    // Add item to cart
    async addToCart(context, payload) {
      try {
        await axios.post(`${forbidden}cart/add`, payload);
        // context.dispatch('fetchCartItems');
        sweet({
          title: "Add to Cart",
          text: "Item added to cart successfully",
          icon: "success",
          timer: 2000,
        });
      } catch (error) {
        sweet({
          title: "Error",
          text: "Failed to add item to cart. Please try again later.",
          icon: "error",
          timer: 2000,
        });
      }
    },
    // Fetch cart items
    async fetchCartItems(context, userID) {
      try {
        const response = await axios.get(`${forbidden}cart/${userID}`);
        const cartItems = response.data;
        context.commit('setCartItems', cartItems);
      } catch (error) {
        sweet({
          title: "Error",
          text: "Failed to fetch cart items. Please try again later.",
          icon: "error",
          timer: 2000,
        });
      }
    },
    // Update cart item quantity
    async updateCartItem(context, payload) {
      try {
        await axios.patch(
          `${forbidden}cart/update/${payload.userID}/${payload.itemID}`,
          payload
        );
        // context.dispatch('fetchCartItems');
        sweet({
          title: "Update Cart Item",
          text: "Cart item quantity updated successfully",
          icon: "success",
          timer: 2000,
        });
      } catch (error) {
        sweet({
          title: "Error",
          text: "Failed to update cart item quantity. Please try again later.",
          icon: "error",
          timer: 2000,
        });
      }
    },
    // Remove item from cart
    async removeCartItem(context, payload) {
      try {
        await axios.delete(
          `${forbidden}cart/remove/${payload.userID}/${payload.itemID}`
        );
        // context.dispatch('fetchCartItems');
        sweet({
          title: "Remove from Cart",
          text: "Item removed from cart successfully",
          icon: "success",
          timer: 2000,
        });
      } catch (error) {
        sweet({
          title: "Error",
          text: "Failed to remove item from cart. Please try again later.",
          icon: "error",
          timer: 2000,
        });
      }
    },

    // async fetchAdminUsers(context) {
    //   try {
    //     const { data } = await axios.get(`${forbidden}admin/users`);
    //     context.commit("setAdminUsers", data);
    //   } catch (error) {
    //     console.error("Error fetching admin users:", error);
    //   }
    // },
    // async fetchAdminItems(context) {
    //   try {
    //     const { data } = await axios.get(`${forbidden}admin/items`);
    //     context.commit("setAdminItems", data);
    //   } catch (error) {
    //     console.error("Error fetching admin items:", error);
    //   }
    // },
  },
  modules: {},
});
