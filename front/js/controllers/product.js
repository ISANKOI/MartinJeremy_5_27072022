//----- Creation nouvelle class -----//
var cart = new Cart();
//Chargement du localStorage
cart.load();

//----- Récupération ID canapé -----//
const url = new URL(window.location.href);
var productId = url.searchParams.get("id");
console.log(productId);

//Declaration quantité produit
const productQuant = document.querySelector("#quantity");
//Declaration couleur produit
const productColor = document.querySelector("#colors");

//----- Fonction affichage caractéristiques du canapé -----//
function afficheDatas(data) {

  //Insertion de l'image
  const productImg = document.createElement("img");
  document.querySelector(".item__img").appendChild(productImg);
  productImg.src = data.imageUrl;
  productImg.alt = data.altTxt;

  //Insertion du titre
  const productTitle = document.querySelector("#title");
  productTitle.innerHTML = data.name;

  //Insertion du prix
  const productPrice = document.querySelector("#price");
  productPrice.innerHTML = data.price;

  //Insertion de la description
  const productDesc = document.querySelector("#description");
  productDesc.innerHTML = data.description;

  //Insertion choix de la couleur
  for (let c in data.colors) {
    let productColors = document.createElement("option");
    document.querySelector("#colors").appendChild(productColors);
    productColors.value = data.colors[c];
    productColors.innerHTML = data.colors[c];
  }
}

//----- Fonction d'ajout au panier de l'article -----//
function addToCart() {

//Ajouter au panier
const bouton = document.getElementById("addToCart");

//Événement lors de l'appui sur le bouton
bouton.addEventListener("click", (event) => {

  //Declaration valeur couleur choisi
  const colors = productColor.value;

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
  //Ajout au localStorage
  cart.add(productId, colors, quantity);
  //Sauvegarde du localStorage
  cart.save();
  //Redirection vers la page panier
  window.location.href = "cart.html"
});

}
addToCart();

//----- Fonction récupération de l'article de l'API -----//
function getProductById() {
fetch("http://localhost:3000/api/Products/" + productId)
  //récupération du résultat de la requête
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    console.log(data);
    afficheDatas(data);
  })
  // Une erreur est survenue
  .catch(function (err) {});
}
getProductById();