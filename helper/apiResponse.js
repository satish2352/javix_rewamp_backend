exports.successResponse = function (res, msg) {
	var data = {
		result: true,
		message: msg
	};
	return res.status(200).json(data);
};

exports.successResponseWithData = function (res, msg, data) {
	var resData = {
		result: true,
		message: msg,
		data: data
	};
	return res.status(200).json(resData);
};

exports.ErrorResponse = function (res, msg) {
	var data = {
		result: false,
		message: msg,
	};
	return res.status(500).json(data);
};
exports.ErrorResponseWithData = function (res, msg,data) {
	var resData = {
		result: false,
		message: msg,
		data: data
	};
	return res.status(500).json(resData);
};

exports.notFoundResponse = function (res, msg) {
	var data = {
		result: false,
		message: msg,
	};
	return res.status(404).json(data);
};

exports.validationErrorWithData = function (res, msg, data) {
	var resData = {
		result: false,
		message: msg,
		data: data
	};
	return res.status(400).json(resData);
};

exports.unauthorizedResponse = function (res, msg) {
	var data = {
		result: false,
		message: msg,
	};
	return res.status(401).json(data);
};