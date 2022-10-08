const http = require('http');
const app = require('./app');

const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) { // si cest port est  string, renvoit le port de env ou 3000
    return val;
  }
  if (port >= 0) {// si port est un nombre  renvoyé par parseInt, renvoit le resultat de parseInt
    return port;
  }
  return false;// si port ne rentre pas dans la condition isNan (si c est un string) et ne rentre pas dans la condition d etre un nombre, la fonction normaliseport retourne false dans la variable port ci dessous
};
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const errorHandler = error => {
  if (error.syscall !== 'listen') {// les erreurs de sytems ont des nom, systemcall renvoit une chaine de caractere avec le nom de l erreur de l appel du system
   
    throw error; //stoppe le programme et fournit la valeur de l exception  stocker ds "error" 
  }
 
  const address = server.address();
  /*  Lorsqu'une socket est créée avec socket(point de terminaison) , elle existe sous un nom
       espace (famille d'adresses) mais n'a pas d'adresse qui lui soit assignée.  bind ()
       attribue l'adresse spécifiée par addr à la socket référencée
       par le descripteur de fichier sockfd .  addrlen spécifie la taille, en
       octets, de la structure d'adresse pointée par addr .
       Traditionnellement, cette opération s'appelle « attribuer un nom à un
       prise"*/
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port; 
  switch (error.code) {
    // erreur.code:prorieté code renvoit une chaine avec le code de l erreur du systeme couramment rencontré lors de l ecriture d un programme Node
    //, switch verifie la valeur retourné de code avec diffrent code erreur ci dessous
    case 'EACCES':// Autorisation refusée) :
 // une tentative d'accès à un fichier d'une manière interdite par ses autorisations d'accès au fichier a été effectuée.
      console.error(bind + ' requires elevated privileges.');
      process.exit(1); //le code 1 force l echec du process, le code 0 : code succes par defaut 
    //  mieux vaut definir en amont avec process.exitCode= "le code", le code de sortie du process a definir lorsque le process node se termine normalement, node peut au moins terminer sa boucle d evenement sans forcer l/ echec
      break;

    case 'EADDRINUSE'://(Adresse déjà utilisée) :
    // Une tentative de liaison d'un serveur ( net, http, ou https) à une adresse locale a échoué car un autre serveur sur le système local occupait déjà cette adresse.
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
      
   /*  default definit le block de code par defaut qui sera execute 
   si l instruction switch ne trouve auucne correspondance de valeurs(dans les case) avec la valeur de error.code*/
    default: 
      throw error;
  }
};

const server = http.createServer(app);

server.on('error', errorHandler); //0n() est un ecouteeur d evenemnt, ici l ecouteur d evenment ecoute les evenement erreur qui se produit sur le server)
server.on('listening', () => { // ecoute les evenement nomme listening qui se produit sur server
  const address = server.address();
  console.log(address);
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port);