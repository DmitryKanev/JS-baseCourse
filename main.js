"use strict";
const catalog = {
  catalogBlock: null,
  cart: {},
  itemlist: [
    { id_product: 1, product: "1", price: 50 },
    { id_product: 2, product: "2", price: 60 },
    { id_product: 3, product: "3", price: 70 },
    { id_product: 4, product: "4", price: 80 },
  ],

  init(catalogBlockClass, cart) {
    this.catalogBlock = document.querySelector(`.${catalogBlockClass}`);
    this.cart = cart;
    this.render();
    this.addEventHandlers();
  },

  render() {
    this.renderCatalogList();
  },

  renderCatalogList() {
    this.catalogBlock.innerHTML = "";
    this.itemlist.forEach((item) => {
      this.catalogBlock.insertAdjacentHTML(
        "beforeend",
        this.renderCatalogItem(item)
      );
    });
  },

  renderCatalogItem(item) {
    return `<div class="product">
              <p>${item.product}</p>
              <p>${item.price}</p>
              <button class="product__add-to-cart" data-id_product="${item.id_product}">Add to cart</button>
            </div>`;
  },

  addEventHandlers() {
    this.catalogBlock.addEventListener("click", (event) =>
      this.addToBasket(event)
    );
  },

  addToBasket(event) {
    if (!event.target.classList.contains("product__add-to-cart")) return;
    const id_product = +event.target.dataset.id_product;
    const productToAdd = this.itemlist.find(
      (product) => product.id_product === id_product
    );
    this.cart.addToBasket(productToAdd);
  },
};

const cart = {
  cartListBlock: null,
  clearCartButton: null,
  goods: [],

  init() {
    this.cartListBlock = document.querySelector(".cart-list");
    this.clearCartButton = document.querySelector(".clearButton");
    this.addEventHandlers();
    this.render();
  },

  render() {
    if (this.getCartGoods() > 0) {
      this.renderCartList();
    } else {
      this.renderEmptyCart();
    }
  },

  getCartGoods() {
    return this.goods.length;
  },

  renderEmptyCart() {
    this.cartListBlock.innerHTML = "";
    this.cartListBlock.textContent = "Cart is empty";
  },

  renderCartList() {
    this.cartListBlock.innerHTML = "";
    this.goods.forEach((good) => {
      this.cartListBlock.insertAdjacentHTML(
        "beforeend",
        this.renderCartItems(good)
      );
    });
    this.cartListBlock.insertAdjacentHTML(
      "beforeend",
      `In cart ${this.goods.length} for total amount ${this.getCartPrice()}`
    );
  },

  addEventHandlers() {
    this.clearCartButton.addEventListener("click", this.clearCart.bind(this));
  },

  addToBasket(product) {
    const inBusket = this.goods.find(
      (item) => product.id_product === item.id_product
    );
    if (inBusket) {
      inBusket.quantity++;
    } else {
      this.goods.push({ ...product, quantity: 1 });
    }
    this.render();
  },

  getCartPrice() {
    return this.goods.reduce(function (price, good) {
      return price + good.price * good.quantity;
    }, 0);
  },

  clearCart() {
    this.goods = [];
    this.render();
  },

  renderCartItems(good) {
    return `
<div class="good">
  <div>
    <b>Product Name</b>: ${good.product}
  </div>
  <div>
    <b>price</b>: ${good.price}
  </div>
  <div>
    <b>Quant</b>: ${good.quantity}
  </div>
  <div>
    <b>Total</b>: ${good.price * good.quantity}
  </div>
</div>`;
  },
};

catalog.init("catalog", cart);
cart.init("cart-list", "clearButton");
