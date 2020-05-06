import React, { useState } from 'react'
import PropTypes from 'prop-types'

import Grid from '@material-ui/core/Grid'
import Skeleton from '@material-ui/lab/Skeleton'
import MovieTile from './MovieTile.jsx'

// How many skeleton tiles to draw when data is not yet ready
const SKELETON_TILE_COUNT = 12

// Track how many images have loaded
let imagesLoaded = 0

function MovieGrid (props) {
  // Track loading of images
  const [dataReady, setDataReady] = useState(false)
  const incrementImageReady = () => {
    imagesLoaded++
    if (imagesLoaded === props.movieData.length) {
      setDataReady(true)
    }
  }

  // Build local array of movie tiles
  const movieTiles = props.movieData.map((movie) => {
    return (<MovieTile key={movie.id} movie={movie}
      imageLoadedCallback={incrementImageReady} />)
  })

  // If the array is empty (e.g. data is not ready)
  // build array of 'skeleton' tiles instead
  const skeletonTiles = []
  if (!dataReady) {
    for (let i = 0; i < SKELETON_TILE_COUNT; i++) {
      skeletonTiles.push(
        <Grid item key={i}>
          <Skeleton variant="rect" animation="wave"
            width={260} height={446} />
        </Grid>
      )
    }
  }

  if (skeletonTiles.length > 0) {
    // Render the skeleton tiles with the movie tiles 'hidden'
    // The movie tiles need to still be there or they won't
    // start loading their images!
    return (
      <Grid container spacing={4} justify="center">
        {skeletonTiles}
        <div hidden>
          {movieTiles}
        </div>
      </Grid>
    )
  }

  // Images are all ready so show the movie tiles now
  return (
    <Grid container spacing={4} justify="center">
      {movieTiles}
    </Grid>
  )
}

MovieGrid.propTypes = {
  movieData: PropTypes.arrayOf(PropTypes.object).isRequired
}

export default MovieGrid
