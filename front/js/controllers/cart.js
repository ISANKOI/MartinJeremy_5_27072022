//----- Creation nouvelle class -----//
var cart = new Cart();
//Chargement du localStorage
cart.load();

//----- Fonction affichage de ou des produits dans le panier -----//
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
        <input type="number" class="itemQuantity" name="itemQuantity" data-id="${data[d].canap_id}" data-color="${data[d].color}" min="1" max="100" value="${data[d].quantity}">
      </div>
      <div class="cart__item__content__settings__delete">
        <p class="deleteItem" data-id="${data[d].canap_id}" data-color="${data[d].color}">Supprimer</p>
      </div>
    </div>
  </div>
</article>`;
  }
  return html;
}

//----- Fonction modification quantité produit -----//
function setQtt() {
  let selectQuantity = document.getElementsByClassName("itemQuantity");
  for (let s in selectQuantity) {

    if (typeof selectQuantity[s] != "object") continue;

    selectQuantity[s].addEventListener("change", (event) => {
      console.log("setQtt");
      var canap_id = event.target.getAttribute("data-id");
      var canap_color = event.target.getAttribute("data-color");

      console.log(canap_id);
      console.log(canap_color);

      var newQuantity = parseInt(event.target.value, 10);

      console.log(newQuantity);
      //Fixation de la quantité dans le localStorage
      cart.set(canap_id, canap_color, newQuantity);
      //Sauvegarde du localStorage
      cart.save();

      afficheDatas();
    });
  }
}

//----- Fonction total des quantités -----//
function totalQtt() {
var productQtt = document.getElementsByClassName("itemQuantity");
var length = productQtt.length;
totalQtt = 0;

for (var i = 0; i < length; ++i) {
  totalQtt += productQtt[i];
}

let productTotalQuantity = document.getElementById("totalQuantity");
productTotalQuantity.innerHTML = totalQtt;
}
totalQtt();

//----- Fonction suppression du produit dans le panier -----//
function deleteProduct() {
  const btn_deletes = document.getElementsByClassName("deleteItem");
  for (let b in btn_deletes) {
    if (typeof btn_deletes[b] != "object") continue;
    btn_deletes[b].addEventListener("click", (event) => {

      //Selection du produit à supprimer en fonction de son id et de sa couleur
      var canap_id = event.target.getAttribute("data-id");
      console.log(canap_id);
      var canap_color = event.target.getAttribute("data-color");

      //Supression du produit dans le localStorage
      cart.delete(canap_id, canap_color);

      //Sauvegarde du localStorage
      cart.save();

      //Refresh de la page et message supression produit
      afficheDatas();
      //Message indiquant la supression du produit
      alert("Le produit a bien été supprimé du panier");
    });
  }
}

//----- Fonction formulaire -----//
function getForm() {
  let form = document.getElementsByClassName("cart__order__form")[0];
  //Ajout des Regex
  const regExpString = new RegExp("^[a-zA-Zàâäéèêëïîôöùûüç-]+$");
  const regExpEmail = new RegExp("^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,3}$");
  const regExpAddress = new RegExp("^[0-9]{1,3}(?:(?:[,. ]){1}[-a-zA-Zàâäéèêëïîôöùûüç]+)+");
  let validation = true;

  //Evenement lors de la soumission du formulaire
  form.addEventListener("submit", async function (event) {

    //L'action par défaut n'est pas exécutée
    event.preventDefault();

    //Evite que l'évènement courant ne se propage
    event.stopPropagation();

    //Condition SI la quantité total est de zero
    if ((await cart.getTotal()).quantity == 0) {
      return alert("Veuillez ajouter un produit dans le panier");
      
    }
    //Condition SI la validation de tous les champs du formulaire est validé
    if( validation == true) {
    let inputName = document.getElementById('firstName');
    let inputLastName = document.getElementById('lastName');
    let inputAdress = document.getElementById('address');
    let inputCity = document.getElementById('city');
    let inputMail = document.getElementById('email');

      //Envoi des données à l'API
      cart.postForm(
        inputName.value, 
        inputLastName.value,
        inputAdress.value,
        inputCity.value,
        inputMail.value 
      )
      //Sinon message alert
    } else {
      alert("Veuiller choisir un produit et remplir le formulaire")
    }
  });
  // Ecoute de la modification du prénom
  form.firstName.addEventListener("change", function () {
    validFirstName(this);
  });

  // Ecoute de la modification du nom
  form.lastName.addEventListener("change", function () {
    validLastName(this);
  });

  // Ecoute de la modification de l'adresse
  form.address.addEventListener("change", function () {
    validAddress(this);
  });

  // Ecoute de la modification dde la ville
  form.city.addEventListener("change", function () {
    validCity(this);
  });

  // Ecoute de la modification de l'email
  form.email.addEventListener("change", function () {
    validEmail(this);
  });

  //validation du prénom
  const validFirstName = function (inputFirstName) {
    let firstNameErrorMsg = inputFirstName.nextElementSibling;

    if (regExpString.test(inputFirstName.value)) {
      firstNameErrorMsg.innerHTML = "";
    } else {
      firstNameErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
      validation = false;
    }
  };

  //validation du nom
  const validLastName = function (inputLastName) {
    let lastNameErrorMsg = inputLastName.nextElementSibling;

    if (regExpString.test(inputLastName.value)) {
      lastNameErrorMsg.innerHTML = "";
    } else {
      lastNameErrorMsg.innerHTML = "Veuillez renseigner ce champ.";
      validation = false;
    }
  };

  //validation de l'adresse
  const validAddress = function (inputAddress) {
    let addressErrorMsg = inputAddress.nextElementSibling;

    if (regExpAddress.test(inputAddress.value)) {
      addressErrorMsg.innerHTML = "";
    } else {
      addressErrorMsg.innerHTML = "Veuillez renseigner une adresse.";
      validation = false;
    }
  };

  //validation de la ville
  const validCity = function (inputCity) {
    let cityErrorMsg = inputCity.nextElementSibling;

    if (regExpString.test(inputCity.value)) {
      cityErrorMsg.innerHTML = "";
    } else {
      cityErrorMsg.innerHTML = "Veuillez renseigner une ville.";
      validation = false;
    }
  };

  //validation de l'email
  const validEmail = function (inputEmail) {
    let emailErrorMsg = inputEmail.nextElementSibling;

    if (regExpEmail.test(inputEmail.value)) {
      emailErrorMsg.innerHTML = "";
    } else {
      emailErrorMsg.innerHTML = "Veuillez renseigner une adresse mail valide.";
      validation = false;
    }
  }; 
}

getForm();

//----- Fonction asynchrone affichage des différents articles -----//
async function afficheDatas() {
  const items = document.querySelector("#cart__items");
  items.innerHTML = canape_to_html(await cart.getResume());
  const total = await cart.getTotal();
  document.getElementById("totalQuantity").innerHTML = total.quantity;
  document.getElementById("totalPrice").innerHTML = total.price;
  setQtt();
  deleteProduct();
}

afficheDatas();
