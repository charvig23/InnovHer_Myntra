const mongoose = require('mongoose');
const entrySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },  
    num_of_products_used: {
        type: Number,
        required: true
    },
    uploaded_images: {
        data: Buffer,
        contentType: String,
        required: true
    },
    other_images: {
        data: Buffer,
        contentType: String,
        required: true
    },
    upvotes: {
        type: Number,
        default: 0,
        required: true
    }
});

const entryModel = mongoose.model("entry",entrySchema);
module.exports = entryModel;