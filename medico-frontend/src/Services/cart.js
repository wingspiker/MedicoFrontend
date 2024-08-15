import CryptoJS from 'crypto-js';
import { decodeToken } from './auth';

const user = decodeToken();
const keys = Object.keys(user??{});
let email = ''
if(keys.length)
email = user[keys.find((k) => k.endsWith("emailaddress"))];

const CART_KEY = btoa(email);

const SECRET_KEY = 'qrf6r4gweifsgbesgrt5dg3sv54'; // Use a strong, unique key for encryption

export const cart = loadCart();

export const cartLength = () => {
    return loadCart().length;
};

export const addProductToCart = (product) => {
    const ifExists = cart.findIndex(
        (c) => c.prodId === product.prodId && c.batchId === product.batchId
    );
    if (ifExists === -1) {
        cart.push(product);
    } else {
        cart[ifExists].quantity += product.quantity;
    }
    saveCart();
};

export const deleteProductFromCart = (prodId, batchId) => {
    const index = cart.findIndex(c => (c.batchId === batchId && c.prodId === prodId));
    if (index !== -1) {
        cart.splice(index, 1);
    }
    saveCart();
};

function saveCart() {
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(cart), SECRET_KEY).toString();
    localStorage.setItem(CART_KEY, encryptedData);
}

export function saveMyCart(myCart) {
    // console.log(myCart);
    const encryptedData = CryptoJS.AES.encrypt(JSON.stringify(myCart), SECRET_KEY).toString();
    localStorage.setItem(CART_KEY, encryptedData);
    // console.log("Cart saved to localStorage:", cart);
}

export function loadCart() {
    const encryptedData = localStorage.getItem(CART_KEY);
    if (encryptedData) {
        const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        // console.log("Cart loaded from localStorage:", decryptedData);
        return decryptedData;
    }
    return [];
}

export function emptyCart() {
    saveMyCart([]);
}
