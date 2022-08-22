var cart = new Cart();
cart.load();

//----- Recuperation ID canape -----//
const url = new URL(window.location.href);
var productId = url.searchParams.get("id");
console.log(productId);
const productQuant = document.querySelector("#quantity");
const productColor = document.querySelector("#colors");

//----- Affichage caracteristiques du canape -----//
function afficheDatas(data) {
  const productImg = document.createElement("img");
  document.querySelector(".item__img").appendChild(productImg);
  productImg.src = data.imageUrl;
  productImg.alt = data.altTxt;

  const productTitle = document.querySelector("#title");
  productTitle.innerHTML = data.name;

  const productPrice = document.querySelector("#price");
  productPrice.innerHTML = data.price;

  const productDesc = document.querySelector("#description");
  productDesc.innerHTML = data.description;

  // Choix de la couleur
  for (let c in data.colors) {
    let productColors = document.createElement("option");
    document.querySelector("#colors").appendChild(productColors);
    productColors.value = data.colors[c];
    productColors.innerHTML = data.colors[c];
  }
}

//Ajouter au panier
const bouton = document.getElementById("addToCart");
//Événement lors de l'appui sur le bouton
bouton.addEventListener("click", (event) => {
  //Declaration valeur couleur choisi
  const colors = productColor.value;
  console.log(colors);

  //Declaration valeur quantité choisi
  const quantity = parseInt(productQuant.value, 10);

  //Condition pour validation de mise au panier
  if (quantity == 0 || quantity > 100) {
    alert("veuillez selectionner une quantité (1-100)");
    return;
  }
  if (colors == "") {
    alert("veuillez selectionner une couleur");
    return;
  }

  cart.add(productId, colors, quantity);
  cart.save();
  window.location.href = "cart.html"
});

//----- Recuperation caracteristiques canape -----//
fetch("http://localhost:3000/api/Products/" + productId)
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    console.log(data);
    afficheDatas(data);
  })
  // Une erreur est survenue
  .catch(function (err) {});
