const express = require("express");
const router = express.Router(); 
const auth= require("../middleware/auth");
const upload = require("../middleware/config-multer.js");
const stuffctrler= require("../controllers/stuff")

// import du module thing.js contenant la valeur actuelle du model avec  la valeur de thingshema 

//..................CREATION DES ROUTES INDIVIDUELLES AVEC L OBJET ROUTER:qui se rajouteront à la route de base "/api/stuff" dans app.js.........................
 
// la methode post() ajoute la route et le middleware qui traitera la requete poste et l objet response de la requete post

  //.......................................... creation d un objet/ajout d un produit...............................
  // ajout de la fonction semantique (logique metier de router dans le controller stuff.js) du controller stuff.js à la logique routing router.post("/")
  router.post( '/',auth, upload, stuffctrler.createThing );

 //...................................modification d'un produit avec son id......................................
 // ajout de la fonction semantique (logique metier de router dans le controller stuff.js) du controller stuff.js à la logique routing router.put("/:id")
 router.put( '/:id',auth, upload, stuffctrler.modifyThing );

//......................................suppression d'un produit......................................................
// ajout de la fonction semantique (logique metier de router dans le controller stuff.js) du controller stuff.js à la logique routing router.delete("/:id")
router.delete( '/:id',auth,stuffctrler.deleteThing );

//...................................... recuperation d un thing par son id.....................................
// ajout de la fonction semantique (logique metier de router dans le controller stuff.js) du controller stuff.js à la logique routing router.get("/:id")
  router.get( '/:id',auth,stuffctrler.getOneThing );

//...............................récuperation de la liste de things dans le modele Thing................................

// la methode  get()  ajoute le middleware au niveau du router et ajoute la route sur toute les requete avec le verbe HTTP GET
// le middleware ajouté a la methode get traitera les requete http GET, ici traite l objet response
// ajout de la fonction semantique (logique metier de router dans le controller stuff.js) du controller stuff.js à la logique routing router.get

router.get('/',auth,stuffctrler.getAllThing);


module.exports= router;