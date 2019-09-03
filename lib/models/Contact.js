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
