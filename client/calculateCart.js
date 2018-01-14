const Request = require('request');

let securityToken = null;

let warenkorb = [
    { "name": "Schuhe", "Menge": 1, "Preis": 49.90, "Gewicht": 640 },
    { "name": "Rock",   "Menge": 3, "Preis": 29.90, "Gewicht": 1090 },
    { "name": "Mütze",  "Menge": 1, "Preis": 14.90, "Gewicht": 120 },
    { "name": "Strümpfe", "Menge": 2, "Preis": 4.90, "Gewicht": 70 }
];

Request.get('http://localhost:3000/routing/authenticate', authServiceErhalten);

function authServiceErhalten(error, response, body) {
	let authUrl = JSON.parse(body);
	
	Request.post({
        url: authUrl,
        json: {username: 'Dominik', password: 'password'}
    }, tokenErhalten);
}

function tokenErhalten(error, response, body) {
	securityToken = body;
    Request.get('http://localhost:3000/routing/discount', discountServiceErhalten);
}

function discountServiceErhalten(error, response, body) {
	let discountUrl = JSON.parse(body);
    Request.post({
        url: discountUrl,
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

    Request.get('http://localhost:3000/routing/shippingCost', shippingCostServiceErhalten);
}


function shippingCostServiceErhalten(error, response, body) {
    let shippingCostUrl = JSON.parse(body);
    Request.post({
        url: shippingCostUrl,
        json: {
            cart: warenkorb,
            token: securityToken
        }
    }, shippingCostBerechnet);
}

function shippingCostBerechnet(error, response, body) {
    console.log("Versandkosten: " + body);
}