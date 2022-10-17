const multer = require("multer");

const MIME_TYPES = { // definition des valeurs extension pour la propriété mimetype de file
  'image/jpg': 'jpg',
  'image/jpeg': 'jpg',
  'image/png': 'png'
};

// objet de configuration stoké la variable storage avec l option de multer nommé storage
const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, 'images');// on indique qu il n y a aucune erreur a ce niveau
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(' ').join('_');// nous ajoutons des underscore au nom du fichier pour eviter des erreurs lors de l enregistremnt du fichier par le serveur
    const extension = MIME_TYPES[file.mimetype];
    callback(null, name + Date.now() + '.' + extension);
    // on rend le nom du fichier unique en ajoutant le temps en milliseconde lors du telechargement et l extension qui prendra la valeur d'un des 3 format mimetype indiqué dans le dico MIME_TYPE
  }
});

module.exports = multer({storage: storage}).single('image'); //ou multer({storage})
// accepte un seul fichier avec du nom du fielname (nom de champs type file), multer saura dans quel champs du formulaire il doit stocké l image telechargé <input type=file name="fieldname">