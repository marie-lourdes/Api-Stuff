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
module.exports = mongoose.model('Thing', thingSchema);