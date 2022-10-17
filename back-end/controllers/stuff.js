const Thing = require("../models/thing"); 

//............... fonctions semantiques des logiques metier de l objet router rendu accessibles au module stuff.js de router..........

// function semantique de la logique routing router.post("/") 
exports.createThing = (req, res, next) => {
  exports.createThing = (req, res, next) => {
    const thingObject = JSON.parse(req.body.thing);// convertit l objet body "thing" (ajouté par multer)qui est une chaine json en objet javascript
    delete thingObject._id;
    delete thingObject._userId;
    const thing = new Thing({ // on crée une instance  du model Thing stocké dans la variable thing
        ...thingObject,
        userId: req.auth.userId,
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
  
    thing.save()
    .then(() => { res.status(201).json({message: 'Objet enregistré !'})})
    .catch(error => { res.status(400).json( { error })})
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
   
  

    // on enregistre l'instance de modele thing dans la base de données, une premier fois, transformé par mongoDB avec le nom de model au pluriel et minuscule pour le nom de la collection de mongodb si elle n existe pas deja
    //et on enregistre le shema structuré qui est copié par la methode model()a chaque appel de celle -ci,qui est inseré dans le model nommé "Thing" avec les données  avec la methode save() de mongoose
    thing.save()
      .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
      // save() envoie un promesse, sur ce resultat de la promesse denregistrement de l 'objet  avec then():
      //on envoie la reponse avec le status 201 et le msg en json
      //on recupere l erreur et on envoie le status erreur 400 avec la reponse de la requete et le message d erreur de catch en objet json
      .catch(error => res.status(400).json({ error })); // est le raccourci de.json( {error:error}):error module separé  de l objet error
  };

  // function semantique de la logique routing router.put("/:id")
  exports.modifyThing= (req, res, next) => {
    // 1er argument, la condition pour modifier l element,
    // le 2 eme argument le contenu qui apporte la modification en s assurant de modifier le produit avec l id du parametre de requete dans l url du site
    Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
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


   