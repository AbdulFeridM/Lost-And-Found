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

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';