const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true
  },
  address: {
    type: contactSchema.Types.Mixed
  }
});

module.exports = mongoose.model('Contact', contactSchema);
