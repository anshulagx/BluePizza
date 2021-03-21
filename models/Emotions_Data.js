var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var EmotionDataSchema = new Schema(
  {
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
      },
      "degree": {
        "type": "Number"
      }
    },
    "isPresent": {
      "type": "String"
    },
    "timestamp": {
      "type": "Date"
    }
  });
//Export model
module.exports = mongoose.model('emotions_data', EmotionDataSchema);
