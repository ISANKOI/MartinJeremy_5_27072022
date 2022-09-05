//----- Fonction affichage numéro de commande -----//
function orderNumber() {
  const url = new URL(window.location.href);
  document.getElementById("orderId").innerText = url.searchParams.get("id");
  //Clear du localStorage
  localStorage.clear();
}

orderNumber();
