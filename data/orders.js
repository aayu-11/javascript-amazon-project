export const orders = JSON.parse(localStorage.getItem("orders")) || [];

export function addOrder(order) {
  orders.unshift(order);
  saveToLocalStorage();
  console.log(orders);
}

export function getOrder(orderId) {
  let matchingOrder;
  orders.forEach((order) => {
    if (order.id === orderId) {
      matchingOrder = order;
    }
  });
  return matchingOrder;
}

function saveToLocalStorage() {
  localStorage.setItem("orders", JSON.stringify(orders));
}
