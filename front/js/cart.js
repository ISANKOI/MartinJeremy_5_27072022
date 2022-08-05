//Récupération de tout les produits contenu dans localStorage
    const productsChoice = localStorage.length
    for (let p = 0; p < productsChoice; p++) {
        const product = localStorage.getItem(localStorage.key(p))
        const productObject = JSON.parse(product)
        console.log(productObject)
    }



/*function afficheDatas(product) {
    const productImg = document.createElement("img");
    document.querySelector(".cart__item__img").appendChild(productImg);
    productImg.src = product.imageUrl;
    productImg.alt = product.altTxt;
  
    const productTitle = document.querySelector(".cart__item__content__description h2");
    productTitle.innerHTML = product.name;
  
    const productPrice = document.querySelector("#price");
    productPrice.innerHTML = data.price;
  
    const productDesc = document.querySelector("#description");
    productDesc.innerHTML = product.description;

    const productQuant = document.querySelector("#quantity");
    const productColor = document.querySelector("#colors");
}*/