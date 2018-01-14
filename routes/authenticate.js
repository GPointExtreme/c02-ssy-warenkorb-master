const Request = require('request');
const express = require('express');
const router = express.Router();

Request.post({
    url: 'http://localhost:3000/routing/',
    json: { name: 'authenticate',
            url: 'http://localhost:3000/authenticate/'
    }
});

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