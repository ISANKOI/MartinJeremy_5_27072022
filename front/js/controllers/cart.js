var cart = new Cart();
cart.load();

//Affichage de ou des produits dans le panier
function canape_to_html(data) {
  var html = "";
  for (let d in data) {
    html += `<article class="cart__item" data-id="${data[d].canap_id}" data-color="${data[d].color}">
  <div class="cart__item__img">
    <img src="${data[d].img}" alt="${data[d].altTxt}">
  </div>
  <div class="cart__item__content">
    <div class="cart__item__content__description">
      <h2>${data[d].name}</h2>
      <p>${data[d].color}</p>
      <p>${data[d].unitPrice} €</p>
    </div>
    <div class="cart__item__content__settings">
      <div class="cart__item__content__settings__quantity">
        <p>Qté : </p>
        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="${data[d].quantity}">
      </div>
      <div class="cart__item__content__settings__delete">
        <p class="deleteItem">Supprimer</p>
      </div>
    </div>
  </div>
</article>`;
  }
  return html;
}

//Affichage des différents articles
async function afficheDatas() {
  const items = document.querySelector("#cart__items");
  items.innerHTML = canape_to_html(await cart.getResume());
}
afficheDatas();
/*
//Total des quantités
var productQtt = document.getElementsByClassName("itemQuantity");
var length = productQtt.length;
console.log(length);
totalQtt = 0;

for (var i = 0; i < length; ++i) {
  totalQtt += productQtt[i];
}

let productTotalQuantity = document.getElementById("totalQuantity");
productTotalQuantity.innerHTML = totalQtt;
console.log(totalQtt);

// Récupération du prix total
totalPrice = 0;

for (var i = 0; i < length; ++i) {
    totalPrice += (addition des différent totaux des canapés);
}

let productTotalPrice = document.getElementById('totalPrice');
productTotalPrice.innerHTML = totalPrice;
console.log(totalPrice);
*/

//Modification quantité produit
let selectQuantity = document.getElementsByClassName("itemQuantity");
console.log(selectQuantity);
for (let s in selectQuantity) {
  console.log(typeof selectQuantity[s]);
  if (typeof selectQuantity[s] != "Object") continue;

  selectQuantity[s].addEventListener("change", function (event) {
    var canap_id = event.target.getAttribute("data-id");
    var canap_color = event.target.getAttribute("data-color");
    console.log(canap_id);
    console.log(canap_color);
    var newQuantity = parseInt(event.target.value, 10);
    cart.set(canap_id, canap_color, newQuantity);
    cart.save();
    afficheDatas();
  });
}

/*
//Suppression du produit dans le panier
function deleteProduct() {
  const btn_delete = document.querySelectorAll(".deleteItem");
  console.log(btn_delete);

  btn_delete.addEventListener("click", (event) => {
    event.preventDefault();

    //Selection du produit à supprimer en fonction de son id et de sa couleur
    var canap_id = event.target.getAttribute("data-id");
    console.log(canap_id);
    var canap_color = event.target.getAttribute("data-color");
    cart.delete(canap_id, canap_color);
    cart.save();

    //Refresh de la page et message supression produit
    alert("Le produit a bien été supprimé du panier");
    location.reload();
  });
}

deleteProduct();
*/
/*
function getForm() {
  
  let form = document.querySelector(".cart__order__form");
  // Ajout des Regex
  const regExpString = new RegExp("^[a-zA-Zàâäéèêëïîôöùûüç-]+$");
  const regExpEmail = new RegExp('^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,3}$');
  const regExpAddress = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");
  let control = true;

  // Ecoute de la modification du prénom
  form.firstName.addEventListener('change', function() {
    validFirstName(this);
});

// Ecoute de la modification du nom
form.lastName.addEventListener('change', function() {
    validLastName(this);
});

// Ecoute de la modification de l'adresse
form.address.addEventListener('change', function() {
    validAddress(this);
});

// Ecoute de la modification dde la ville
form.city.addEventListener('change', function() {
    validCity(this);
});

// Ecoute de la modification de l'email
form.email.addEventListener('change', function() {
    validEmail(this);
});

  //validation du prénom
  const validFirstName = function(inputFirstName) {
    let firstNameErrorMsg = inputFirstName.nextElementSibling;

    if (regExpString.test(inputFirstName.value)) {
        firstNameErrorMsg.innerHTML = '';
    } else {
        firstNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        
    }
};

//validation du nom
const validLastName = function(inputLastName) {
    let lastNameErrorMsg = inputLastName.nextElementSibling;

    if (regExpString.test(inputLastName.value)) {
        lastNameErrorMsg.innerHTML = '';
    } else {
        lastNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        
    }
};

//validation de l'adresse
const validAddress = function(inputAddress) {
    let addressErrorMsg = inputAddress.nextElementSibling;

    if (regExpAddress.test(inputAddress.value)) {
        addressErrorMsg.innerHTML = '';
    } else {
        addressErrorMsg.innerHTML = 'Veuillez renseigner une adresse.'
        
        
    }
};

//validation de la ville
const validCity = function(inputCity) {
    let cityErrorMsg = inputCity.nextElementSibling;

    if (regExpString.test(inputCity.value)) {
        cityErrorMsg.innerHTML = '';
    } else {
        cityErrorMsg.innerHTML = 'Veuillez renseigner une ville.';
        
    }
};

//validation de l'email
const validEmail = function(inputEmail) {
    let emailErrorMsg = inputEmail.nextElementSibling;

    if (regExpEmail.test(inputEmail.value)) {
        emailErrorMsg.innerHTML = '';
    } else {
        emailErrorMsg.innerHTML = 'Veuillez renseigner une adresse mail valide.';
        
        
    }
};

  }
*/
//getForm();
/*
fetch("http://localhost:3000/api/products/order")
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
*/
