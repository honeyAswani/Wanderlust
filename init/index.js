const mongoose = require('mongoose');
const initData = require("./data.js");
const Listing = require("../models/listing.js");
const geocoder = require("../utils/geocoder");

const Mongo_URL = "mongodb://127.0.0.1:27017/wanderlust";
main()
    .then( ()=>{
        console.log("Connected to MongoDB");
    }).catch((err) =>{
        console.log("Error connecting to MongoDB", err);
    });
async function main(){
    await mongoose.connect(Mongo_URL);
}
const initDB = async () => {

    await Listing.deleteMany({});

    const updatedData = [];

    for (let obj of initData.data) {

    const geoData = await geocoder.geocode(obj.location);

    if (geoData.length > 0) {

        const newObj = {
            ...obj,
            owner: "69a7f537e9a79d9cd825bb35",
            geometry: {
                type: "Point",
                coordinates: [
                    geoData[0].longitude,
                    geoData[0].latitude
                ]
            }
        };

        updatedData.push(newObj);

    } else {

        console.log("Location not found:", obj.location);

    }

    // prevent API rate limit (429 error)
    await new Promise(resolve => setTimeout(resolve, 2000));
}

    await Listing.insertMany(updatedData);

    console.log("Data was initialised with map coordinates");
};initDB();