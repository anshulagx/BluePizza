var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var EmotionDataSchema = new Schema(
  {
    "timestamp": {
      "type": "String"
    },
    "userId": {
      "type": "String"
    },
    "emotions": {
      "type": [
        "Number"
      ]
    },
    "isPresent": {
      "type": "Boolean"
    }
  });
//Export model
module.exports = mongoose.model('EmotionData', EmotionDataSchema);
