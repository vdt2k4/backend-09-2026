import { Product } from "./product.ts";

import { ShoppingCart } from "./cart.ts";

const iPhone = new Product("P01", "iPhone", 1000);
const taiNghe = new Product("P02", "Tai nghe", 100);
const opLung = new Product("P03", "Ốp lưng", 20);

const cart = new ShoppingCart();

cart.addToCart(iPhone, 10);
cart.addToCart(taiNghe, 20);
cart.addToCart(opLung, 50);

cart.addToCart(opLung, 10);

console.log("Tổng số tiền cuối cùng của giỏ hàng: ", cart.getTotalPrice());