const jwt = require('jsonwebtoken');
 
module.exports = (req, res, next) => {
   try {
       const token = req.headers.authorization.split(' ')[1];// recupere la valeur du token dans le header authorization envoyé dans la requete de l utilisateur
       // verify() decode le token à l aide de la chaine secrete(algorithm de cryptage), envoit un objet de decodage , si il n a pas ete decodé, la valeur de l objet de decodage sera "undefined"
       const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
       const userId = decodedToken.userId;// on recupere le token decode et sa propriété userId
       req.auth = {// creation de l objet auth dans l objet request qui sera transmis dans l objet request du gestionnaire de route, lorsque le middleware d authentification apellera la gestionnaire de route suivant  avec la fonction callback next() 
           userId: userId
       };
	next();
   } catch(error) {
       res.status(401).json({ error });
   }
};