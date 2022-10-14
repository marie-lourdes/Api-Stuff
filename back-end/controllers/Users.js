// import du module bcrypt pour la fonction de creation de compte signup pour securiser le code enregistré dans la base de données
const bcrypt= require("bcrypt");

//import du package pour generer et encoder le token d authentification
const jwt= require("jsonwebtoken")

//import du model User qui sera enregistré dans la base de données avec les fonctions signup et login
const User= require("../models/Users");

//............... fonction controllers sign up pour l inscription/la creation d un compte utilisateur.....................
exports.signup = (req, res, next) => {
    //on demande a l 'algorithme de bcrypt de hasher et anlyser 10 fois le mot de passe
    bcrypt.hash(req.body.password, 10)// on crypte le mot de passe que l utilisateur entre lors de la requete post via le formulaire d inscription
    .then(hash => { // on recupere le resultat de la promesse envoyé par la methode hash(): le mode de passe hashé et on l enregistre dans l instance de model User
      const user = new User({
        // les données email et password de la "const user" sont stocké dans le model 
        //qui copie la structure de usershema et les données inseré lors de l enregistrement ds la base de données
        // a chaque appel avec le mot clé "new" du constructor model() dans la variable User=require("../models/Users) valeur actuel de l'objet exports=mongoose.model("User", userShema) du module model Users.js
        email: req.body.email,
        password: hash
      });
      user.save()// a l enregistrement du model la premiere fois, le nom du model User sera transformé par mongodb au pluriel et miniuscule"users"
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))
        .catch(error => res.status(400).json({ error }));//status 400 erreur de requête POST de l utilisateur
    })
    .catch(error => res.status(500).json({ error }));// status 500 erreur serveur api pour le cryptage du mot de passe 

};

//............... fonction controllers login pour la verification de connexion  utilisateur (identifiants email et mode passe).....................
exports.login = (req, res, next) => {
   User.findOne({ email: req.body.email })
    .then(user => { //then recupere et verifie le resultat de la promesse renvyé par la methode findOne()
        if (!user) { //si l email à retrouver n existe pas ,   n est pas retrouvé dans la base de données, absente, donc false !user dans le resultat de  la promesse de findOne 
            return res.status(401).json({ message: 'Paire login/mot de passe incorrecte'});// le then envoit une reponse indiquant l erreur 401 acces non autorisé
        }
// la methode compare() verifie dans le resulat " user" recuperé par then:
// ( utilisateur trouvé dans la base de donné via la requete de comparaison de l email de findOne() ) la correspondance du mot de passe de l utilisateu trouvé dans la base de donnée 
// avec le mot de passe entrée dans le formulaire de connexion via la requete POST de l utilisateur
        bcrypt.compare(req.body.password, user.password)// compare() renvoit une valeur booléenne
            .then(valid => {
                if (!valid) {
                    return res.status(401).json({ message: 'Paire login/mot de passe incorrecte' }); //si l email existe mais le mot de passe incorrecte, erreur 401 acces non autorise
                }
                res.status(200).json({
                    userId: user._id,
                    token: jwt.sign( //chiffre un nouveau token
                        { userId: user._id }, // charge utile/paylode:donnée à encoder avec la chaine secrete avec l id utilisateur pour etre sur que le token de la requete corresponde a l utilisateur
                        'RANDOM_TOKEN_SECRET', // cette chaine servira pour le chiffrement et le dechiffrement du token lors de la verification du token dans les requetes signé de l utilisateur
                        { expiresIn: '24h' }// option/objet de configuration du token en option valable 24h
                    )
                });
            })
            .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));

};