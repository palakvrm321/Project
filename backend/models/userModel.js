const {Schema, model} = require('../connection');

const myschema = new Schema({
    name : {type : String, required : true},
    email : {type : String, required : true, unique : true},
    password : {type : String, required : true},
    role: {type : String, default: 'user'},
    avatar: {type : String, default: 'user_placeholder.png'},
    createdAt: Date
});

module.exports = model('user', myschema);

