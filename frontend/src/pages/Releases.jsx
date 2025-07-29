import React from 'react';
import { PlayCircleIcon, CalendarIcon, ClockIcon, StarIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../context/AppContext';

const staticNowShowing = [
  {
    title: 'Avengers: Infinity War',
    poster: 'https://image.tmdb.org/t/p/w500/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg',
    genres: ['Action', 'Adventure', 'Sci-Fi'],
    releaseDate: '2018-04-27',
    runtime: '2h 29m',
    rating: 4.7,
    tagline: 'An entire universe. Once and for all.',
    trailer: 'https://www.youtube.com/watch?v=6ZfuNTqbHE8',
    spotlight: true,
  },
  {
    title: 'Spiderman: Miles Morales',
    poster: 'https://image.tmdb.org/t/p/w500/iiZZdoQBEYBv6id8su7ImL0oCbD.jpg',
    genres: ['Animation', 'Action', 'Adventure'],
    releaseDate: '2023-06-02',
    runtime: '2h 20m',
    rating: 4.6,
    tagline: 'Across the Spider-Verse.',
    trailer: 'https://www.youtube.com/watch?v=cqGjhVJWtEg',
  },
  {
    title: 'Conjuring',
    poster: 'https://image.tmdb.org/t/p/w500/wVYREutTvI2tmxr6ujrHT704wGF.jpg',
    genres: ['Horror', 'Thriller'],
    releaseDate: '2013-07-19',
    runtime: '1h 52m',
    rating: 4.2,
    tagline: 'Based on the true case files of the Warrens.',
    trailer: 'https://www.youtube.com/watch?v=k10ETZ41q5o',
  },
];

const comingSoon = [
  {
    title: 'Mufasa: The Lion King',
    poster: 'https://image.tmdb.org/t/p/w500/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg',
    genres: ['Adventure', 'Family', 'Animation'],
    releaseDate: '2024-12-20',
    runtime: '1h 58m',
    rating: null,
    tagline: 'The story of an orphan who would be king.',
    trailer: 'https://www.youtube.com/watch?v=0bZ0Kp2yYQ0',
  },
  {
    title: 'Inside Out 2',
    poster: 'https://image.tmdb.org/t/p/w500/2C3CdVzINUm5Cm1lrbT2uiRstwX.jpg',
    genres: ['Animation', 'Family', 'Comedy'],
    releaseDate: '2024-06-14',
    runtime: '1h 36m',
    rating: null,
    tagline: 'Make room for new emotions.',
    trailer: 'https://www.youtube.com/watch?v=LEjhY15eCx0',
  },
  {
    title: 'The Unholy Trinity',
    poster: 'https://image.tmdb.org/t/p/w500/8QVDXDiOGHRcAD4oM6MXjE0osSj.jpg',
    genres: ['Western', 'Adventure', 'Crime'],
    releaseDate: '2025-06-13',
    runtime: '1h 35m',
    rating: null,
    tagline: 'The past never stays buried.',
    trailer: 'https://www.youtube.com/watch?v=8gL7RrA8kqM',
  },
];

const HeroBanner = ({ movie }) => {
  const navigate = useNavigate();
  return (
    <div className="relative flex flex-col md:flex-row items-center gap-10 px-6 md:px-16 lg:px-36 py-16 bg-gradient-to-br from-primary/80 via-black/80 to-gray-900 rounded-3xl shadow-2xl overflow-hidden mb-16">
      <img src={movie.poster} alt={movie.title + ' poster'} className="w-56 h-80 object-cover rounded-2xl shadow-xl border-4 border-primary/30" />
      <div className="flex flex-col gap-4 max-w-2xl z-10">
        <h2 className="text-4xl md:text-5xl font-extrabold text-white drop-shadow-lg">{movie.title}</h2>
        <div className="flex items-center gap-3 text-gray-200 text-lg font-semibold">
          <span>{movie.genres.join(' | ')}</span>
          <span className="flex items-center gap-1"><CalendarIcon className="w-5 h-5" /> {new Date(movie.releaseDate).getFullYear()}</span>
          <span className="flex items-center gap-1"><ClockIcon className="w-5 h-5" /> {movie.runtime}</span>
        </div>
        <p className="text-primary text-xl font-bold italic">{movie.tagline}</p>
        <div className="flex items-center gap-4 mt-2">
          <a href={movie.trailer} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-5 py-2 bg-primary hover:bg-primary-dull text-white rounded-full font-semibold shadow-lg transition-all">
            <PlayCircleIcon className="w-6 h-6" /> Watch Trailer
          </a>
          <button onClick={()=> navigate('/movies')} className="px-6 py-2 bg-white/10 hover:bg-white/20 text-primary border border-primary rounded-full font-bold shadow-lg transition-all">Book Now</button>
        </div>
      </div>
      <div className="absolute right-0 bottom-0 w-80 h-80 bg-primary/20 rounded-full blur-3xl -z-10" />
    </div>
  );
};

const MovieCard = ({ movie }) => {
  return (
    <div className="flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-700 rounded-2xl shadow-xl border border-gray-700 hover:border-primary/70 hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group relative overflow-hidden min-h-[420px] animate-fade-in">
      <img src={movie.poster} alt={movie.title + ' poster'} className="w-full h-64 object-cover rounded-t-2xl" />
      <div className="p-5 flex flex-col gap-2 flex-1">
        <h3 className="text-xl font-bold text-white group-hover:text-primary transition">{movie.title}</h3>
        <div className="flex items-center gap-2 text-gray-400 text-sm font-semibold">
          {movie.genres.join(' | ')}
        </div>
        <div className="flex items-center gap-2 text-gray-300 text-xs mb-2">
          <CalendarIcon className="w-4 h-4 text-primary" /> {new Date(movie.releaseDate).toLocaleDateString()}
        </div>
        <div className="flex items-center gap-2 text-yellow-400 font-semibold text-sm mb-2">
          {movie.rating && <><StarIcon className="w-4 h-4" /> {movie.rating} / 5.0</>}
        </div>
        <p className="text-gray-400 text-xs italic mb-2">{movie.tagline}</p>
        <div className="flex gap-2 mt-auto">
          <a href={movie.trailer} target="_blank" rel="noopener noreferrer" className="px-4 py-1 bg-primary hover:bg-primary-dull text-white rounded-full font-semibold text-xs flex items-center gap-1"><PlayCircleIcon className="w-4 h-4" /> Trailer</a>
          <button className="px-4 py-1 bg-white/10 hover:bg-white/20 text-primary border border-primary rounded-full font-bold text-xs">Book</button>
        </div>
      </div>
    </div>
  );
};

const Releases = () => {
  const { shows, image_base_url } = useAppContext();

  // Map shows to the MovieCard format, take first 2, and avoid duplicates with staticNowShowing
  const dynamicMovies = (shows || []).map((movie) => ({
    title: movie.title,
    poster: image_base_url + movie.backdrop_path,
    genres: (movie.genres || []).map(g => g.name),
    releaseDate: movie.release_date,
    runtime: movie.runtime ? `${Math.floor(movie.runtime/60)}h ${movie.runtime%60}m` : 'TBA',
    rating: movie.vote_average ? (movie.vote_average/2).toFixed(1) : null,
    tagline: movie.tagline || '',
    trailer: movie.trailer || '',
  }));

  // Avoid duplicates by title
  const allNowShowing = [
    ...dynamicMovies.filter(dm => !staticNowShowing.some(sm => sm.title === dm.title)),
    ...staticNowShowing
  ];

  const spotlight = allNowShowing.find(m => m.spotlight) || allNowShowing[0];

  return (
    <>
      <div className="min-h-screen w-full fixed top-0 left-0 bg-black z-[-20]" />
      <div className="relative min-h-screen w-full px-6 md:px-16 lg:px-36 pt-32 md:pt-40 pb-32 bg-gradient-to-br from-black via-gray-900 to-gray-800 overflow-x-hidden">
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-primary/20 rounded-full blur-3xl -z-10"></div>
        <h1 className="text-4xl font-extrabold mb-8 text-white drop-shadow-lg tracking-tight">Releases</h1>
        <HeroBanner movie={spotlight} />
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-white mb-6">Now Showing</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14 grid-auto-rows-[1fr]">
            {allNowShowing.map((movie, idx) => (
              <MovieCard key={movie.title} movie={movie} />
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-bold text-white mb-6">Coming Soon</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-14 grid-auto-rows-[1fr]">
            {comingSoon.map((movie, idx) => (
              <MovieCard key={movie.title} movie={movie} />
            ))}
          </div>
        </section>
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

export default Releases; 