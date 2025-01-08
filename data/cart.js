const cart = [];

function addToCart(productId) {
  let matchingItem;

  cart.forEach((cartItem) => {
    if (cartItem.productId === productId) {
      matchingItem = cartItem;
      return;
    }
  });

  const quantitySelector = document.querySelector(
    `.js-quantity-selector-${productId}`,
  );
  const quantity = parseInt(quantitySelector.value);

  if (matchingItem) {
    matchingItem.quantity += quantity;
  } else {
    cart.push({
      productId: productId,
      quantity: quantity,
    });
  }
}

export { cart, addToCart };
