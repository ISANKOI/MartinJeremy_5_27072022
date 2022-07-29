// Recuperation ID canape
var str = window.location.href;
var url = new URL(str)
var idProduct = url.searchParams.get("id")
    console.log(idProduct)
var article = ""

    // Affichage caracteristique du canape
function afficheDatas(canape) {
    const productImg = document.createElement("img")
    document.querySelector(".item__img").appendChild(productImg)
    productImg.src = canape.imageUrl
    productImg.alt = canape.altTxt

    const productTitle = document.querySelector("#title")
    productTitle.innerHTML = canape.name

    const productPrice = document.querySelector("#price")
    productPrice.innerHTML = canape.price

    const productDesc = document.querySelector("#description")
    productDesc.innerHTML = canape.description

    // LES BOUTONS A FAIRE

      
}
// Recuperation caracteristique canape
fetch("http://localhost:3000/api/Products/" + idProduct)
    .then(function(res) {
        return res.json();
        
    })
    .then(function(data) {
        console.log(data);
        afficheDatas(data)
    })
      .catch(function(err) {
        // Une erreur est survenue
    });