import Booking from "../models/Booking.js";
import Show from "../models/Show.js";
import User from "../models/User.js";
import Movie from "../models/Movie.js";
import axios from "axios";
import https from "https";

// Setup Axios with HTTPS agent
const isDev = process.env.NODE_ENV !== "production";
const API_KEY = process.env.TMDB_API_KEY || 'aafa33b9d2c93bba28f3142f2c0192a0';

const httpsAgent = new https.Agent({
  keepAlive: true,
  rejectUnauthorized: !isDev,
  timeout: 10000,
});

const axiosTMDb = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  httpsAgent,
  headers: {
    Authorization: `Bearer ${API_KEY}`,
  },
});

// Check if user is admin
export const isAdmin = async (req, res) => {
  res.json({ success: true, isAdmin: true });
};

// Dashboard statistics
export const getDashboardData = async (req, res) => {
  try {
    const bookings = await Booking.find({ isPaid: true });
    const activeShows = await Show.find({
      showDateTime: { $gte: new Date() },
    }).populate("movie");
    const totalUser = await User.countDocuments();

    const dashboardData = {
      totalBookings: bookings.length,
      totalRevenue: bookings.reduce((acc, b) => acc + b.amount, 0),
      activeShows,
      totalUser,
    };

    res.json({ success: true, dashboardData });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// All upcoming shows
export const getAllShows = async (req, res) => {
  try {
    const shows = await Show.find({
      showDateTime: { $gte: new Date() },
    })
      .populate("movie")
      .sort({ showDateTime: 1 });

    res.json({ success: true, shows });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// All bookings (admin view)
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({})
      .populate("user")
      .populate({
        path: "show",
        populate: { path: "movie" },
      })
      .sort({ createdAt: -1 });

    res.json({ success: true, bookings });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

export const bulkAddShows = async (req, res) => {
  try {
    // Only allow admin
    const user = req.auth && req.auth().userId ? await import("@clerk/express").then(m => m.clerkClient.users.getUser(req.auth().userId)) : null;
    if (!user || user.privateMetadata.role !== 'admin') {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    // Use v3 API key as query param
    const tmdbRes = await axios.get('https://api.themoviedb.org/3/movie/now_playing', {
      params: { api_key: process.env.TMDB_API_KEY },
      timeout: 20000
    });
    let movies = tmdbRes.data.results;
    // Skip last 3 movies for demo
    if (movies.length > 3) movies = movies.slice(0, movies.length - 3);

    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const dd = String(today.getDate()).padStart(2, '0');
    const dateStr = `${yyyy}-${mm}-${dd}`;
    const showTimes = ["19:15", "19:45", "20:15", "22:30", "22:45", "23:00", "23:30", "23:50"];
    const showPrice = 250;
    let added = [];
    for (const movie of movies) {
      // Check if movie exists in DB, if not, fetch full details and add
      let dbMovie = await Movie.findById(movie.id);
      if (!dbMovie) {
        // Fetch details and credits (v3 API key)
        const [detailsRes, creditsRes] = await Promise.all([
          axios.get(`https://api.themoviedb.org/3/movie/${movie.id}`, {
            params: { api_key: process.env.TMDB_API_KEY },
            timeout: 20000
          }),
          axios.get(`https://api.themoviedb.org/3/movie/${movie.id}/credits`, {
            params: { api_key: process.env.TMDB_API_KEY },
            timeout: 20000
          })
        ]);
        const details = detailsRes.data;
        const credits = creditsRes.data;
        dbMovie = await Movie.create({
          _id: movie.id,
          title: details.title,
          overview: details.overview,
          poster_path: details.poster_path,
          backdrop_path: details.backdrop_path,
          genres: details.genres,
          casts: credits.cast,
          release_date: details.release_date,
          original_language: details.original_language,
          tagline: details.tagline || "",
          vote_average: details.vote_average,
          runtime: details.runtime,
        });
      }
      // Check if shows for today already exist for this movie
      const existingShows = await Show.find({ movie: movie.id, showDateTime: { $gte: new Date(`${dateStr}T00:00:00`), $lte: new Date(`${dateStr}T23:59:59`) } });
      if (existingShows.length > 0) continue;
      // Add shows for all times
      const showsToAdd = showTimes.map(time => ({
        movie: movie.id,
        showDateTime: new Date(`${dateStr}T${time}`),
        showPrice,
        occupiedSeats: {}
      }));
      await Show.insertMany(showsToAdd);
      added.push({ title: dbMovie.title, date: dateStr, times: showTimes });
    }
    res.json({ success: true, message: `Bulk shows added for ${added.length} movies.`, added });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
