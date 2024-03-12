const {Schema, model} = require('../connection');

const myschema = new Schema({
    email : {type : String, required : true},
    name : {type : String, required : true},
    message : {type : String, required : true},
    createdAt: Date
});

module.exports = model('contact', myschema);

