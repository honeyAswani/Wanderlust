const NodeGeocoder = require("node-geocoder");

const options = {
    provider: "openstreetmap"
};

const geocoder = NodeGeocoder(options);

module.exports = geocoder;
/*This will convert:
Jaipur, Rajasthan➡ into --[longitude, latitude]*/