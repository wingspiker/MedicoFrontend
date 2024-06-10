export const cart = [];

export const cartLength = () => {
    return cart.length
}

export const addProductToCart = (product) => {
    // console.log('thid thid');
    // console.log(product);
  const ifExists = cart.findIndex(
    (c) => c.prodId === product.prodId && c.batchId === product.batchId
  );

  if (ifExists === -1) {
    // console.log('enter if');
    cart.push(product);
  } else {
    cart[ifExists].quantity += product.quantity;
    // console.log('enter else');
    // console.log(ifExists);
  }
  console.log(cart);
};

export const deleteProductFromCart = (prodId, batchId) => {
  const index = cart.findIndex(
    (p) => p.prodId === prodId && p.batchId === batchId
  );
  if (index !== -1) {
    cart.splice(index, 1);
  }
};
