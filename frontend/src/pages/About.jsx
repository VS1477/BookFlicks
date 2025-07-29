import React from 'react'
import { Film, Award, Users, Star } from 'lucide-react'

const About = () => (
  <div className="min-h-screen flex flex-col items-center justify-center px-4 py-16 bg-gradient-to-b from-gray-900 to-black">
    <div className="w-full max-w-xl bg-gray-800 rounded-2xl shadow-lg p-6 flex flex-col gap-8 items-center mt-10">
      <h1 className="text-3xl font-bold mb-4 mt-4">About VelVet Pass</h1>
      <p className="max-w-2xl text-center text-gray-300 mb-6">
        VelVet Pass is your gateway to a world of cinematic experiences. We are passionate about movies and dedicated to making your ticket booking journey seamless, secure, and enjoyable. Our platform brings together the latest blockbusters, indie gems, and exclusive screenings, all at your fingertips.
      </p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
        <div className="flex flex-col items-center text-center">
          <Film className="w-8 h-8 text-primary mb-2" />
          <h2 className="text-xl font-semibold mb-2">Our Mission</h2>
          <p className="text-gray-400">
            To revolutionize the way you discover, book, and enjoy movies. We strive to offer a user-friendly platform, transparent pricing, and personalized recommendations so you never miss out on your favorite films.
          </p>
        </div>
        <div className="flex flex-col items-center text-center">
          <Award className="w-8 h-8 text-primary mb-2" />
          <h2 className="text-xl font-semibold mb-2">Why Choose Us?</h2>
          <ul className="text-gray-400 list-disc list-inside text-left">
            <li>Easy and secure online ticket booking</li>
            <li>Real-time seat selection and instant confirmation</li>
            <li>Exclusive offers and loyalty rewards</li>
            <li>Personalized movie recommendations</li>
            <li>24/7 customer support</li>
          </ul>
        </div>
        <div className="flex flex-col items-center text-center">
          <Users className="w-8 h-8 text-primary mb-2" />
          <h2 className="text-xl font-semibold mb-2">Our Values</h2>
          <ul className="text-gray-400 list-disc list-inside text-left">
            <li>Customer-first approach</li>
            <li>Innovation and continuous improvement</li>
            <li>Transparency and trust</li>
            <li>Passion for movies and entertainment</li>
          </ul>
        </div>
        <div className="flex flex-col items-center text-center">
          <Star className="w-8 h-8 text-primary mb-2" />
          <h2 className="text-xl font-semibold mb-2">Thank You!</h2>
          <p className="text-gray-400">
            Thank you for choosing VelVet Pass. We look forward to being a part of your movie adventures!
          </p>
        </div>
      </div>
    </div>
  </div>
)

export default About 