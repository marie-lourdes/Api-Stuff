// creation du serveur node.js sans express avec le module  de base "http" de node js
const http = require("http") ;// indiquer plutot https pour le certificat ssl, sans chemin relatif car c est un module de base de node
const app= require("./app")// indique le chemin relatif car app.js  n est pas un module de base de Node

app.set("port",process.env.PORT || 3000);// installe le parametre port dans l application express dans app
const server= http.createServer(app);// appel des methodes et fonctions du module app.js dans le server crée

// PORT variable d environnement  avec la valeur du port  par defaut selon le systeme d exploitation de l appareil
// soit le serveur ecoute sur le port par defaut de l appareil ou sur le port 3000
server.listen(process.env.PORT || 3000); 
// attend les requete et ecoute le port avec l application app express  avec le parametre port installé dans app et qui traitera les requetes et reponse dans le module app.js
