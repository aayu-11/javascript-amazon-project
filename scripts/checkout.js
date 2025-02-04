import { renderCheckoutHeader } from "./checkout/checkoutHeader.js";
import { renderOrderSummary } from "./checkout/orderSummary.js";
import { renderPaymentSummary } from "./checkout/paymentSummary.js";
import { loadProductsFetch } from "../data/products.js";
import { loadCart } from "../data/cart.js";
// import "../data/cart-class.js";
// import "../data/car.js";
// import "../data/backend-practice.js";

async function loadPage() {
  console.log("loadPage");
  try {
    // throw new Error("Error loading page");
    await loadProductsFetch();
    await new Promise((resolve, reject) => {
      // throw new Error("Error loading page");
      loadCart(() => {
        // reject("Error loading cart");
        resolve();
      });
    });
  } catch (error) {
    console.log(error);
  }

  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
  return "value2";
}

loadPage().then((value) => {
  console.log("Page loaded");
  console.log(value);
});

/*
Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart(() => {
      resolve();
    });
  }),
]).then((values) => {
  console.log(values);
  renderCheckoutHeader();
  renderOrderSummary();
  renderPaymentSummary();
});
*/

// loadProducts(() => {
//   loadCart(() => {
//     renderCheckoutHeader();
//     renderOrderSummary();
//     renderPaymentSummary();
//   });
// });
