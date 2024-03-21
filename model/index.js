import { Users } from "./Users.js";
import { Items } from "./Item.js";
import {Carts} from "./Cart.js";

// Create objects
let users = new Users()
let items = new Items()
let carts = new Carts();

export{
    users, 
    items,
    carts
}