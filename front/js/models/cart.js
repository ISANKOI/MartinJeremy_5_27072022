class Cart {
  constructor() {
    this.storage = {};
  }
  //----- Ajouter quantité -----//
  add(id, color, quantity) {
    var key = id + "_" + color;
    parseInt(this.storage[key], 10);
    if (this.storage[key]) {
      this.storage[key] += quantity;
    } else {
      this.storage[key] = quantity;
    }
  }
//----- Fixer quantité -----//
  set(id, color, quantity) {
    var key = id + "_" + color;
    this.storage[key] = quantity;
  }
//----- Supprimer quantité -----//
  remove(id, color, quantity) {
    var key = id + "_" + color;
    if (this.storage[key]) {
      if (this.storage[key] - quantity <= 0) {
        delete this.storage[key];
      } else {
        this.storage[key] -= quantity;
      }
    }
  }
  delete(id, color) {
    var key = id + "_" + color;
    if (this.storage[key]) {
      delete this.storage[key];
    }
    else {
      return
    }
  }

//----- Sauvegarde du localStorage -----//
  save() {
    localStorage.setItem("cart", JSON.stringify(this.storage));
  }
//----- Chargement du LocalStorage -----//
  load() {
    if (localStorage.getItem("cart")) {
      this.storage = JSON.parse(localStorage.getItem("cart"));
    }
  }

//----- Concaténation localStorage et api -----//
  async getResume() {
    var res = await fetch("http://localhost:3000/api/Products")
      
    var canaps = await res.json();
    var results = [];
    for (let key in this.storage) {
        let quantity = this.storage[key];
        let parts = key.split("_");

        let canap_id = parts[0];
        let color = parts[1];

        let canaps_founded = canaps.filter(function (c) {
            return c._id == canap_id;
        });

        if (canaps_founded.length > 0) {
            let myCanap = canaps_founded[0];

            results.push({
                color,
                cart_id : key,
                canap_id,
                quantity,
                total: quantity * myCanap.price,
                unitPrice: myCanap.price,
                description: myCanap.description,
                img: myCanap.imageUrl,
                name: myCanap.name,
                altTxt: myCanap.altTxt,
            });
        }
    }
    console.log(results)
    return results;
  }
}
