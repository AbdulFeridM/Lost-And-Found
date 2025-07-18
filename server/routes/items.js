const express = require('express');
const { body } = require('express-validator');
const { auth, adminAuth } = require('../middleware/auth');
const {
  getItems,
  createItem,
  updateItem,
  deleteItem,
  claimItem,
  getMyItems,
  getMyClaims,
  approveItem,
  rejectItem
} = require('../controllers/itemController');

const router = express.Router();

// Validation middleware
const itemValidation = [
  body('title').trim().isLength({ min: 3 }).withMessage('Title must be at least 3 characters'),
  body('description').trim().isLength({ min: 10 }).withMessage('Description must be at least 10 characters'),
  body('category').isIn(['electronics', 'clothing', 'books', 'accessories', 'documents', 'keys', 'other']).withMessage('Invalid category'),
  body('type').isIn(['lost', 'found']).withMessage('Type must be either lost or found'),
  body('location').trim().isLength({ min: 3 }).withMessage('Location must be at least 3 characters')
];

// Public routes
router.get('/', getItems);

// Protected routes
router.post('/', auth, itemValidation, createItem);
router.put('/:id', auth, updateItem);
router.delete('/:id', auth, deleteItem);
router.post('/:id/claim', auth, claimItem);
router.get('/my-items', auth, getMyItems);
router.get('/my-claims', auth, getMyClaims);

// Admin routes
router.post('/:id/approve', adminAuth, approveItem);
router.post('/:id/reject', adminAuth, rejectItem);

module.exports = router;