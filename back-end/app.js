const express = require("express");
const mongoose= require("mongoose");
// import des routes pour les stuff articles et les middles wares qui traites les requetes de ses routes individuels
const routerStuff = require("./routes/stuff");

const app= express();
//...........................connexion base de données mongodb avec module mongoose..................................
mongoose.connect('mongodb+srv://marie-lourdes:1234@cluster0.bq9wlht.mongodb.net/?retryWrites=true&w=majority',
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

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

// ajout de l objet router (avec ses routes individuelles et requetes http traites par leur middleware respectif)
//chaque route individuelle de l objet router s ajoute à la route de base qui est ajouté par la fonction use acceptant toutes les requetes http dans l objet router
app.use("/api/stuff", routerStuff);

/* module.exports exporte et rend accessible  la valeur actuelle de l'objet exports(du module app.js) 
qui sont les fonctions et methodes de l'application express contenu  dans la variable  const app */
module.exports= app;


