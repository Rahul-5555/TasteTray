import React from 'react'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div className="bg-orange-500 text-white mt-10">
      <footer className="max-w-7xl mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center border-t-4 border-green-600">
        <div className="flex items-center space-x-2">
          <Link to="/" className="text-lg font-semibold text-white hover:text-gray-300 transition-all">
            TasteTray
          </Link>
          <span className="text-sm text-gray-300">© 2024 TasteTray, Inc</span>
        </div>

        <div className="mt-4 md:mt-0 flex space-x-6">
          <Link to="/" className="text-sm text-white hover:text-gray-300 transition-all">Home</Link>
          <Link to="/about" className="text-sm text-white hover:text-gray-300 transition-all">About</Link>
          <Link to="/contact" className="text-sm text-white hover:text-gray-300 transition-all">Contact</Link>
        </div>
      </footer>
    </div>
  )
}
