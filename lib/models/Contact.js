const mongoose = require('mongoose');

const contactSchema = new mongoose.Schema({
  fullname: {
    type: String
  },
  phone: {
    type: Number
  },
  address: {
    type: mongoose.Schema.Types.Mixed
  }
}, {
  toJSON: {
    transform: function(doc, ret) {
      delete ret.__v;
    }
  }
}

);

module.exports = mongoose.model('Contact', contactSchema);
