const express = require("express");

const app= express();

// le gestionnaire de route (req, res){]traite les requetes  de tous les verbes http et  sur toutes les route avec la fonction use() et sans la fonction next()
// la fonction use()  ajoute le gestionnaire de route ou un middleware au niveau de l application ou du router et ici  ajoute a la pile des middleware au noveau de l application
app.use((req,res,next)=>{
    console.log("requête reçue")
   next(); //passe l execution du serveur au au middleware suivant en appelant la fonction suivant avec la fonction de rappel next()
});
app.use((req, res,next)=>{
    res.status(201); //ce middleware modifie le status de l'objet response
    next();
})
app.use((req, res,next)=>{
    res.json({message: "message: Votre requete a bien été recue"})
    next();
})
app.use((req, res)=>{// l execition du serveur pour la requete est terminé pas besoin de next() et des middleware ici, c'est gestionnaire de route et plus une fonction middleware car n a pas de next() en troisieme argument et il n est plus necessaire de traiter la requête  
    console.log("la reponse a bien été envoyé")
})

/* module.exports exporte et rend accessible  la valeur actuelle de l'objet exports(du module app.js) 
qui sont les fonctions et methodes de l'application express contenu  dans la variable  const app */
module.exports= app;