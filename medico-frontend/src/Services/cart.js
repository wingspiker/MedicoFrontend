// export const cart = [];

// export const cartLength = () => {
//     return cart.length
// }

// export const addProductToCart = (product) => {
//     // console.log('thid thid');
//     // console.log(product);
//   const ifExists = cart.findIndex(
//     (c) => c.prodId === product.prodId && c.batchId === product.batchId
//   );

//   if (ifExists === -1) {
//     // console.log('enter if');
//     cart.push(product);
//   } else {
//     cart[ifExists].quantity += product.quantity;
//     // console.log('enter else');
//     // console.log(ifExists);
//   }
//   console.log(cart);
// };

// export const deleteProductFromCart = (prodId, batchId) => {
//   const index = cart.findIndex(c=>(c.batchId===batchId && c.prodId===prodId))
//   if(index!==-1){
//     cart.splice(index,1)
//   }
//   console.log("hhhhh");
//   console.log(cart);
      
// };


import CryptoJS from 'crypto-js';

const CART_KEY = 'encryptedCart';
const SECRET_KEY = 'qrf6r4gweifsgbesgrt5dg3sv54'; // Use a strong, unique key for encryption

export const cart = loadCart();

export const cartLength = () => {
    return cart.length;
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
    console.log("Cart saved to localStorage:", cart);
}

function loadCart() {
    const encryptedData = localStorage.getItem(CART_KEY);
    if (encryptedData) {
        const bytes = CryptoJS.AES.decrypt(encryptedData, SECRET_KEY);
        const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        console.log("Cart loaded from localStorage:", decryptedData);
        return decryptedData;
    }
    return [];
}
