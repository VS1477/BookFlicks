import React, { useState } from 'react';
import { MapPinIcon, Building2Icon, StarIcon, XIcon } from 'lucide-react';

const theaters = [
  { name: 'PVR Phoenix', city: 'Mumbai', address: 'Phoenix Mall, Lower Parel', image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80' },
  { name: 'INOX R-City', city: 'Mumbai', address: 'R-City Mall, Ghatkopar', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' },
  { name: 'Cinepolis Viviana', city: 'Mumbai', address: 'Viviana Mall, Thane', image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80' },
  { name: 'PVR Select Citywalk', city: 'Delhi', address: 'Saket', image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80' },
  { name: 'DT Cinemas', city: 'Delhi', address: 'DLF Promenade, Vasant Kunj', image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3fd9?auto=format&fit=crop&w=400&q=80' },
  { name: 'Carnival Cinemas', city: 'Delhi', address: 'Janakpuri', image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80' },
  { name: 'PVR Orion', city: 'Bangalore', address: 'Orion Mall, Rajajinagar', image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80' },
  { name: 'INOX Garuda', city: 'Bangalore', address: 'Garuda Mall, Magrath Road', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' },
  { name: 'Cinepolis Royal Meenakshi', city: 'Bangalore', address: 'Bannerghatta Road', image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80' },
  { name: 'PVR Forum Sujana', city: 'Hyderabad', address: 'Forum Sujana Mall, Kukatpally', image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80' },
  { name: 'INOX GVK One', city: 'Hyderabad', address: 'GVK One Mall, Banjara Hills', image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3fd9?auto=format&fit=crop&w=400&q=80' },
  { name: 'Asian CineSquare', city: 'Hyderabad', address: 'Uppal', image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80' },
  { name: 'SPI Sathyam', city: 'Chennai', address: 'Royapettah', image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80' },
  { name: 'PVR Grand Galada', city: 'Chennai', address: 'Grand Galada Mall, Pallavaram', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' },
  { name: 'INOX Chennai Citi Centre', city: 'Chennai', address: 'Mylapore', image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80' },
  { name: 'INOX South City', city: 'Kolkata', address: 'South City Mall', image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80' },
  { name: 'PVR Mani Square', city: 'Kolkata', address: 'Mani Square Mall', image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3fd9?auto=format&fit=crop&w=400&q=80' },
  { name: 'Carnival Cinemas', city: 'Kolkata', address: 'Salt Lake', image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80' },
  { name: 'PVR Phoenix Marketcity', city: 'Pune', address: 'Phoenix Marketcity, Viman Nagar', image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80' },
  { name: 'Cinepolis Seasons', city: 'Pune', address: 'Seasons Mall, Hadapsar', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' },
  { name: 'INOX Bund Garden', city: 'Pune', address: 'Bund Garden Road', image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80' },
  { name: 'PVR Acropolis', city: 'Ahmedabad', address: 'Acropolis Mall, Thaltej', image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80' },
  { name: 'Cinepolis Alpha One', city: 'Ahmedabad', address: 'Alpha One Mall, Vastrapur', image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3fd9?auto=format&fit=crop&w=400&q=80' },
  { name: 'INOX Himalaya', city: 'Ahmedabad', address: 'Himalaya Mall, Drive-In Road', image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80' },
  { name: 'Cinepolis World Trade Park', city: 'Jaipur', address: 'World Trade Park, Malviya Nagar', image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80' },
  { name: 'INOX Crystal Palm', city: 'Jaipur', address: 'Crystal Palm Mall, Bais Godam', image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80' },
  { name: 'Raj Mandir', city: 'Jaipur', address: 'MI Road', image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80' },
  { name: 'PVR Phoenix United', city: 'Lucknow', address: 'Phoenix United Mall, Alambagh', image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80' },
  { name: 'INOX Riverside', city: 'Lucknow', address: 'Riverside Mall, Gomti Nagar', image: 'https://images.unsplash.com/photo-1465101178521-c1a9136a3fd9?auto=format&fit=crop&w=400&q=80' },
  { name: 'SRS Cinemas', city: 'Lucknow', address: 'Sahara Ganj Mall, Hazratganj', image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80' },
];

const uniqueCities = ['All Cities', ...Array.from(new Set(theaters.map(t => t.city)))];

// Dummy movies for modal
const dummyMovies = [
  { title: 'Avengers: Infinity War', showtimes: ['10:00 AM', '1:30 PM', '5:00 PM', '8:30 PM'] },
  { title: 'Spiderman: Miles Morales', showtimes: ['11:00 AM', '2:30 PM', '6:00 PM', '9:30 PM'] },
  { title: 'Conjuring', showtimes: ['12:00 PM', '3:30 PM', '7:00 PM', '10:30 PM'] },
];

function getRandomRating() {
  return (Math.random() * 2 + 3).toFixed(1); // 3.0 - 5.0
}

const Theaters = () => {
  const [selectedCity, setSelectedCity] = useState('All Cities');
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTheater, setModalTheater] = useState(null);
  const filteredTheaters = selectedCity === 'All Cities' ? theaters : theaters.filter(t => t.city === selectedCity);

  // Accessibility: close modal on Escape
  React.useEffect(() => {
    function handleKeyDown(e) {
      if (e.key === 'Escape') setModalOpen(false);
    }
    if (modalOpen) window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [modalOpen]);

  return (
    <>
      <div className="min-h-screen w-full fixed top-0 left-0 bg-black z-[-20]" />
      <div className="relative min-h-screen w-full px-6 md:px-16 lg:px-40 pt-32 md:pt-40 pb-32 bg-gradient-to-br from-black via-gray-900 to-gray-800 overflow-x-hidden">
        {/* Decorative Blur Circle */}
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl -z-10"></div>
        {/* Subtle background overlay for extra polish */}
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-primary/5 via-transparent to-transparent -z-10" />
        <h1 className="text-4xl font-extrabold mb-8 text-white drop-shadow-lg tracking-tight">All Theaters in India</h1>
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-10">
          <label htmlFor="city" className="text-gray-300 font-medium text-lg">Filter by City:</label>
          <select
            id="city"
            value={selectedCity}
            onChange={e => setSelectedCity(e.target.value)}
            className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-primary/40 focus:outline-none focus:ring-2 focus:ring-primary"
          >
            {uniqueCities.map(city => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14 grid-auto-rows-[1fr]">
          {filteredTheaters.length === 0 ? (
            <div className="col-span-full text-center text-gray-400 text-lg py-20 animate-fade-in">
              No theaters found for this city. Try another!
            </div>
          ) : filteredTheaters.map((theater, idx) => (
            <div
              key={theater.name + theater.city}
              className="flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 rounded-2xl shadow-xl border border-gray-700 hover:border-primary/70 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden animate-fade-in min-h-[420px]"
              style={{ animationDelay: `${idx * 60}ms` }}
            >
              <img src={theater.image} alt={theater.name + ' photo'} className="w-full h-40 object-cover rounded-t-2xl" />
              <div className="p-7 flex flex-col gap-3 flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <Building2Icon className="w-7 h-7 text-primary drop-shadow" />
                  <span className="text-xl font-bold text-white group-hover:text-primary transition">{theater.name}</span>
                </div>
                <div className="flex items-center gap-2 text-gray-400 text-sm font-semibold">
                  <MapPinIcon className="w-4 h-4 text-primary" />
                  {theater.city}
                </div>
                <div className="text-gray-300 text-sm mb-2 pl-1">{theater.address}</div>
                <div className="flex items-center gap-2 text-yellow-400 font-semibold text-sm mb-4 pl-1">
                  <StarIcon className="w-4 h-4" />
                  {getRandomRating()} / 5.0
                </div>
                <div className="flex gap-3 mt-auto">
                  <button
                    className="px-5 py-2 bg-primary hover:bg-primary-dull text-white rounded-full font-semibold shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary"
                    aria-label={`View shows for ${theater.name}`}
                    onClick={() => { setModalTheater(theater); setModalOpen(true); }}
                  >
                    View Shows
                  </button>
                  <button
                    className="px-5 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-full font-semibold shadow-lg transition-all focus:outline-none focus:ring-2 focus:ring-primary"
                    aria-label={`View ${theater.name} on map`}
                    onClick={() => {
                      const query = encodeURIComponent(theater.name + ', ' + theater.address + ', ' + theater.city + ', India');
                      window.open(`https://www.google.com/maps/search/?api=1&query=${query}`, '_blank');
                    }}
                  >
                    View on Map
                  </button>
                </div>
              </div>
              {/* Decorative ring on hover */}
              <div className="absolute -inset-1 rounded-2xl border-2 border-primary opacity-0 group-hover:opacity-60 transition-all pointer-events-none"></div>
            </div>
          ))}
        </div>
        {/* Modal for shows */}
        {modalOpen && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-fade-in"
            tabIndex={-1}
            aria-modal="true"
            role="dialog"
          >
            <div className="bg-gray-900 rounded-2xl shadow-2xl p-8 w-full max-w-md relative animate-fade-in">
              <button
                className="absolute top-4 right-4 text-gray-400 hover:text-primary focus:outline-none"
                aria-label="Close modal"
                onClick={() => setModalOpen(false)}
              >
                <XIcon className="w-6 h-6" />
              </button>
              <h2 className="text-2xl font-bold text-white mb-4">Shows at {modalTheater?.name}</h2>
              <div className="flex flex-col gap-4">
                {dummyMovies.map((movie, idx) => (
                  <div key={movie.title} className="bg-gray-800 rounded-lg p-4 flex flex-col gap-2">
                    <div className="text-lg font-semibold text-primary">{movie.title}</div>
                    <div className="flex flex-wrap gap-2">
                      {movie.showtimes.map(time => (
                        <span key={time} className="px-3 py-1 bg-primary/20 text-primary rounded-full text-xs font-medium">{time}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        {/* Fade-in animation keyframes and grid auto-rows for consistent card heights */}
        <style>{`
          .animate-fade-in {
            animation: fadeIn 0.7s both;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(30px); }
            to { opacity: 1; transform: none; }
          }
          .grid-auto-rows-\[1fr\] {
            grid-auto-rows: 1fr;
          }
        `}</style>
      </div>
    </>
  );
};

export default Theaters; 