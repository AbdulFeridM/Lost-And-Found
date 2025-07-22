import React from 'react'
import { Link } from 'react-router-dom';
import { APP_NAME } from '../lib/constants';
const Footer = () => {
  return (
       <footer className="bg-blue-800 text-white pt-16 pb-10 px-6">
       <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
         <div>
           <h4 className="text-lg font-bold mb-3">Campus {APP_NAME}</h4>
           <p className="text-sm text-blue-100">
             Empowering campuses with a digital platform to solve real-world problems. YC-quality. Student-built.
           </p>
         </div>

         <div>
           <h4 className="text-lg font-bold mb-3">Quick Links</h4>
           <ul className="space-y-2 text-sm">
             <li><Link to="/" className="hover:underline">Home</Link></li>
             <li><Link to="/login" className="hover:underline">Login</Link></li>
             <li><Link to="/register" className="hover:underline">Register</Link></li>
             <li><a href="#features" className="hover:underline">Features</a></li>
           </ul>
         </div>

         <div>
           <h4 className="text-lg font-bold mb-3">Resources</h4>
           <ul className="space-y-2 text-sm">
             <li><a href="#" className="hover:underline">Terms of Service</a></li>
             <li><a href="#" className="hover:underline">Privacy Policy</a></li>
             <li><a href="#" className="hover:underline">Help Center</a></li>
           </ul>
         </div>

         <div>
           <h4 className="text-lg font-bold mb-3">Contact</h4>
           <p className="text-sm">Email: support@lostfoundcampus.com</p>
           <p className="text-sm">Phone: +251 900 000 000</p>
           <p className="text-sm mt-2">© {new Date().getFullYear()} Lost&Found System</p>
         </div>
       </div>
     </footer>
  )
}

export default Footer