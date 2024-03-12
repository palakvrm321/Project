const { Schema, model } = require("../connection");

const myschema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  bankName: { type: String, required: true },
  website: { type: String, required: true },
  branch: { type: String, required: true },
  createdAt: Date,
});

module.exports = model("bank", myschema);
