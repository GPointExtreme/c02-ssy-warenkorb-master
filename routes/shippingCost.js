const express = require('express');
const router = express.Router();

router.post("/", calculateShippingCost);

function calculateShippingCost(request, response) {
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