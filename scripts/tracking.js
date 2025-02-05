import { getOrder } from "../data/orders.js";
import { getProduct, loadProductsFetch } from "../data/products.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";

async function loadPage() {
  await loadProductsFetch();

  const url = new URL(window.location.href);
  const orderId = url.searchParams.get("orderId");
  const productId = url.searchParams.get("productId");

  const order = getOrder(orderId);
  const product = getProduct(productId);

  // Get additional details about the product like
  // the estimated delivery time.
  let productDetails;
  order.products.forEach((details) => {
    if (details.productId === product.id) {
      productDetails = details;
    }
  });

  const today = dayjs();
  const orderTime = dayjs(order.orderTime);
  const deliveryTime = dayjs(productDetails.estimatedDeliveryTime);
  const percentageProgress =
    ((today - orderTime) / (deliveryTime - orderTime)) * 100;

  const deliveredMessage =
    percentageProgress >= 100 ? "Delivered on" : "Arriving on";

  const trackingHTML = `
    <a class="back-to-orders-link link-primary" href="orders.html">
      View all orders
    </a>
    <div class="delivery-date">
      ${deliveredMessage} ${dayjs(productDetails.estimatedDeliveryTime).format(
        "dddd, MMMM D",
      )}
    </div>
    <div class="product-info">
      ${product.name}
    </div>
    <div class="product-info">
      Quantity: ${productDetails.quantity}
    </div>
    <img class="product-image" src="${product.image}">
    <div class="progress-labels-container">
      <div class="progress-label ${percentageProgress < 50 ? "current-status" : ""}">
        Preparing
      </div>
      <div class="progress-label ${percentageProgress >= 50 && percentageProgress < 100 ? "current-status" : ""}">
        Shipped
      </div>
      <div class="progress-label ${percentageProgress >= 100 ? "current-status" : ""}">
        Delivered
      </div>
    </div>
    <div class="progress-bar-container">
      <div class="progress-bar" style="width: ${percentageProgress}%"></div>
    </div>
  `;

  document.querySelector(".js-order-tracking").innerHTML = trackingHTML;
}

loadPage();
