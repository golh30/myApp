"use strict";

var userCtrl = require("../../controller/user/userControl");
var LOG = require("../../appUtil/logger");
var statics = require('../../appUtil/appStatic');
var componentName = "userAction";
var api = {};

api.search = function(req, res, next){
	var params = {
		logId: req.body.logId || "",
		searchBy: req.body.searchBy
	};
	LOG.info(componentName + ".search", req.body.logId, params);

	if(req.body.loginToken && req.body.logId){

		userCtrl.search(params, function(err, result){

			if(err){
				LOG.error(componentName + ".search", req.body.logId, params);
				req.body.respoJson = err;
			}
			else{
				var jsonObj = statics.commonError.active;

				var presult = [];

				result.forEach(function(r) {

					const allData = {};

					allData.profileStatus 	= r.profileStatus;
					allData.basic 			= r.basic;
					allData.education 		= r.education;
					allData.family 			= r.family;
					allData.professional 	= r.professional;
					allData.horoscope 		= r.horoscope;
					allData.lifeStyle 		= r.lifeStyle;
					allData.contact 		= r.contact;
					allData.desiredPartner 	= r.desiredPartner;
					allData.parnicYoga 		= r.parnicYoga;
					allData.profileImage 	= r.profileImage;
					allData.visibleProfile 	= r.visibleProfile;
					allData.userid 			= r.userid;
					allData._id 			= r._id;
					allData.age 			= calculateAge(r.basic.DOB);

					presult.push(allData);
				});

				var jsondata = {
					status: jsonObj.status,
					code: jsonObj.code,
					displayMsg: jsonObj.displayMsg,
					data: presult
				};
				
				LOG.info(componentName + ".search", req.body.logId, params);
				req.body.respoJson = jsondata;
			}

			next();
		});

	}else{
		LOG.error(componentName + ".search", req.body.logId, params);
		next();
	}
};

api.sendInterest = function (req, res, next) {
	//userCtrl
};

api.acceptInterest = function (req, res, next) {
	//userCtrl
};

api.viewProfile = function (req, res, next) {
	//userCtrl
};


function calculateAge(dob){
    var currentdate = new Date();
    var dateTime = new Date(dob.split('/')[2], dob.split('/')[1], dob.split('/')[0]);

    var timeDiff = Math.abs(currentdate.getTime() - dateTime.getTime());
    var diffDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
    return (diffDays / 365).toString().split(".")[0];
}

module.exports = api;