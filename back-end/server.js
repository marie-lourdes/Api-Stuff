// creation du serveur node.js sans express avec le module  de base "http" de node js
const http = require("http") ;// indiquer plutot https pour le certificat ssl

const server= http.createServer((req,res)=>{// methode "createserver"de l objet http avec fonction call back qui prend en parametre requete et reponse
    res.end("voilà la réponse du serveur");
});

// PORT variable d environnement  avec la valeur du port  par defaut selon le systeme d exploitation de l appareil
// soit le serveur ecoute sur le port par defaut de l appareil ou sur le port 3000
server.listen(process.env.PORT || 3000) 
