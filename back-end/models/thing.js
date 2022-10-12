const mongoose = require( "mongoose" );


// creation du shema a exporter dans un model
//on ajoute pas le champs id car l id est generé automatiquement par la base de données mongoDB

const thingSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  imageUrl: { type: String, required: true },
  userId: { type: String, required: true },
  price: { type: Number, required: true }, // objet de configuration des données, valeur des propriétés  de l objet thingShema
});

// On crée un model qu on exporte avec la valeur de l objet shema
module.exports = mongoose.model('Thing', thingSchema);// model()  est constructor et fais la copie de la structure de thingshema avec les donnéés inséeres a chaque fois qu il est appelé par le mot clé new sans recréer la collection 
// le nom du model est transformé par mongodb en miniuscule et au pluriel à la creation de la collection si elle n existe pas 