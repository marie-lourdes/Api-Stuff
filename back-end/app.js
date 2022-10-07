const express = require("express");

const app= express();
// ajout d un middleware integrée a express qui va recuperer toutes les requêtes entrante (objet request) dont le body est en content-type: application json
// ce middleware ne doit etre placer dans le tunnel gestionnaire des middleware avec le chainage de next(), 
// ce middleware traite l'objet request des requete entrante en json 
app.use(express.json());

// configuration generale de la reponse retourné (objet response) suite à une requete du front end avec la modification de la securite d acces au ressource de CORS
// en ajoutant des headers à l objet response pour tout type de requete et sur toutes les routes
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
  });

  // apres cette configuration l acces au donnes de stuff sur l endpoints api/stuff sera accessible depuis different serveur ou origine pour le verbe GET http
  // la methode post() ajoute la route et le middleware qui traitera la requete poste et l objet response de la requete post
  app.post('/api/stuff', (req, res, next) => {
    console.log(req.body);// capture du contenu de la requete post dans la console
    res.status(201).json({// pour que la requete post aboutisse,on envoit la reponse et modifier le code de succes en 201 qui corresponde à une demande de post reussi
      message: 'Objet créé !'
    });
  });

// la methode  get()  ajoute le middleware au niveau de l application  et ajoute la route sur toute les requete avec le verbe HTTP GET
// le middleware ajouté a la methode get traitera les requete http GET, ici traite l objet response
app.get('/api/stuff', (req, res) => {
    const stuff = [
      {
        _id: 'oeihfzeoi',
        title: 'Mon premier objet',
        description: 'Les infos de mon premier objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        price: 4900,
        userId: 'qsomihvqios',
      },
      {
        _id: 'oeihfzeomoihi',
        title: 'Mon deuxième objet',
        description: 'Les infos de mon deuxième objet',
        imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
        price: 2900,
        userId: 'qsomihvqios',
      },
    ];
    res.status(200).json(stuff); //le middleware modifie le status de la reponse et envoie la reponse avec l'objet stuff au format json en resultat de sortie avec la fonction json()
  });


/* module.exports exporte et rend accessible  la valeur actuelle de l'objet exports(du module app.js) 
qui sont les fonctions et methodes de l'application express contenu  dans la variable  const app */
module.exports= app;