import React from 'react'
import { Mail, Phone } from 'lucide-react'

const Contact = () => (
  <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-gradient-to-b from-gray-900 to-black">
    <div className="w-full max-w-3xl bg-gray-800 rounded-2xl shadow-lg p-8 flex flex-col md:flex-row gap-10 items-center">
      {/* Contact Info Section */}
      <div className="flex-1 flex flex-col items-center md:items-start">
        <h1 className="text-3xl font-bold mb-4 mt-10 md:mt-0">Contact Us</h1>
        <p className="max-w-md text-gray-300 mb-6 text-center md:text-left">
          Have questions, feedback, or need support? Our team is here to help you 24/7. Reach out using the details below or the form, and we’ll get back to you as soon as possible.
        </p>
        <div className="flex flex-col gap-4 w-full">
          <div className="flex items-center gap-3 text-gray-200">
            <Phone className="w-5 h-5 text-primary" />
            <span className="font-semibold">+91 7652034476</span>
          </div>
          <div className="flex items-center gap-3 text-gray-200">
            <Mail className="w-5 h-5 text-primary" />
            <span className="font-semibold">velvet.pass@example.com</span>
          </div>
        </div>
        <p className="mt-4 text-sm text-gray-400">Our support team typically responds within 24 hours.</p>
      </div>
      {/* Contact Form Section */}
      <div className="flex-1 w-full">
        <form className="flex flex-col gap-4 bg-gray-900 rounded-xl p-6 shadow-md">
          <input className="p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-primary" type="text" placeholder="Your Name" required />
          <input className="p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-primary" type="email" placeholder="Your Email" required />
          <textarea className="p-3 rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Your Message" rows={5} required />
          <button type="submit" className="bg-primary hover:bg-primary-dull text-white font-semibold py-2 rounded transition">Send Message</button>
        </form>
      </div>
    </div>
  </div>
)

export default Contact 