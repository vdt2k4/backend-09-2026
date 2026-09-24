import { Product } from "./product.ts"
export class ShoppingCart {
    private items: {
        product: Product;
        quantity: number
    }[] = [];

    addToCart(product: Product, quantity: number): void {
        const existingItem = this.items.find(item => item.product.id === product.id);
        if (existingItem) {
            existingItem.quantity += quantity;
        } else {
            this.items.push({ product, quantity });
        }
    }
    getTotalPrice(): number {
        return this.items.reduce((total, item) => {
            return total + item.product.price * item.quantity
        }, 0)
    }
}