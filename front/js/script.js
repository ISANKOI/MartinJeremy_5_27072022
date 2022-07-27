fetch("http://localhost:3000/api/Products")
    .then(function(res) {
        if (res.ok) {
        return res.json();
        }
    })
    .then(function(data) {
        console.log(data);
    })
      .catch(function(err) {
        // Une erreur est survenue
    });
        // Appel de ta fonction d'affichage
        function afficheDatas(data) {
            data.map(function(produit, index) {
             document
                .getElementById("items")
                items.appendChild       
            });
          }
