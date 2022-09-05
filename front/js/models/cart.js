//----- Création de la class Cart -----//
class Cart {
    constructor() {
        this.storage = {};
    }
    //----- Ajouter -----//
    add(id, color, quantity) {
        var key = id + "_" + color;
        parseInt(this.storage[key], 10);
        if (this.storage[key]) {
            this.storage[key] += quantity;
        } else {
            this.storage[key] = quantity;
        }
    }
    //----- Fixer une quantité -----//
    set(id, color, quantity) {
        var key = id + "_" + color;
        if (quantity > 0 && quantity <= 100) {
            this.storage[key] = quantity;
        } else {
            alert("Veuillez choisir une quantité valable ( 0 - 100).");
        }
    }
    //----- Supprimer une quantité -----//
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
    //----- Supprimer -----//
    delete(id, color) {
        var key = id + "_" + color;
        if (this.storage[key]) {
            delete this.storage[key];
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
    //----- Envoi des informations -----//
    postForm(firstName, lastName, address, city, email) {
        this.storage = JSON.parse(localStorage.getItem("cart"));
        //Construction d'un array depuis le local storage
        let idProducts = [];
        for (let s in this.storage) {
			let id = s.split("_") [0]
            idProducts.push(id);
        }
        console.log(idProducts);

        const order = {
            contact: {
                firstName,
                lastName,
                address,
                city,
                email,
            },
            products: idProducts,
        };

        const options = {
            method: "POST",
            body: JSON.stringify(order),
            headers: {
                "Content-Type": "application/json",
            },
        };

        fetch("http://localhost:3000/api/products/order", options)
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                window.location.href = "confirmation.html?id=" + data.orderId;
            })
            .catch(function (err) {});
    }

    //----- Concaténation localStorage et api -----//
    async getResume() {
        var res = await fetch("http://localhost:3000/api/Products");

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
                    cart_id: key,
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
        return results;
    }
    //----- Calcul prix total et quantité totale -----//
    async getTotal() {
        var resume = await this.getResume();
        var price = 0;
        var quantity = 0;
        for (let r in resume) {
            price += resume[r].total;
            quantity += resume[r].quantity;
        }
        return { price, quantity };
    }
}
