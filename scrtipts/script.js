const downloadFeaturedItems = async () => {
  const responce = await fetch("dataBase/featuredItems.json");
  const items = await responce.json();
  const featureContainer = document.querySelector(".quick-sale");
  items.forEach((item) => {
    featureContainer.insertAdjacentHTML(
      "beforeend",
      `
      <div class="card">
          <a href="#" class="card-img" style="background-image: url(${item.url})"><img
                  src="./img/item/Add to cart.png" class="add-to-cart" alt="добавить в корзину"></a>
          <span class="card-title">${item.title}</span>
          <span class="card-description">${item.description}</span>
          <span class="card-price">$${item.price}</span>
      </div>
    
    `
    );
  });
};
downloadFeaturedItems();
