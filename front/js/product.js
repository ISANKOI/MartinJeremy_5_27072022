// Recuperation ID canape
var str = window.location.href;
var url = new URL(str)
var idProduct = url.searchParams.get("id")
    console.log(idProduct)

    // Affichage caracteristiques du canape
function afficheDatas(data) {
    const productImg = document.createElement("img")
    document.querySelector(".item__img").appendChild(productImg)
    productImg.src = data.imageUrl
    productImg.alt = data.altTxt

    const productTitle = document.querySelector("#title")
    productTitle.innerHTML = data.name

    const productPrice = document.querySelector("#price")
    productPrice.innerHTML = data.price

    const productDesc = document.querySelector("#description")
    productDesc.innerHTML = data.description

    // Choix de la couleur
    for(let c in data.colors) {
        let productColors = document.createElement("option");
        document.querySelector("#colors").appendChild(productColors);
        productColors.value = data.colors[c];
        productColors.innerHTML = data.colors[c];
    } 
    
          
}
   /*   //Ajouter au panier
     btn_AddToCard.addEventlistener("click",)*/
      
// Recuperation caracteristiques canape
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