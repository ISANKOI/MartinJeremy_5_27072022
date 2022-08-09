// Recuperation ID canape
var str = window.location.href;
var url = new URL(str);
var productId = url.searchParams.get("id");
console.log(productId);
const productQuant = document.querySelector("#quantity");
const productColor = document.querySelector("#colors");

// Affichage caracteristiques du canape
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
bouton.addEventListener("click", (event) => {
  const colors = productColor.value;
  console.log(colors);
  const quantity = productQuant.value;
  if (quantity == 0 || quantity > 100) {
    alert("veuillez selectionner une quantité (1-100)");
    return;
  }
  if (colors == "") {
    alert("veuillez selectionner une couleur");
    return;
  }

  

  //Stockage dans localStorage
  //cart.add(productId, colors, quantity)
  const cart = [productId, colors, quantity];
  localStorage.setItem("canape", JSON.stringify(cart));
  window.location.href = "cart.html";
});

// Recuperation caracteristiques canape
fetch("http://localhost:3000/api/Products/" + productId)
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    console.log(data);
    afficheDatas(data);
  })
  .catch(function (err) {
    // Une erreur est survenue
  });
