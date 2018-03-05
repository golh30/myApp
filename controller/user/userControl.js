"use strict";

//globals
var userSchema = require("../../model/userSchema");
var Log = require("../../appUtil/logger");
var statics = require("../../appUtil/appStatic");
var debug = require("debug")("userControl");
var userProfile = require("../../model/userProfileSchema");
var utils = require("../../appUtil/commonUtil");

//constants
var userObj = {};
var componentName = "controller.user.userControl";

/**
 * [login description]
 * @param  {[type]} params [description]
 * @param  {[type]} callb  [description]
 * @return {[type]}        [description]
 */
userObj.login = function(params, callb){
	var error = {};
	var query = {
		username: params.username,
		pass: params.pass
	};
	var subComp = ".login";
	var logId = params.logId;

	userSchema.find(query, function(err, result){
		if(err){
			error.msg 		= statics.commonError.serverErr.displayMsg;
			error.status 	= statics.commonError.serverErr.status;
			error.code 		= statics.commonError.serverErr.code;
			error.logId 	= logId;
			error.err 		= err;

			Log.error(componentName + subComp, logId, err);
			return callb(error);
		}

		if(!result || result.length < 1){
			error.msg 		= statics.commonError.unAuthenticate.displayMsg;
			error.status 	= statics.commonError.unAuthenticate.status;
			error.code 		= statics.commonError.unAuthenticate.code;
			error.logId 	= logId;
			error.err 		= "no record found or wrong loginToken" + JSON.stringify(query);

			Log.error(componentName + subComp, logId, error);
			return callb(error);
		}

		if(result[0] && result[0].isEnabled != 1){
			error.msg 		= statics.commonError[statics.usrStatus[result[0].isEnabled]].displayMsg
			error.status 	= statics.commonError[statics.usrStatus[result[0].isEnabled]].status;
			error.code 		= statics.commonError[statics.usrStatus[result[0].isEnabled]].code;
			error.logId 	= logId;
			error.err 		= "not eligible user for this action" + JSON.stringify(query);
			
			Log.error(componentName + subComp, logId, error);
			return callb(error);
		}

		Log.info(componentName + subComp, logId, result);

		var logInData = {
			username: result[0].username,
			loginToken: result[0].loginToken,
			isEnabled: result[0].isEnabled,
			profId: result[0].profId
		};

		return callb(null, logInData);
	});
};

/**
 * [logout description]
 * @param  {[type]} params [description]
 * @param  {[type]} callb  [description]
 * @return {[type]}        [description]
 */
userObj.logout = function(params, callb){
	var error = {};
	var query = {
		username: params.username,
		loginToken: params.loginToken
	};
	var subComp = ".logout";
	var logId = params.logId;

	userSchema.find(query, function(err, result){
		if(err){
			error.msg 		= statics.commonError.serverErr.displayMsg;
			error.status 	= statics.commonError.serverErr.status;
			error.code 		= statics.commonError.serverErr.code;
			error.err 		= err;
			error.logId 	= logId;

			Log.error(componentName + subComp + "#1", logId, err);
			return callb(error);
		}

		if(!result || result.length < 1){
			error.msg 		= statics.commonError.unAuthenticate.displayMsg;
			error.status 	= statics.commonError.unAuthenticate.status;
			error.code 		= statics.commonError.unAuthenticate.code;
			error.logId 	= logId;
			error.err 		= "no record found or wrong loginToken" + JSON.stringify(query);

			Log.error(componentName + subComp + "#2", logId, error);
			return callb(error);
		}

		if(result[0] && result[0].isEnabled != 1){
			error.msg 		= statics.commonError[statics.usrStatus[result[0].isEnabled]].displayMsg
			error.status 	= statics.commonError[statics.usrStatus[result[0].isEnabled]].status;
			error.code 		= statics.commonError[statics.usrStatus[result[0].isEnabled]].code;
			error.logId 	= logId;
			error.err 		= "not eligible user for this action" + JSON.stringify(query);
			
			Log.error(componentName + subComp + "#3", logId, error);
			return callb(error);
		}

		Log.info(componentName + subComp + "#4", logId, result);

		var logInData = {
			loginToken: result[0].loginToken,
		};

		return callb(null, logInData);
	});
};

/**
 * [registration description]
 * @param  {[type]} params [description]
 * @param  {[type]} callb  [description]
 * @return {[type]}        [description]
 */
userObj.registration = function(params, callb){
	var error = {};
	var query = {

	};
	var subComp = ".search";
	var logId = params.logId;

	var createProfileSchema = {
	    "userid" : "AM" + utils.uuid(4, "AN"),
	    "profileStatus" : {
	        "certificatedUploaded" : 0,
	        "certificatedApproved" : 0,
	        "profileInSearch" : 0,
	        "imagesApproved" : 0,
	        "loginToken" : ""
	    },
	    "basic" : {
	        "firstName" : params.name,
	        "middleName" : "",
	        "lastName" : "",
	        "DOB" : params.dob,
	        "TOB" : "",
	        "complex" : "",
	        "disablity" : "",
	        "gender" : params.gender,
	        "aboutMe" : "",
	        "height" : "",
	        "weight": "",
	        "maritialStatus" : "",
	        "languageknown" : [],
	        "belongsToCountry" : params.country,
	        "belongsToState" : "",
	        "belongsToCity" : "",
	        "currentToCountry" : "",
	        "currentToState" : "",
	        "currentToCity" : "",
	        "profileManagedBy" : "",
	        "religion": "",
	        "cast" : ""
	    },
	    "education" : {
	        "hightestEdu" : "",
	        "PG" : "",
	        "PGCollege" : "",
	        "UG" : "",
	        "UGCollege" : ""
	    },
	    "family" : {
	        "about" : "",
	        "familyStatus" : "",
	        "familyType" : "",
	        "familyValues": "",
	        "familyIncome" : "",
	        "fatherOccupation" : "",
	        "motherOccupation" : "",
	        "brothers" : 0,
	        "sisters" : 0
	    },
	    "professional" : {
	        "about" : "",
	        "orgName" : "",
	        "occupation" : "",
	        "currency": "",
	        "annualIncome" : "",
	        "orgType" : ""
	    },
	    "horoscope" : {
	        "mustMatch" : 0,
	        "rashi" : "",
	        "nakshatra" : "",
	        "manglik" : ""
	    },
	    "lifeStyle" : {
	        "vegetarian" : 0,
	        "NonVegetarian": 0,
	        "Egaetarian": 0,
	        "smoke" : 0,
	        "smokeOcc" : 0,
	        "drink" : 0,
	        "drinkOcc" : 0,
	        "ownHouse" : 0,
	        "ownCar" : 0,
	        "cooking" : 0,
	        "hobbies" : [],
	        "about" : ""
	    },
	    "contact" : {
	        "email" : params.username,
	        "phone_no" : "",
	        "mobile" : params.mobile
	    },
	    "desiredPartner" : {
	        "horoscope" : [""],
	        "vegiterian" : 0,
	        "smoke" : 0,
	        "drink" : 0,
	        "hroscoperMustMatch" : 0,
	        "annualIncomeMin" : 0,
	        "annualIncomeMax" : 0
	    },
	    "visibleProfile" : {},
	    "parnicYoga" : {
	        "arhaticLevel" : "",
	        "isTrainer" : 0,
	        "trainerLevel" : "",
	        "healing" : [
	        ],
	        "spritual" : [ 
	        ],
	        "prosperity" : [
	        ]
	    },
	     "profileImage" : ""
	};
	var userprofileSchem = new userProfile(createProfileSchema);

	userprofileSchem.save(function(err, res){
		if(err){
			error.msg 		= statics.commonError.serverErr.displayMsg;
			error.status 	= statics.commonError.serverErr.status;
			error.code 		= statics.commonError.serverErr.code;
			error.logId 	= logId;
			error.err 		= err;

			Log.error(componentName + subComp, logId, err);
			return callb(error);
		}

		var LoginSchema = {
			"username" 		: params.username,
			"pass" 			: params.pass,
			"loginToken" 	: "",
			"createdOn" 	: new Date(),
			"modifiedOn" 	: new Date(),
			"isEnabled" 	: 1,
			"profId"		: res._id
		};

		var newUserSchema = new userSchema(LoginSchema);
		newUserSchema.save(function(er, re){

			if(er){
				error.msg 		= statics.commonError.serverErr.displayMsg;
				error.status 	= statics.commonError.serverErr.status;
				error.code 		= statics.commonError.serverErr.code;
				error.logId 	= logId;
				error.err 		= err;

				Log.error(componentName + subComp, logId, er);
				return callb(error);
			}

			Log.info(componentName + subComp, logId, res);
			return callb(null, re);

		});
	});
};

/**
 * [search description]
 * @param  {[type]} params [description]
 * @param  {[type]} callb  [description]
 * @return {[type]}        [description]
 */
userObj.search = function(params, callb){
	var error = {};
	var query = params.searchBy;
	var subComp = ".search";
	var logId = params.logId;
	var obj = buildQuery(query);

	userProfile.find(obj, function(err, res){
		if(err){
			error.msg 		= statics.commonError.serverErr.displayMsg;
			error.status 	= statics.commonError.serverErr.status;
			error.code 		= statics.commonError.serverErr.code;
			error.logId 	= logId;
			error.err 		= err;

			Log.error(componentName + subComp, logId, err);
			return callb(error);
		}

		if(!res || res.length < 1){
			error.msg 		= statics.commonError.unAuthenticate.displayMsg;
			error.status 	= statics.commonError.unAuthenticate.status;
			error.code 		= statics.commonError.unAuthenticate.code;
			error.logId 	= logId;
			error.err 		= "no record found or wrong loginToken" + JSON.stringify(query);

			Log.error(componentName + subComp, logId, error);
			return callb(error);
		}

		return callb(null, res);

	});
};

/**
 * [getProfile description]
 * @param  {[type]} params [description]
 * @param  {[type]} callb  [description]
 * @return {[type]}        [description]
 */
userObj.getProfile = function(params, callb){
	var error = {};
	var query = {
		_id: params.profId
	};
	var subComp = ".getProfile";
	var logId = params.logId;

	userProfile.find(query, function(err, res){
		if(err){
			error.msg 		= statics.commonError.serverErr.displayMsg;
			error.status 	= statics.commonError.serverErr.status;
			error.code 		= statics.commonError.serverErr.code;
			error.logId 	= logId;
			error.err 		= err;

			Log.error(componentName + subComp, logId, err);
			return callb(error);
		}

		if(!res || res.length < 1){
			error.msg 		= statics.commonError.unAuthenticate.displayMsg;
			error.status 	= statics.commonError.unAuthenticate.status;
			error.code 		= statics.commonError.unAuthenticate.code;
			error.logId 	= logId;
			error.err 		= "no record found or wrong loginToken" + JSON.stringify(query);

			Log.error(componentName + subComp, logId, error);
			return callb(error);
		}

		return callb(null, res);

	});
};

/**
 * [checkEmail description]
 * @param  {[type]} params [description]
 * @param  {[type]} callb  [description]
 * @return {[type]}        [description]
 */
userObj.checkEmail = function(params, callb){
	var error = {};
	var query = {
		username: params.username
	};
	var subComp = ".checkEmail";
	var logId = params.logId;

	userSchema.find(query, function(err, result){
		if(err){
			error.msg 		= statics.commonError.serverErr.displayMsg;
			error.status 	= statics.commonError.serverErr.status;
			error.code 		= statics.commonError.serverErr.code;
			error.logId 	= logId;
			error.err 		= err;

			Log.error(componentName + subComp, logId, err);
			return callb(error);
		}

		if(!result || result.length < 1){
			return callb(null, "available");
		}

		Log.info(componentName + subComp, logId, result);

		return callb(null, "not available");
	});
};

userObj.updateProfile = function(params, callb){
	var error = {};
	var subComp = ".updateProfile";
	var logId = params.logId;

	var createProfileSchema = {
	    "userid" : params.userid,
	    "profileStatus" : params.profileStatus,
	    "basic" : params.basic,
	    "education" : params.education,
	    "family" : params.family,
	    "professional" : params.professional,
	    "horoscope" : params.horoscope,
	    "lifeStyle" : params.lifeStyle,
	    "contact" : params.contact,
	    "desiredPartner" : params.desiredPartner,
	    "visibleProfile" : params.visibleProfile,
	    "parnicYoga" : params.parnicYoga,
	    "profileImage" : params.profileImage
	};

	Log.info(componentName + subComp, logId, createProfileSchema);

	userSchema.update({"_id": params.profileID}, {"$set": createProfileSchema}, function(err, res){
		if(err){
			error.msg 		= statics.commonError.serverErr.displayMsg;
			error.status 	= statics.commonError.serverErr.status;
			error.code 		= statics.commonError.serverErr.code;
			error.logId 	= logId;
			error.err 		= err;

			Log.error(componentName + subComp, logId, err);
			return callb(error);
		}

		Log.info(componentName + subComp, logId, res);
		return callb(null, res);
	});
};

module.exports = userObj;

function buildQuery(parameter) {
	var obj = {};
	if(parameter.hasOwnProperty("firstName")) {
		obj["basic.firstName"] = parameter.firstName;
	} else if(parameter.hasOwnProperty("lastName")) {
		obj["basic.lastName"] = parameter.lastName;
	} else if(parameter.hasOwnProperty("weight")) {
		obj["basic.weight"] = parameter.weight;
	} else if(parameter.hasOwnProperty("height")) {
		obj["basic.height"] = parameter.height;
	} else if(parameter.hasOwnProperty("religion")) {
		obj["basic.religion"] = parameter.religion;
	} else if(parameter.hasOwnProperty("cast")) {
		obj["basic.cast"] = parameter.cast;
	} else if(parameter.hasOwnProperty("profession")) {
		obj["professional.about"] = parameter.profession;
	} else if(parameter.hasOwnProperty("annualIncome")) {
		obj["professional.annualIncome"] = parameter.annualIncome;
	}
	return obj;
}

(function(){
	if(require.main == module){
		var params = {
			"username": "test@test.com",
			"pass": "123",
			"logId": "tg6fghdsdsdfok9eudhieu"
		};

		userObj.login(params, function(err, rust){
			console.log(err, rust);
			//process.exit(0);
		});
	}
}());