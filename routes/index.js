const express = require('express');
const router = express.Router();
const axios = require('axios');
const mongoose = require('mongoose');

var rawModel = require('../models/raw.js');
var EmotionDataModel = require('../models/EmotionData.js')
const orgId = process.env.DYTE_ORG_ID;
const apiKey = process.env.DYTE_API_KEY;
const baseURL = process.env.DYTE_API_BASE_URL;

if(!orgId || !apiKey || !baseURL) {
  console.error("Define org id, API key and base URL to run this app.\nGet one from https://dev.dyte.in/");
  process.exit(0);
}

function connectToDB() {
  //Set up mongoose connection
  var mongoDB = process.env.MONGODB_URL;
  mongoose.connect(mongoDB, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  });
  var db = mongoose.connection;
  db.on('error', console.error.bind(console, 'MongoDB connection error:'));

}

connectToDB();
function mongoWrite(trigger, type, studentID, meetingID, res){
 //send html webpage
 let data={
  "trigger":trigger,
  "type":type,
  "studentID":studentID,
  "meetingID":meetingID,
  "timestamp":new Date()
};

var raw = new rawModel(data);
raw.save(function(err, obj) {
  if (err) {
    console.log("Write Failed");
    return res.status(500).send(err);
  }
  console.log("Data Written");
  return res.status(200).send(obj);
  });
}


/**
 * This exmaples creates a new meeting and then allow you to join that meeting as host participant.
 * 1. User makes a POST call to create a new meeting
 * 2. User can make `/host` and `/participant` GET calls to join the meeting
 */


router.get('/', function (req, res, next) {
  res.render('index');
});

router.get('/event', function (req, res, next) {
  let a = req.query.trigger,b = req.query.type,c=req.query.meetingID,d=req.query.hostID;
  mongoWrite(a,b,d,c,res);
});

router.post('/meeting', async function (req, res, next) {
  const title = req.body.title;

  // 1. Create a meeting with the given title
   const resp = await axios.post(`${baseURL}/v1/organizations/${orgId}/meeting`, {
    title: title || "New test meeting",
  }, {
    headers: {
      'Authorization': `APIKEY ${apiKey}`
    }
  });

  //2. Pass the relevant details to dahboard view
  const meeting = resp.data.data.meeting;
  const roomName = meeting.roomName;
  const meetingId = meeting.id;
  res.render('dashboard', { meetingId: meetingId, roomName });
});

router.get('/participant', async function (req, res, next) {
  //1. Get the meeting ID from the request
  const meetingId = req.query.meetingId;
  const roomName = req.query.roomName;

  //2. Make a call to create a participant
  const resp = await axios.post(`${baseURL}/v1/organizations/${orgId}/meetings/${meetingId}/participant`, {
    clientSpecificId: Math.random().toString(36).substring(7),
    userDetails: {
      "name": "Participant" + Math.random().toString(36).substring(2)
    },
  }, {
    headers: {
      'Authorization': `APIKEY ${apiKey}`
    }
  });

  //3. Pass the relevant details to the page with client SDK
  const authResponse = resp.data.data.authResponse;
  const authToken = authResponse.authToken;
  res.render('dyte-page', { type: "teacher", roomName , authToken, orgId, baseURL });
});

router.get('/host', async function (req, res, next) {
  //1. Get the meeting ID from the request
  const meetingId = req.query.meetingId;
  const roomName = req.query.roomName;

  //2. Make a call to create a participant with role `host`.
  //   `host` and `participant` roles are added by default to org.
  const resp = await axios.post(`${baseURL}/v1/organizations/${orgId}/meetings/${meetingId}/participant`, {
    clientSpecificId: Math.random().toString(36).substring(7),
    userDetails: {
      "name": "Host" + Math.random().toString(36).substring(2)
    },
    roleName: "host"
  }, {
    headers: {
      'Authorization': `APIKEY ${apiKey}`
    }
  });

  //3. Pass the relevant details to the page with client SDK
  const authResponse = resp.data.data.authResponse;
  const authToken = authResponse.authToken;
  res.render('dyte-page', { type: "teacher", roomName , authToken, orgId, baseURL });
});

function writeEmotions(data, res){

  var emotionData = new EmotionDataModel(data);

  emotionData.save(function(err, obj) {
    if (err) {
      console.log("New emotion creation failed");
      return res.status(500).send(err);
    }
    console.log("Emotion Added");
    return res.status(200).send(obj);
  });

}


router.post("/postExpData",(req, res) => {
  console.log(req.body);
  writeEmotions(req.body, res);
});

module.exports = router;
