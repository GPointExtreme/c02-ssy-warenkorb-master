const express = require('express');
const router = express.Router();
const checkAuth = require('./authenticate').checkAuth;

router.post("/", calculateDiscount);

function calculateDiscount(request, response) {
	if (!checkAuth(request.body.token)) {
		response.json(false);
		return;
	}
	
	let products = request.body.cart;
	
	let discount = 0;
	let total = 0;
	
	for(let product of products) {
		total += product.Menge * product.Preis;
		
		if(product.Menge > 1) {
			discount += product.Preis * 0.1;
		}
		if (product.Menge > 2) {
			discount += product.Preis * 0.15 * (product.Menge - 2);
		}
	}
	
	response.json({
		total: total,
		discount: discount,
		final: total - discount
	});
}

module.exports = router;