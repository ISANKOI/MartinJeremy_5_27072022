function orderNumber() {
  const url = new URL(window.location.href);
  document.getElementById("orderId").innerText = url.searchParams.get("id");

  localStorage.clear();
}
orderNumber();
