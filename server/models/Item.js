const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  description: {
    type: String,
    required: true,
    trim: true
  },
  category: {
    type: String,
    required: true,
    enum: ['electronics', 'clothing', 'books', 'accessories', 'documents', 'keys', 'other']
  },
  type: {
    type: String,
    required: true,
    enum: ['lost', 'found']
  },
  location: {
    type: String,
    required: true,
    trim: true
  },
  dateReported: {
    type: Date,
    default: Date.now
  },
  images: [{
    type: String
  }],
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'claimed'],
    default: 'pending' 
  },
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  claimedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  claimedAt: {
    type: Date
  },
  contactInfo: {
    email: String,
    phone: String
  }
}, {
  timestamps: true
});

// Index for search functionality
itemSchema.index({ title: 'text', description: 'text', location: 'text' });

module.exports = mongoose.model('Item', itemSchema);