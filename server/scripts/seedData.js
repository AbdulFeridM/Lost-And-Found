const mongoose = require('mongoose');
const User = require('../models/User');
const Item = require('../models/Item');

const seedData = async () => {
  try {
    // Connect to database
    await mongoose.connect('mongodb://localhost:27017/campus-lost-found', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log('Connected to MongoDB');

    // Clear existing data
    await User.deleteMany({});
    await Item.deleteMany({});

    // Create demo users
    const demoUser = new User({
      name: 'Demo Student',
      email: 'user@student.edu',
      password: 'password123',
      role: 'user'
    });

    const adminUser = new User({
      name: 'Campus Admin',
      email: 'admin@campus.edu',
      password: 'password123',
      role: 'admin'
    });

    await demoUser.save();
    await adminUser.save();

    // Create demo items
    const demoItems = [
      {
        title: 'Lost iPhone 13 Pro',
        description: 'Black iPhone 13 Pro lost near the library. Has a blue case with initials "JS" on the back.',
        category: 'electronics',
        type: 'lost',
        location: 'Main Library',
        postedBy: demoUser._id,
        status: 'approved',
        contactInfo: { email: 'user@student.edu' }
      },
      {
        title: 'Found Textbook - Biology 101',
        description: 'Found a Biology 101 textbook in the cafeteria. Name "Sarah M." written inside the cover.',
        category: 'books',
        type: 'found',
        location: 'Student Cafeteria',
        postedBy: adminUser._id,
        status: 'approved',
        contactInfo: { email: 'admin@campus.edu' }
      },
      {
        title: 'Lost Car Keys',
        description: 'Lost my car keys with a Honda keychain and a small flashlight attached.',
        category: 'keys',
        type: 'lost',
        location: 'Parking Lot B',
        postedBy: demoUser._id,
        status: 'approved',
        contactInfo: { email: 'user@student.edu' }
      },
      {
        title: 'Found Wallet',
        description: 'Found a brown leather wallet near the gym entrance. Contains student ID and credit cards.',
        category: 'accessories',
        type: 'found',
        location: 'Recreation Center',
        postedBy: adminUser._id,
        status: 'approved',
        contactInfo: { email: 'admin@campus.edu' }
      },
      {
        title: 'Lost Laptop Charger',
        description: 'MacBook Pro charger lost in the computer lab. 61W USB-C power adapter.',
        category: 'electronics',
        type: 'lost',
        location: 'Computer Lab - Building A',
        postedBy: demoUser._id,
        status: 'approved',
        contactInfo: { email: 'user@student.edu' }
      }
    ];

    await Item.insertMany(demoItems);

    console.log('Demo data seeded successfully!');
    console.log('Demo accounts:');
    console.log('Student: user@student.edu / password123');
    console.log('Admin: admin@campus.edu / password123');

    process.exit(0);
  } catch (error) {
    console.error('Seeding error:', error);
    process.exit(1);
  }
};

seedData();