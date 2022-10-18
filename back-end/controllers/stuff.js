const Thing = require("../models/thing"); 

//............... fonctions semantiques des logiques metier de l objet router rendu accessibles au module stuff.js de router..........

// function semantique de la logique routing router.post("/") 

  exports.createThing = (req, res, next) => {
    const thingObject = JSON.parse(req.body.thing);// convertit l objet body "thing" (ajouté par multer)qui est une chaine json en objet javascript
    delete thingObject._id;
    delete thingObject._userId;// par securité nous supprimons l userid de la requete et le remplacons par l'user id de la propriété AUTH que nous avons rajouté
    const thing = new Thing({ // on crée une instance  du model Thing stocké dans la variable thing
        ...thingObject,
        userId: req.auth.userId,
        // on recupere le userId de la propriété auth que nous avons rajouté lors de l authentication dans le middleware auth.js
        //cela evite qu un client inscrive le userId dans notre utilisateur 
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
        // on recupere les propriété de l objet requete protocol, host, l objet file crée par multer
    });
     // save() envoie un promesse, sur ce resultat de la promesse denregistrement de l 'objet  avec then():
      //on envoie la reponse avec le status 201 et le msg en json
      //on recupere l erreur et on envoie le status erreur 400 avec la reponse de la requete et le message d erreur de catch en objet json
    
    // on enregistre l'instance de modele thing dans la base de données, une premier fois, transformé par mongoDB avec le nom de model au pluriel et minuscule pour le nom de la collection de mongodb si elle n existe pas deja
    //et on enregistre le shema structuré qui est copié par la methode model()a chaque appel de celle -ci,qui est inseré dans le model nommé "Thing" avec les données  avec la methode save() de mongoose
      thing.save()
    .then(() => { res.status(201).json({message: 'Objet enregistré !'})})
    .catch(error => { res.status(400).json( { error })})
    // est le raccourci de.json( {error:error}):error module separé  de l objet error
  };


   
      
      // "spread ... " operateur js qui copie et colle tous les elements  du body de la requete post utilisateur dans l'instance du model thing
    // au lieu de title: req.body.title;
    //description: req.body.description

    //ou sans l'operateur spread:
    /*    title: req.body.title,
    description: req.body.description,
    imageUrl: req.body.imageUrl,
    price: req.body.price,
    userId: req.body.userId*/
   

  // function semantique de la logique routing router.put("/:id")
  exports.modifyThing= (req, res, next) => {
    const thingObject = req.file ? { // operateur ternaire pour verifier si la requête de modification contient un body file dans la requete crée par multer
      ...JSON.parse(req.body.thing),
      // on parse l objet body  qui a été ajouté à la requête par multer, form data crée deux clé le thing et image file dans l objet body lors de la requête FRONT-END, multer ajoute tous les champs textuelle dans le l objet body, et les fichiers dans l objet file ou files s il y a plusiers fichier
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      // on modifie l url de l image avec l objet file de multer et sa propriét filename de l ojet file
  } : { ...req.body };// si il n y a pas de fichier, donc pas d objet file ajouté par multer , nous recuperons l objet body

  delete thingObject._userId;// apr securité on enleve l userid ajouté à la requête de l utilisateur er recuperonc l userid du middleware d authentification
  //cela nous permettra de verifier le userid de l autentification de la requete de modification avec celui enregistré avec l objet qui a crée
  // celui qui a crée l objet uniquement peut modifier l objet et pas un atre utilisateur qui ne la pas crée et n en ai pas propriétaire
  Thing.findOne({_id: req.params.id})
      .then((thing) => {
          if (thing.userId != req.auth.userId) {
            // on verifie dans la base de données  que l objet avec l id du parametre de recherche  comprte le meme userID enregistre 
            //que le userid qui fait la requete de modification, en recuperant l userID que nous avons ajouté à la verification du token dans middleware auth.js
              res.status(401).json({ message : 'Not authorized'});
          } else {
             // 1er argument, la condition pour modifier l element,
    // le 2 eme argument le contenu qui apporte la modification en s assurant de modifier le produit avec l id du parametre de requete dans l url du site
              Thing.updateOne({ _id: req.params.id}, { ...thingObject, _id: req.params.id})
              .then(() => res.status(200).json({message : 'Objet modifié!'}))
              .catch(error => res.status(401).json({ error }));
          }
      })
      .catch((error) => {
          res.status(400).json({ error });
      });

  };

  // function semantique de la logique routing router.delete("/:id")
  exports.deleteThing=  (req, res, next) => {
    Thing.deleteOne({ _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
      .catch(error => res.status(400).json({ error }));
  };

  // function semantique de la logique routing router.get("/:id") 
  exports.getOneThing= (req, res, next) => {
    Thing.findOne({_id:req.params.id})// recupere  le parametre id de l url du site dans l _id du thing de la base de données pour recupere le produit avec la condition suivante: produit correspondant l id parametre url et à _id du produit de la base de donnée
      .then(thing => res.status(200).json(thing)) // execute un instruction sur la promesse retourné par findOne(), envoit la reponse sous forme de promesse avec le produit et l identifiant correspondant que findOne a trouvé
      .catch(error => res.status(404).json({ error }));
  };

  // function semantique de la logique routing router.get("/") 
  exports.getAllThing=  (req, res, next) => {
    Thing.find()// recupere tous les elements du modele Thing
      .then(things => res.status(200).json(things)) // then evite les call back a l interieur de la fonction find, execute un instruction sur la promesse retourné par find()
      .catch(error => res.status(400).json({ error }));
      console.log("requête: authentifié avec auth",req.auth)
  };


   