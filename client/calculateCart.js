const Request = require('request');

let securityToken = null;

let warenkorb = [
    { "name": "Schuhe", "Menge": 1, "Preis": 49.90, "Gewicht": 640 },
    { "name": "Rock",   "Menge": 3, "Preis": 29.90, "Gewicht": 1090 },
    { "name": "Mütze",  "Menge": 1, "Preis": 14.90, "Gewicht": 120 },
    { "name": "Strümpfe", "Menge": 2, "Preis": 4.90, "Gewicht": 70 }
];

Request.post({
	url: 'http://localhost:3000/authenticate/',
	json: { username: 'Dominik', password: 'password' }
}, tokenErhalten);

function tokenErhalten(error, response, body) {
	securityToken = body;
	Request.post({
		url: 'http://localhost:3000/discount/',
		json: {
			cart: warenkorb,
			token: securityToken
		}
	}, discountBerechnet);
}

function discountBerechnet(error, response, body) {
	console.log("Summe: " + body.total);
	console.log("Discount: " + body.discount);
	console.log("Gesamtsumme: " + body.final + "\n");
	
	Request.post({
		url: 'http://localhost:3000/shippingCost/',
		json: {
			cart: warenkorb,
			token: securityToken
		}
	}, shippingCostBerechnet);
}

function shippingCostBerechnet(error, response, body) {
	console.log("Versandkosten: " + body);
}