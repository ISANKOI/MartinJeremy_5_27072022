//Affichage caractéristiques du produit 
function canape_to_html(data) {
  return `<a href="./product.html?id=${data._id}">
    <article>
      <img src="${data.imageUrl}" alt="${data.altTxt}">
      <h3 class="productName">${data.name}</h3>
      <p class="productDescription">${data.description}</p>
    </article>
  </a>`;
}
//Affichage des différents articles
function afficheDatas(canapes) {
  const items = document.getElementById("items");
  var result = "";
  for (let c in canapes) {
    let canape = canapes[c];
    result += canape_to_html(canape);
  }

  items.innerHTML = result;
}
fetch("http://localhost:3000/api/Products")
  //récupération du résultat de la requête
  .then(function (res) {
    return res.json();
  })
  .then(function (data) {
    console.log(data);
    afficheDatas(data);
  })
  // Une erreur est survenue
  .catch(function (err) {
    
  });
