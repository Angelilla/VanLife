const mongoose = require("mongoose");
const Schema   = mongoose.Schema;

const tripSchema = new Schema({
    name: String,
    //map
    //initlocation
    //finallocation
    traveler: { type: Schema.Types.ObjectId, ref: 'User' },
    comments: [{
        review: String,
        creator: { type: Schema.Types.ObjectId, ref: 'User' },
        rating: { type: Number, min: 1, max: 5 }}],
    initdate: Date
    //gallery
    //markers
});

const Trip = mongoose.model("User", tripSchema);

module.exports = Trip;
