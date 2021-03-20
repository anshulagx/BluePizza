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
      "angry": {
        "type": "Number"
      },
      "disgust": {
        "type": "Number"
      },
      "fear": {
        "type": "Number"
      },
      "happy": {
        "type": "Number"
      },
      "sad": {
        "type": "Number"
      },
      "surprise": {
        "type": "Number"
      },
      "neutral": {
        "type": "Number"
      }
    },
    "isPresent": {
      "type": "Boolean"
    }
  });
//Export model
module.exports = mongoose.model('EmotionData', EmotionDataSchema);
