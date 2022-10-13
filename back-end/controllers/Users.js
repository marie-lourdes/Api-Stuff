// import du module bcrypt pour la fonction de creation de compte signup pour securiser le code enregistré dans la base de données
const bcrypt= require("bcrypt");
//import du model User qui sera enregistré dans la base de données avec les fonctions signup et login
const User= require("../models/Users");

exports.signup = (req, res, next) => {
    //on demande a l 'algorithme de bcrypt de hasher et anlyser 10 fois le mot de passe
    bcrypt.hash(req.body.password, 10)// on crypte le mot de passe que l utilisateur entre lors de la requete post via le formulaire d inscription
    .then(hash => { // on recupere le resultat de la promesse envoyer par la methode hash() et on l enregistre dans l instance de model User
      const user = new User({
        // les données email et password de la "const user" sont stocké dans le model 
        //qui copie la structure de usershema et les données inseré lors de l enregistrement ds la base de données
        // a chaque appel avec le mot clé "new" du constructor model() dans la variable User=require("../models/Users) valeur actuel de l'objet exports=mongoose.model("User", userShema) du module model Users.js
        email: req.body.email,
        password: hash
      });
      user.save()// a l enregistrement du model la premiere fois, le nom du model User sera transformé par mongodb au pluriel et miniuscule"users"
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));//status 400 erreur de requte 
    })
    .catch(error => res.status(500).json({ error }));// status 500 erreur serveur api pour le crytage du mot de passe 

};

exports.login = (req, res, next) => {

};