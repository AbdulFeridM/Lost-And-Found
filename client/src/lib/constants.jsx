export const APP_NAME = import.meta.env.VITE_APP_NAME || 'Foundary';
export const categories = [
  'Electronics', 'Books', 'Clothing', 'Keys', 'Bags',
  'Jewelry', 'Sports Equipment', 'Documents', 'Other'
];

export const locations = [
  'Main Library', 'Student Union', 'Cafeteria', 'Gym',
  'Parking Lot A', 'Parking Lot B', 'Dormitory', 'Lecture Hall',
  'Computer Lab', 'Auditorium', 'Other'
];

// ✅ Set the correct backend URL including /api/auth
export const API_BASE_URL = 'https://lost-and-found-16ba.onrender.com/api/auth';