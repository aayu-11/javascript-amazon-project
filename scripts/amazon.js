import { addToCart, calculateCartQuantity } from "../data/cart.js";
import { products, loadProductsFetch } from "../data/products.js";

loadProductsFetch(renderProductsGrid);

function renderProductsGrid() {
  let productHtml = "";

  const url = new URL(window.location.href);
  const search = url.searchParams.get("search");

  let filterProducts = products;

  if (search) {
    filterProducts = products.filter((product) => {
      let matchingKeyword = false;
      product.keywords.forEach((keyword) => {
        if (keyword.toLowerCase().includes(search.toLowerCase())) {
          matchingKeyword = true;
        }
      });
      return (
        matchingKeyword ||
        product.name.toLowerCase().includes(search.toLowerCase())
      );
    });
  }

  filterProducts.forEach((product) => {
    productHtml += `
<div class="product-container">
          <div class="product-image-container">
            <img
              class="product-image"
              src="${product.image}"
            />
          </div>

          <div class="product-name limit-text-to-2-lines">${product.name}</div>

          <div class="product-rating-container">
            <img
              class="product-rating-stars"
              src="${product.getStarsUrl()}"
            />
            <div class="product-rating-count link-primary">${product.rating.count}</div>
          </div>

          <div class="product-price">${product.getPrice()}</div>

          <div class="product-quantity-container">
            <select class="js-quantity-selector-${product.id}">
              <option selected value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
            </select>
          </div>
          
          ${product.extraInfoHtml()}

          <div class="product-spacer"></div>

          <div class="added-to-cart js-added-to-cart-${product.id}">
            <img src="images/icons/checkmark.png" />
            Added
          </div>

          <button class="add-to-cart-button button-primary js-add-to-cart" data-product-id="${product.id}">Add to Cart</button>
        </div>

`;
  });

  document.querySelector(".js-search-button").addEventListener("click", () => {
    const search = document.querySelector(".js-search-bar").value;
    window.location.href = `index.html?search=${search}`;
  });

  document
    .querySelector(".js-search-bar")
    .addEventListener("keydown", (event) => {
      if (event.key === "Enter") {
        const search = document.querySelector(".js-search-bar").value;
        window.location.href = `index.html?search=${search}`;
      }
    });

  function updateCartQuantity() {
    const cartQuantity = calculateCartQuantity();
    document.querySelector(".js-cart-quantity").textContent = cartQuantity;
  }

  function displayAddedMessage(productId, addedMessageTimeoutId) {
    const addedMessage = document.querySelector(
      `.js-added-to-cart-${productId}`,
    );

    addedMessage.classList.add("added-to-cart-visible");
    // debouncing the added message
    setTimeout(() => {
      // check if previous timeout is still running
      if (addedMessageTimeoutId) {
        clearTimeout(addedMessageTimeoutId);
      }
      const timeoutId = setTimeout(() => {
        addedMessage.classList.remove("added-to-cart-visible");
      }, 2000);
      addedMessageTimeoutId = timeoutId;
    });
  }

  document.querySelector(".js-products-grid").innerHTML = productHtml;

  updateCartQuantity();

  document.querySelectorAll(".js-add-to-cart").forEach((button) => {
    let addedMessageTimeoutId;

    button.addEventListener("click", () => {
      // data-product-name is a custom attribute that we can access using the dataset property on the button element
      // and it automatically converts the attribute name from kebab-case to camelCase
      // console.log(button.dataset.productName);
      const { productId } = button.dataset;

      const quantitySelector = document.querySelector(
        `.js-quantity-selector-${productId}`,
      );
      const quantity = parseInt(quantitySelector.value);
      addToCart(productId, quantity);

      updateCartQuantity();

      displayAddedMessage(productId, addedMessageTimeoutId);
    });
  });
}
