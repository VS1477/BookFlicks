import React from 'react'
import { Shield, Info, Eye, UserCheck } from 'lucide-react'

const Privacy = () => (
  <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-gradient-to-b from-gray-900 to-black">
    <div className="w-full max-w-xl bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col gap-8 items-center mt-10">
      <h1 className="text-3xl font-bold mb-4 mt-4">Privacy Policy</h1>
      <div className="max-w-2xl text-gray-300 text-left space-y-8">
        <div className="flex items-center gap-3 mb-2">
          <Shield className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-semibold">Your Privacy Matters</h2>
        </div>
        <p>
          At VelVet Pass, your privacy is our top priority. We are committed to protecting your personal information and being transparent about how we use it.
        </p>
        <div className="flex items-center gap-3 mb-2 mt-8">
          <Info className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-semibold">Information We Collect</h2>
        </div>
        <ul className="list-disc list-inside text-gray-400">
          <li>Personal details (name, email, phone) for account creation and support</li>
          <li>Booking and payment information for processing your orders</li>
          <li>Usage data to improve our services and user experience</li>
        </ul>
        <div className="flex items-center gap-3 mb-2 mt-8">
          <Eye className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-semibold">How We Use Your Information</h2>
        </div>
        <ul className="list-disc list-inside text-gray-400">
          <li>To provide and manage your account and bookings</li>
          <li>To send you updates, offers, and important notifications</li>
          <li>To enhance and personalize your experience on our platform</li>
        </ul>
        <div className="flex items-center gap-3 mb-2 mt-8">
          <UserCheck className="w-6 h-6 text-primary" />
          <h2 className="text-xl font-semibold">Your Rights</h2>
        </div>
        <ul className="list-disc list-inside text-gray-400">
          <li>Access, update, or delete your personal information</li>
          <li>Opt out of marketing communications</li>
          <li>Request information about how your data is used</li>
        </ul>
        <div className="mt-8">
          <h2 className="text-xl font-semibold mb-2">Cookies & Tracking</h2>
          <p className="text-gray-400">
            We use cookies and similar technologies to remember your preferences and analyze site traffic. You can control cookie settings in your browser at any time.
          </p>
        </div>
        <p>
          For any privacy-related questions or requests, please contact us at <span className="underline">velvet.pass@example.com</span>.
        </p>
        <p className="text-gray-400 mt-8">
          This policy may be updated from time to time. Please review it regularly for any changes.
        </p>
      </div>
    </div>
  </div>
)

export default Privacy 