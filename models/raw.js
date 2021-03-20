var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var rawSchema = new Schema(
{
    "timestamp": {
      "type": "Date"
    },
    "trigger": {
      "type": "String"
    },
    "type": {
      "type": "String"
    },
    "studentID": {
      "type": "String"
    },
    "meetingID": {
      "type": "String"
    }
  });
  //Export model
module.exports = mongoose.model('rawData', rawSchema);