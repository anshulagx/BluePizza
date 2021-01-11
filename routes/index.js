var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/teacher', function(req, res, next) {
  res.render('dyte-page', {type: "teacher", roomName: 'field-satellite', authToken: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQxYzhjMTI1LTQ0NGUtNDM5Zi05YzI5LTAyMThkZTFjZWY3OCIsImxvZ2dlZEluIjp0cnVlLCJpYXQiOjE2MDc0MzQxMjUsImV4cCI6MTYwNzUyMDUyNX0.WA0kNwnjVoXRbFHJBIGZXaaHYz5cSOPLvwZ6pn_MHdOuO6IyqAh2_MHL43qtM2VLGMSyxG68LWD_rh_h2mz7RlS3N7Y197MIFd_1Qc2if89fMkOaThm4-jI4mPepKhffSCoSiSaJT58ekgjn82w2kO77VUOSc2Wom-CziKB3fovVHzU0H9l7pxkGGQselY4nm81B-p0KJPL4vDJXuDBDSmJSleeaQMw0T_lszI4z8C8W5J3pfU3yLp_dObz3klrlsh0DruUrEYYTdUGHtQ5jiF86l8XDp0ZM5Xamv8OGAJ0KBYHRToE84cLx84q8Fp_pSqtSyDwc3c5KfhmNbVw4yA"});
});

router.get('/student', function(req, res, next) {
  res.render('dyte-page', {type: "student", roomName: 'field-satellite', authToken: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImQxYzhjMTI1LTQ0NGUtNDM5Zi05YzI5LTAyMThkZTFjZWY3OCIsImxvZ2dlZEluIjp0cnVlLCJpYXQiOjE2MDc0MzQxMjUsImV4cCI6MTYwNzUyMDUyNX0.WA0kNwnjVoXRbFHJBIGZXaaHYz5cSOPLvwZ6pn_MHdOuO6IyqAh2_MHL43qtM2VLGMSyxG68LWD_rh_h2mz7RlS3N7Y197MIFd_1Qc2if89fMkOaThm4-jI4mPepKhffSCoSiSaJT58ekgjn82w2kO77VUOSc2Wom-CziKB3fovVHzU0H9l7pxkGGQselY4nm81B-p0KJPL4vDJXuDBDSmJSleeaQMw0T_lszI4z8C8W5J3pfU3yLp_dObz3klrlsh0DruUrEYYTdUGHtQ5jiF86l8XDp0ZM5Xamv8OGAJ0KBYHRToE84cLx84q8Fp_pSqtSyDwc3c5KfhmNbVw4yA"});
});

router.get('/', function(req, res, next) {
  res.render('index');
});

module.exports = router;
