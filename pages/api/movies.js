// Import needed data
import fullMovies from '../../data/myflixdata-2020.json'

// Pre-create array of 'reduced' info movies (only stored in memory)
const reducedMovies = fullMovies.map((movie) => {
  return {
    id: movie.id,
    title: movie.title,
    year: movie.year,
    genres: movie.genres,
    rated: movie.rated,
    image: movie.image
  }
})

// Respond to GET requests at the path '/movies'
// - Provides reduced data for all movies
export default function route (req, res) {
  res.json(reducedMovies)
}
