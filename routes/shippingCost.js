const Request = require('request');
const express = require('express');
const router = express.Router();
const checkAuth = require('./authenticate').checkAuth;

Request.post({
    url: 'http://localhost:3000/routing/',
    json: { name: 'shippingCost',
        url: 'http://localhost:3000/shippingCost/'
    }
});

router.post("/", calculateShippingCost);

function calculateShippingCost(request, response) {
	if (!checkAuth(request.body.token)) {
		response.json(false);
		return;
	}
	
	let products = request.body.cart;
	
	let weight = 0;
	let numProducts = 0;
	
	for (let product of products) {
		weight += product.Gewicht;
		numProducts += product.Menge;
	}
	
	let shippingCost = numProducts * 0.5;
	
	if(weight < 1000) {
		shippingCost += 1;
	}
	else if (weight < 5000) {
		shippingCost += 3;
	}
	else {
		shippingCost += 5;
	}
	
	response.json(shippingCost);
}

module.exports = router;