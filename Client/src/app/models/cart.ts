export interface Cart {
    id: number;
    buyerid: number;
    cartItems: CartItem[];
}

export interface CartItem {
    productname: string;
    price: number;
    quantity: number;
    pictureurl: string
    cartid: number;
}