const cartContain = {};
async function downloadFeaturedItems() {
  const responce = await fetch("dataBase/featuredItems.json");
  const items = await responce.json();
  items.forEach((item) => {
    const featureContainer = document.querySelector(".quick-sale");
    featureContainer.insertAdjacentHTML(
      "beforeend",
      `
      <div class="card" >
          <a  class="card-img" style="background-image: url(${item.url})"><img
                  src="./img/item/Add to cart.png" class="add-to-cart" alt="добавить в корзину" id='${item.id}'></a>
          <span class="card-title">${item.title}</span>
          <span class="card-description">${item.description}</span>
          <span class="card-price">$${item.price}</span>
      </div>
    
    `
    );
  });
  const cartContainer = document.querySelector(".user-cart");
  document.addEventListener("click", (e) => {
    const cart = document.getElementById("user-cart-container");
    const clickedItem = items[e.target.id];
    if (e.target.classList.contains("add-to-cart")) {
      cartContainer.style.display = "block";
      if (Object.keys(cartContain).includes(`${clickedItem.id}`)) {
        document.getElementById(`${clickedItem.id}`).value =
          document.getElementById(`${clickedItem.id}`).value + 1;
        cartContain[clickedItem.id]++;
        document.getElementById(`quantity-${clickedItem.id}`).value =
          cartContain[clickedItem.id];
      } else {
        cartContain[clickedItem.id] = 1;

        cart.insertAdjacentHTML(
          "beforeend",
          `
    <div class="product" id='product-${clickedItem.id}'>
  <img src="${clickedItem.url}" class="product-img        ">
  <div class="product-about">
    <a  class="product-title">${clickedItem.title}</a>
    <span class="product-description">Price: <span class="product-price-amount">${
      clickedItem.price
    }</span>
    </span>
    <span class="product-description">Color: <span class="product-color">${
      clickedItem.color
    }</span>
    </span>
    <span class="product-description">Size: <span class="product-size">${
      clickedItem.size
    }</span>
    </span>
    <span class="product-description">Quantity:<input type="number" class="product-quantity" name='qauntity'
            min="0" value ="${cartContain[clickedItem.id]}" id='quantity-${
            clickedItem.id
          }'></input>
    </span>
  </div>
  <button class="delete-product"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
        viewBox="0 0 18 18" fill="none">
        <path
            d="M11.2453 9L17.5302 2.71516C17.8285 2.41741 17.9962 2.01336 17.9966 1.59191C17.997 1.17045 17.8299 0.76611 17.5322 0.467833C17.2344 0.169555 16.8304 0.00177586 16.4089 0.00140366C15.9875 0.00103146 15.5831 0.168097 15.2848 0.465848L9 6.75069L2.71516 0.465848C2.41688 0.167571 2.01233 0 1.5905 0C1.16868 0 0.764125 0.167571 0.465848 0.465848C0.167571 0.764125 0 1.16868 0 1.5905C0 2.01233 0.167571 2.41688 0.465848 2.71516L6.75069 9L0.465848 15.2848C0.167571 15.5831 0 15.9877 0 16.4095C0 16.8313 0.167571 17.2359 0.465848 17.5342C0.764125 17.8324 1.16868 18 1.5905 18C2.01233 18 2.41688 17.8324 2.71516 17.5342L9 11.2493L15.2848 17.5342C15.5831 17.8324 15.9877 18 16.4095 18C16.8313 18 17.2359 17.8324 17.5342 17.5342C17.8324 17.2359 18 16.8313 18 16.4095C18 15.9877 17.8324 15.5831 17.5342 15.2848L11.2453 9Z"
            fill="#575757" />
    </svg></button>
  </div> 
    `
        );
      }
    }
  });
}
downloadFeaturedItems();
const featureContainer = document.querySelector(".quick-sale");
const cart = document.querySelector(".user-cart");
cart.addEventListener("change", (e) => {
  if (e.target.tagName === "INPUT") {
    const idToChange = e.target.id.slice(-1);
    cartContain[idToChange] = e.target.value;
    if (e.target.value === "0") {
      e.target.parentNode.parentNode.parentNode.remove();
      delete cartContain[idToChange];
    }
    if (Object.keys(cartContain).length === 0) {
      const cartContainer = document.querySelector(".user-cart");
      cartContainer.style.display = "none";
    }
  }
});
/* <div class="product">
<img src="../../img/item/featured-left-up.png" class="product-img        ">
<div class="product-about">
    <a  class="product-title">MANGO PEOPLE T-SHIRT</a>
    <span class="product-description">Price: <span class="product-price-amount">300</span>
    </span>
    <span class="product-description">Color: <span class="product-color">Red</span>
    </span>
    <span class="product-description">Size: <span class="product-size">XL</span>
    </span>
    <span class="product-description">Quantity:<input type="number" class="product-quantity"
            min="0"></input>
    </span>
</div>
<button class="delete-product"><svg xmlns="http://www.w3.org/2000/svg" width="18" height="18"
        viewBox="0 0 18 18" fill="none">
        <path
            d="M11.2453 9L17.5302 2.71516C17.8285 2.41741 17.9962 2.01336 17.9966 1.59191C17.997 1.17045 17.8299 0.76611 17.5322 0.467833C17.2344 0.169555 16.8304 0.00177586 16.4089 0.00140366C15.9875 0.00103146 15.5831 0.168097 15.2848 0.465848L9 6.75069L2.71516 0.465848C2.41688 0.167571 2.01233 0 1.5905 0C1.16868 0 0.764125 0.167571 0.465848 0.465848C0.167571 0.764125 0 1.16868 0 1.5905C0 2.01233 0.167571 2.41688 0.465848 2.71516L6.75069 9L0.465848 15.2848C0.167571 15.5831 0 15.9877 0 16.4095C0 16.8313 0.167571 17.2359 0.465848 17.5342C0.764125 17.8324 1.16868 18 1.5905 18C2.01233 18 2.41688 17.8324 2.71516 17.5342L9 11.2493L15.2848 17.5342C15.5831 17.8324 15.9877 18 16.4095 18C16.8313 18 17.2359 17.8324 17.5342 17.5342C17.8324 17.2359 18 16.8313 18 16.4095C18 15.9877 17.8324 15.5831 17.5342 15.2848L11.2453 9Z"
            fill="#575757" />
    </svg></button>
</div> */
cart.addEventListener("click", (e) => {
  console.log(e.target.tagName);
  if (e.target.tagName === "PATH" || "SVG") {
    console.log(e.target.closest(".product"));
    const idToChange = e.target.closest(".product").id.slice(8);
    console.log(idToChange);
    e.target.closest(".product").remove();
    delete cartContain[idToChange];
    if (Object.keys(cartContain).length === 0) {
      document.getElementById("user-cart").style.display = "none";
    }
  }
});
