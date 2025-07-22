const Item = require('../models/Item');
const cloudinary = require('../lib/config');
const fs = require('fs');

// Get all items with filters
const getItems = async (req, res) => {
  try {
    const { search, category, type, status, page = 1, limit = 12 } = req.query;
    
    let query = {};
    
    if (search) {
      query.$text = { $search: search };
    }
    
    if (category && category !== 'all') {
      query.category = category;
    }
    
    if (type && type !== 'all') {
      query.type = type;
    }
   
    if (req.user && req.user.role === 'admin') {
      if (status && status !== 'all') {
        query.status = status;
      }
    } else {
      if (status && status !== 'all') {
        query.status = status;
      } else {
        query.status = 'approved';
      }
    }

    const parsedLimit = parseInt(limit, 10);
    const parsedPage = parseInt(page, 10);

    const items = await Item.find(query)
      .populate('postedBy', 'name email')
      .populate('claimedBy', 'name email')
      .sort({ createdAt: -1 })
      .limit(parsedLimit)
      .skip((parsedPage - 1) * parsedLimit);

    const total = await Item.countDocuments(query);
  
    res.json({
      items,
      totalPages: Math.ceil(total / parsedLimit),
      currentPage: parsedPage,
      total
    });
  } catch (error) {
    console.error('Get items error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};


// Create new item
const createItem = async (req, res) => {
  try {
    const { title, description, category, type, location, contactInfo, image } = req.body;

    if (!title || !description || !category || !type) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    let imageUrl = null;

    // Upload image to Cloudinary if provided
    if (image) {
      const result = await cloudinary.uploader.upload(image, {
        folder: 'items',
      });
      console.log('Cloudinary upload result:', result);

      imageUrl = result.secure_url;
    }

    const item = new Item({
      title,
      description,
      category: category.toLowerCase(),
      type,
      location,
      contactInfo,
      images: imageUrl ? [imageUrl] : [],
      postedBy: req.user.id,
      status: 'pending',
    });

    await item.save();
    await item.populate('postedBy', 'name email');

    res.status(201).json({
      message: 'Item posted successfully',
      item,
    });
  } catch (error) {
    console.error('Create item error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Update item
const updateItem = async (req, res) => {
  try {
    const { id } = req.params;
  

    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Authorization check
    if (item.postedBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    

    const updatedItem = await Item.findByIdAndUpdate(id, req.body, { new: true })
      .populate('postedBy', 'name email')
      .populate('claimedBy', 'name email');

 jn 
    res.json({
      message: 'Item updated successfully',
      item: updatedItem
    });
  } catch (error) {
    console.error('Update item error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete item
const deleteItem = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Authorization check
    if (item.postedBy.toString() !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }

    await Item.findByIdAndDelete(id);

    res.json({ message: 'Item deleted successfully' });
  } catch (error) {
    console.error('Delete item error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Claim item
const claimItem = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Item.findById(id);
    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    if (item.status === 'claimed') {
      return res.status(400).json({ message: 'Item already claimed' });
    }

    if (item.postedBy.toString() === req.user.id) {
      return res.status(400).json({ message: 'Cannot claim your own item' });
    }

    item.status = 'claimed';
    item.claimedBy = req.user.id;
    item.claimedAt = new Date();

    await item.save();
    await item.populate('postedBy', 'name email');
    await item.populate('claimedBy', 'name email');

    res.json({
      message: 'Item claimed successfully',
      item
    });
  } catch (error) {
    console.error('Claim item error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get user's posted items
const getMyItems = async (req, res) => {
  const userId = req.query.userId || req.user.id;
  try {
    const items = await Item.find({ postedBy: userId })
      .populate('claimedBy', 'name email')
      .sort({ createdAt: -1 });

    res.json({ items });
  } catch (error) {
    console.error('Get my items error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Get items claimed by user
const getMyClaims = async (req, res) => {
  try {
    const items = await Item.find({ claimedBy: req.user.id })
      .populate('postedBy', 'name email')
      .sort({ claimedAt: -1 });

    res.json({ items });
  } catch (error) {
    console.error('Get my claims error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Admin: Approve item
const approveItem = async (req, res) => {
  try {
    const { id } = req.params;

    const item = await Item.findByIdAndUpdate(
      id,
      { status: 'approved' },
      { new: true }
    ).populate('postedBy', 'name email');

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json({
      message: 'Item approved successfully',
      item
    });
  } catch (error) {
    console.error('Approve item error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Admin: Reject item
const rejectItem = async (req, res) => {
  try {
    const { id } = req.params;
    const { reason } = req.body;

    const item = await Item.findByIdAndUpdate(
      id,
      { status: 'rejected', rejectionReason: reason },
      { new: true }
    ).populate('postedBy', 'name email');

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json({
      message: 'Item rejected successfully',
      item
    });
  } catch (error) {
    console.error('Reject item error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

const getItemById = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: 'Item ID is required' });
    }
    const item = await Item.findById(id)
      .populate('postedBy', 'name email')
      .populate('claimedBy', 'name email');

    if (!item) {
      return res.status(404).json({ message: 'Item not found' });
    }

    res.json(item);
  } catch (error) {
    console.error('Get item by ID error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



module.exports = {
  getItems,
  createItem,
  updateItem,
  deleteItem,
  claimItem,
  getMyItems,
  getMyClaims,
  approveItem,
  rejectItem,
  getItemById,
};
