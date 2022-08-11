//Récupération de tout les produits contenu dans localStorage

cart.load()
//console.log(test);
/*
function canape_to_html(test) {
  console.log("canape_to_html");
  return `<article class="cart__item" data-id="${test[0]}" data-color="{product-color}">
    <div class="cart__item__img">
      <img src="../images/product01.jpg" alt="Photographie d'un canapé">
    </div>
    <div class="cart__item__content">
      <div class="cart__item__content__description">
        <h2>Nom du produit</h2>
        <p>${test[1]}</p>
        <p>42,00 €</p>
      </div>S
      <div class="cart__item__content__settings">
        <div class="cart__item__content__settings__quantity">
          <p>Qté : </p>
          <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${test[2]}">
        </div>
        <div class="cart__item__content__settings__delete">
          <p class="deleteItem">Supprimer</p>
        </div>
      </div>
    </div>
  </article>`;
}
const item = document.getElementById("cart__items");
var result = canape_to_html(test);
item.innerHTML = result;

for (let l in localStorage) {
  console.log("COUCOU !");
}
*/


/*const productsChoice = localStorage.length
const cart = []
    
for (let p = 0; p < productsChoice; p++) {
        
    const product = localStorage.getItem(localStorage.key(p))
    const productObject = JSON.parse(product)
    cart.push(productObject)
}

    console.log(cart)*/
