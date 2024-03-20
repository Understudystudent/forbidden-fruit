import { createStore } from "vuex";
import axios from "axios";
import sweet from "sweetalert";
import { applyToken } from "../Service/AuthenticateUser.js";
import { useCookies } from "vue3-cookies";
import router from "@/router";

const { cookies } = useCookies();
const forbidden = "https://forbdden-fruit.onrender.com/";

export default createStore({
  state: {
    users: null,
    user: null,
    items: null,
    item: null,
    cartItems: [],
    userData: null,
  },
  getters: {},
  mutations: {
    setUsers(state, value) {
      state.users = value;
    },
    setUser(state, payload) {
      state.user = payload;
    },
    setItems(state, value) {
      state.items = value;
    },
    setItem(state, value) {
      state.item = value;
    },
    setCartItems(state, value) {
      state.cartItems = value;
    },
    setUserData(state, userData) {
      state.userData = userData;
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
          // cookies.set('userData', {
          //     msg,
          //     token
          // });
          // applyToken(token);
          // context.dispatch("fetchUsers");
          sweet({
            title: "Registration",
            text: msg,
            icon: "success",
            timer: 2000,
          });
          //   router.push("/login");
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
          `${forbidden}users/update/${payload.id}`,
          payload
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
          console.log("Login message:", msg);
          console.log("Login token:", token);
          console.log("Login result:", result);

          context.commit("setUser", { msg, result });
          cookies.set("userData", { msg, token, result });

          applyToken(token);

          // Log the userData object
          console.log("User data stored in cookie:", { msg, token, result });

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
        const { token } = context.state.userData;
        const response = await axios.get(`${forbidden}items`, {
          headers: {
            Authorization: ` ${token}`,
          },
        });
        let { results } = response.data;
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
        let { msg } = await axios.post(`${forbidden}items/addItems`, payload);
        // if (msg) {
        context.dispatch("fetchItems");
        sweet({
          title: "Item Added",
          text: msg,
          icon: "success",
          timer: 2000,
        });
        // }
      } catch (error) {
        console.error("Error adding item:", error.response.data); // Log the error message
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
        console.log("Edit button clicked for item:", payload);
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

    async addToCart(context, payload) {
        try {
          console.log("Payload received:", payload); // Log the payload received
          const { token } = context.state.userData; // Get the user's authentication token
      
          const response = await axios.post(`${forbidden}cart/add`, payload, {
            headers: {
              Authorization: `Bearer ${token}` // Include authorization token in headers
            }
          });
      
          // Check response status before further processing
          if (response.status === 200) {
            sweet({
              title: "Add to Cart",
              text: "Item added to cart successfully",
              icon: "success",
              timer: 2000,
            });
            
            // Fetch updated cart items after adding an item
            context.dispatch("fetchCartItems", payload.userID);
          } else {
            console.error("Failed to add item to cart. Unexpected status:", response.status);
            // Handle the error accordingly
          }
        } catch (error) {
          console.error("Error adding item to cart:", error);
          sweet({
            title: "Error",
            text: "Failed to add item to cart. Please try again later.",
            icon: "error",
            timer: 5000,
          });
        }
      },
      
      
      async updateCartItem(context, payload) {
        try {
          const { token } = context.state.userData; 
      
          await axios.patch(`${forbidden}cart/update/${payload.userID}/${payload.itemID}`, payload, {
            headers: {
              Authorization: ` ${token}` 
            }
          });
      
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
      
      async removeCartItem(context, payload) {
        try {
          const { token } = context.state.userData; 
      
          await axios.delete(`${forbidden}cart/remove/${payload.userID}/${payload.itemID}`, {
            headers: {
              Authorization: ` ${token}` 
            }
          });
      
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
      
    async fetchCartItems(context, userID) {
        try {
          const { token } = context.state.userData; 
      
          const response = await axios.get(`${forbidden}cart/${userID}`, {
            headers: {
              Authorization: ` ${token}` 
            }
          });
      
          const cartItems = response.data;
          console.log("Fetched cart items:", cartItems); // Log the fetched cart items
          context.commit("setCartItems", cartItems);
        } catch (error) {
          console.error("Error fetching cart items:", error);
          sweet({
            title: "Error",
            text: "Failed to fetch cart items. Please try again later.",
            icon: "error",
            timer: 2000,
          });
        }
      },
      
    async fetchUserDataFromCookie({ commit }) {
      try {
        const { cookies } = useCookies();
        const userData = cookies.get("userData");
        if (userData) {
          commit("setUserData", userData); // Commit user data to the store
          applyToken(userData.token); // Apply token to Axios headers
        }
      } catch (error) {
        console.error("Failed to fetch user data from cookie:", error);
        // Handle error appropriately
      }
    },
    async getUserData({ commit }) {
      try {
        // Use useCookies to access cookies
        const { cookies } = useCookies();
        // Get the userData object from cookies
        const userData = cookies.get("userData");
        if (userData) {
          // Commit the userData to the store
          commit("setUserData", userData);
        }
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        // Handle error appropriately
      }
    },
  },

  modules: {},
});
