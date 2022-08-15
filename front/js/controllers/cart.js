//var cart = new Cart()
//cart.load(productId, colors, quantity)
//Récupération de tout les produits contenu dans localStorage

//cart.load()
//console.log(test);
/*
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
 /*
//Affichage caractéristiques du produit 
function canape_to_html(data) {
  return `<article class="cart__item" data-id="${data._id}" data-color="{product-color}">
  <div class="cart__item__img">
    <img src="${data.imageUrl}" alt="${data.altTxt}">
  </div>
  <div class="cart__item__content">
    <div class="cart__item__content__description">
      <h2>${data.name}</h2>
      <p>${data.colors}</p>
      <p>${data.price}</p>
    </div>
    <div class="cart__item__content__settings">
      <div class="cart__item__content__settings__quantity">
        <p>Qté : </p>
        <input type="number" class="itemQuantity" name="itemQuantity" min="1" max="100" value="42">
      </div>
      <div class="cart__item__content__settings__delete">
        <p class="deleteItem">Supprimer</p>
      </div>
    </div>
  </div>
</article>`;
}
//Affichage des différents articles
function afficheDatas(canapes) {
  const items = document.querySelector(".cart__items");
  var result = JSON.parse(localStorage.getItem(cart));
  for (let c in canapes) {
    let canape = canapes[c];
    result += canape_to_html(canape);
  }

  items.innerHTML = result;
}
*/
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
        control = false;
    }
};

//validation du nom
const validLastName = function(inputLastName) {
    let lastNameErrorMsg = inputLastName.nextElementSibling;

    if (regExpString.test(inputLastName.value)) {
        lastNameErrorMsg.innerHTML = '';
    } else {
        lastNameErrorMsg.innerHTML = 'Veuillez renseigner ce champ.';
        control = false;
    }
};

//validation de l'adresse
const validAddress = function(inputAddress) {
    let addressErrorMsg = inputAddress.nextElementSibling;

    if (regExpAddress.test(inputAddress.value)) {
        addressErrorMsg.innerHTML = '';
    } else {
        addressErrorMsg.innerHTML = 'Veuillez renseigner une adresse.'
        control = false;
        
    }
};

//validation de la ville
const validCity = function(inputCity) {
    let cityErrorMsg = inputCity.nextElementSibling;

    if (regExpString.test(inputCity.value)) {
        cityErrorMsg.innerHTML = '';
    } else {
        cityErrorMsg.innerHTML = 'Veuillez renseigner une ville.';
        control = false;
    }
};

//validation de l'email
const validEmail = function(inputEmail) {
    let emailErrorMsg = inputEmail.nextElementSibling;

    if (regExpEmail.test(inputEmail.value)) {
        emailErrorMsg.innerHTML = '';
    } else {
        emailErrorMsg.innerHTML = 'Veuillez renseigner une adresse mail valide.';
        control = false;
        
    }
};
if (control) {
    return true;
} else {
    return false;
}
  }

getForm();

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
