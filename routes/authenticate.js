const express = require('express');
const router = express.Router();

router.post("/", authenticate);

function authenticate(request, response) {
	if (request.body.password === "password") {
		response.json({
			username: request.body.username,
			until: Date.now() + 60000
		});
	}
	else {
		response.json(false);
	}
}

function checkAuthentication(token) {
	return (token.until >= Date.now());
}

module.exports = {
	router: router,
	checkAuth: checkAuthentication
}