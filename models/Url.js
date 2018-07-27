const mongoose = require('mongoose');
const { autoIncrement } = require('mongoose-plugin-autoinc');

let urlSchema = new mongoose.Schema({
  originalUrl: {
    type: String,
    unique: true,
    required: true
  },
  shortCode: {
    type: Number,
    unique: true,
    required: true
  }
});

urlSchema.plugin(autoIncrement, {model: 'Url', field: 'shortCode', startAt: 1, incrementBy: 1});

let Url = mongoose.model('Url', urlSchema);

module.exports = Url;

