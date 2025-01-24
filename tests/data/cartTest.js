import { addToCart, cart, loadFromLocalStorage } from "../../data/cart.js";

describe("test suite: addToCart", () => {
  it("add an existing product", () => {
    spyOn(localStorage, "setItem");
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([
        {
          productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
          quantity: 1,
          deliveryOptionId: "1",
        },
      ]);
    });
    loadFromLocalStorage();
    addToCart("e43638ce-6aa0-4b85-b27f-e1d07eb678c6", 1);

    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify(cart),
    );
    expect(cart[0].productId).toEqual("e43638ce-6aa0-4b85-b27f-e1d07eb678c6");
    expect(cart[0].quantity).toEqual(2);
    loadFromLocalStorage();
  });
  // each test can have multiple expectations and it will only pass if all expectations pass
  it("adds a new product", () => {
    spyOn(localStorage, "setItem");
    spyOn(localStorage, "getItem").and.callFake(() => {
      return JSON.stringify([]);
    });

    loadFromLocalStorage();
    addToCart("83d4ca15-0f35-48f5-b7a3-1ea210004f2e", 1);

    expect(cart.length).toEqual(1);
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
    expect(localStorage.setItem).toHaveBeenCalledWith(
      "cart",
      JSON.stringify(cart),
    );
    expect(cart[0].productId).toEqual("83d4ca15-0f35-48f5-b7a3-1ea210004f2e");
    expect(cart[0].quantity).toEqual(1);
  });
});
