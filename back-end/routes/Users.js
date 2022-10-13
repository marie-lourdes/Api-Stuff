const express = require('express');
const router = express.Router();// creation de l objet router avec la methode express express.Router()

//import du module controllers Users.js pour acceder au methode /fonctions semantiques du module
const userCtrler = require('../controllers/Users');

// execution des fonctions semantic signup du controllers userCtrler sur la route individuelle "/signup"
router.post('/signup', userCtrler.signup);
// execution des fonctions semantic login du controllers  userCtrler  sur la route individuelle "/login"
router.post('/login', userCtrler.login);

module.exports = router;// exporte l objet router contenant les routes individuel et les fonctions semantiques du controllers pour le rendre accessible dans le fichier app.js