const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const tripSchema = new Schema({
    
    
});

const Trip = mongoose.model("User", tripSchema);

module.exports = Trip;
