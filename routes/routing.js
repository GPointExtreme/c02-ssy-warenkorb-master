const express = require('express');
const router = express.Router();

let services = {};

router.post("/", addService);

function addService(request, response) {
		services[request.body.name] = request.body.url;
		response.json(true);
}

router.get("/", listServices);

function listServices(request, response) {
	response.json(services);
}

router.get("/:serviceName", getService);

function getService(request, response) {
	response.json(services[request.params.serviceName]);
}

module.exports = router;