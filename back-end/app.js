const express = require("express");

const app= express();


// la fonction use()  ajoute le gestionnaire de route ou un middleware au niveau de l application ou du router et ici  ajoute a la pile des middleware au noveau de l application
// use ajoute une root et un middleware sur toutes types de requete http , le middleware envoit sur tt type de requete le contenu des articles stuff
app.use('/api/stuff', (req, res, next) => {
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