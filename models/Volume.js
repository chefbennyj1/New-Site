const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const pageSchema = new Schema({
    index: Number,
    path: String, // e.g. "1.html"    
});

const volumeSchema = new Schema({
    index: Number,
    title: String,
    volumePath: String, // e.g. "/views/partials/volume-1/"      
    pages: [pageSchema]
});

module.exports = mongoose.model('Volume', volumeSchema, 'Volumes');
