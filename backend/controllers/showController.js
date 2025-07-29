import axios from "axios";
import Movie from "../models/Movie.js";
import Show from "../models/Show.js";
import { inngest } from "../inngest/index.js";
import https from "https";

// TMDb v3 API Key
const API_KEY = 'aafa33b9d2c93bba28f3142f2c0192a0';

const isDev = process.env.NODE_ENV !== "production";

// Global HTTPS agent with TLS fix
const httpsAgent = new https.Agent({
  keepAlive: true,
  timeout: 10000,
  rejectUnauthorized: !isDev, // false for dev, true for prod
});

// ✅ API to get now playing movies from TMDB
export const getNowPlayingMovies = async (req, res) => {
  try {
    const { data } = await axios.get(
      `https://api.themoviedb.org/3/movie/now_playing`,
      {
        params: {
          api_key: API_KEY,
          language: 'en-US',
          page: 1,
        },
        httpsAgent,
        timeout: 20000,
      }
    );

    res.json({ success: true, movies: data.results });
  } catch (error) {
    console.error("TMDb Now Playing Error:", error.code || error.message);
    res.status(500).json({
      success: false,
      message: "Failed to fetch now playing movies",
      detail: error.code || error.message,
    });
  }
};

// ✅ API to add a new show to DB
export const addShow = async (req, res) => {
  try {
    const { movieId, showsInput, showPrice } = req.body;

    const isDev = process.env.NODE_ENV !== 'production';
    const httpsAgent = new https.Agent({
      keepAlive: true,
      rejectUnauthorized: !isDev
    });

    let movie = await Movie.findById(String(movieId));

    if (!movie) {
      // Fetch movie details & credits if not in DB
      const [movieDetailsResponse, movieCreditsResponse] = await Promise.all([
        axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}`,
          {
            params: { api_key: API_KEY },
            httpsAgent,
            headers: {Authorization : `Bearer ${process.env.TMDB_API_KEY}`},
            timeout: 20000
          }
        ),
        axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits`,
          {
            params: { api_key: API_KEY },
            httpsAgent,
            headers: {Authorization : `Bearer ${process.env.TMDB_API_KEY}`},
            timeout: 20000
          }
        ),
      ]);

      const movieApiData = movieDetailsResponse.data;
      const movieCreditsData = movieCreditsResponse.data;

      const movieDetails = {
        _id: String(movieId),
        title: movieApiData.title,
        overview: movieApiData.overview,
        poster_path: movieApiData.poster_path,
        backdrop_path: movieApiData.backdrop_path,
        genres: movieApiData.genres,
        casts: movieCreditsData.cast,
        release_date: movieApiData.release_date,
        original_language: movieApiData.original_language,
        tagline: movieApiData.tagline || "",
        vote_average: movieApiData.vote_average,
        runtime: movieApiData.runtime,
      };

      movie = await Movie.create(movieDetails);
    }

    // Create Show records
    const showsToCreate = [];

    for (const show of showsInput) {
      const showDate = show.date;
      for (const time of show.time) {
        const dateTimeString = `${showDate}T${time}`;
        const exists = await Show.findOne({
          movie: String(movieId),
          showDateTime: new Date(dateTimeString),
        });

        if (exists) {
          return res.json({
            success: false,
            message: `Show already exists for ${movie.title} at ${dateTimeString}`,
          });
        }

        showsToCreate.push({
          movie: String(movieId),
          showDateTime: new Date(dateTimeString),
          showPrice,
          occupiedSeats: {},
        });
      }
    }

    if (showsToCreate.length > 0) {
      await Show.insertMany(showsToCreate);
    }

    // Fire Inngest event
    await inngest.send({
      name: "app/show.added",
      data: { movieTitle: movie.title },
    });

    res.json({ success: true, message: "Show Added successfully." });
  } catch (error) {
    console.error("Add Show Error:", error.message);
    res.status(500).json({
      success: false,
      message: "Failed to add show",
      detail: error.message,
    });
  }
};

// ✅ API to get all upcoming shows
export const getShows = async (req, res) => {
  try {
    const shows = await Show.find({ showDateTime: { $gte: new Date() } })
      .populate("movie")
      .sort({ showDateTime: 1 });

    const uniqueShows = new Map();
    shows.forEach((show) => {
      uniqueShows.set(show.movie._id.toString(), show.movie);
    });

    res.json({ success: true, shows: Array.from(uniqueShows.values()) });
  } catch (error) {
    console.error("Get Shows Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

// ✅ API to get one movie's all show timings
export const getShow = async (req, res) => {
  try {
    const { movieId } = req.params;
    const shows = await Show.find({
      movie: movieId,
      showDateTime: { $gte: new Date() },
    });

    const movie = await Movie.findById(movieId);
    const dateTime = {};

    shows.forEach((show) => {
      const date = show.showDateTime.toISOString().split("T")[0];
      if (!dateTime[date]) {
        dateTime[date] = [];
      }
      dateTime[date].push({ time: show.showDateTime, showId: show._id });
    });

    res.json({ success: true, movie, dateTime });
  } catch (error) {
    console.error("Get Single Show Error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
