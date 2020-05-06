import React, { useState } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { fetchDetails } from '../redux/actions'

import { makeStyles } from '@material-ui/core/styles'
import { Grid, ButtonBase, Paper, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  paper: {
    width: '260px',
    marginBottom: '15px',
    verticalAlign: 'bottom',
    textAlign: 'center',
    padding: '10px'
  },
  summaryTitle: {
    display: 'block',
    height: '4.5em'
  },
  summaryInfo: {
    display: 'block',
    height: '5em',
    marginTop: '1em'
  },
  buttonRipple: {
    width: '260px',
    height: '446px'
  }
}))

function MovieTile (props) {
  // Show animation of paper drop shadow when mouse hovers
  const [elevation, setElevation] = useState(1)
  const onMouseOver = () => setElevation(5)
  const onMouseOut = () => setElevation(1)

  // Respond to active movie changing by retrieveing data
  const movieTileClicked = (event) => {
    event.preventDefault()
    props.dispatch(fetchDetails(props.movie.id))
  }

  // Show placeholder skeleton until image is fully loaded
  const onImageLoaded = () => {
    if (props.imageLoadedCallback) {
      props.imageLoadedCallback()
    }
  }

  // Build the MovieTile element
  const classes = useStyles()
  return (
    <Grid item>
      <ButtonBase onClick={movieTileClicked}
        TouchRippleProps={{ className: classes.buttonRipple }}>
        <Paper elevation={elevation} className={classes.paper}
          onMouseOver={onMouseOver} onMouseOut={onMouseOut}>
          <Typography variant="h6" className={classes.summaryTitle}>
            {props.movie.title}
          </Typography>
          <img onLoad={onImageLoaded} onError={onImageLoaded}
            alt={`${props.movie.title} Poster Thumbnail`}
            src={`images/thumbs/${props.movie.image}`} height={250} />
          <Typography variant="body2" className={classes.summaryInfo}>
            {props.movie.genres.join(', ')} -- {props.movie.year}, {props.movie.rated}
          </Typography>
        </Paper>
      </ButtonBase>
    </Grid>
  )
}

// Requires a movie and expects a movie clicked callback
MovieTile.propTypes = {
  movie: PropTypes.object.isRequired,
  imageLoadedCallback: PropTypes.func,
  dispatch: PropTypes.func.isRequired
}

// Expose for use in other modules
export default connect(() => { return {} })(MovieTile)
