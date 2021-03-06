// Import needed data
import fullMovies from '../../../data/myflixdata-2020.json'

// Respond to a get request at the path '/movie/[id]'
// - Searches for and returns full info for the indicated movie
export default function route (req, res) {
  // Look up the id provided
  const { query: { id } } = req
  const match = fullMovies.find((movie) => {
    return (movie.id === id)
  })

  // Check if a match was found
  if (!match) {
    res.status(404).json({ error: 'id not found' })
  } else {
    res.json(match)
  }
}
