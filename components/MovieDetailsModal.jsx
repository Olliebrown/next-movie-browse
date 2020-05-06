import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import { setModalOpen } from '../redux/actions'

import { makeStyles } from '@material-ui/core/styles'

import {
  Button, Card, CardContent, CardMedia, Typography,
  Modal, Fade, Backdrop, Grid
} from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  cardRoot: {
    display: 'flex',
    maxWidth: 800,
    minHeight: 420
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: 500
  },
  description: {
    borderTop: '1px solid lightgrey',
    borderBottom: '1px solid lightgrey',
    maxHeight: 400,
    overflow: 'auto'
  },
  content: {
    flex: '1 0 auto'
  },
  poster: {
    width: 300,
    objectFit: 'contain'
  },
  controls: {
    display: 'flex',
    alignItems: 'center',
    paddingLeft: theme.spacing(1),
    paddingBottom: theme.spacing(1)
  }
}))

function MovieDetailsModal (props) {
  // Destructure props
  const { modalOpen, isFetching, movie, dispatch } = props

  // Model open state
  const handleClose = () => {
    dispatch(setModalOpen(false))
  }

  // Reopen modal if movie changes
  useEffect(() => {
    if (movie !== null) {
      dispatch(setModalOpen(true))
    }
  }, [movie, dispatch])

  // Compute MUI styles
  const classes = useStyles()

  // If the movie is not ready, render empty div
  if (isFetching || !movie) {
    return (<div />)
  }

  // Render the dialog modal
  return (
    // Pop-up modal container for the Card
    <Modal open={modalOpen} onClose={handleClose}
      aria-labelledby='detailsModalTitle' closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{ timeout: 500 }}
      className={classes.root}>
      <Fade in={modalOpen}>

        {/* Main modal content is a card */}
        <Card className={classes.cardRoot}>

          {/* 'Details' are the text on the left and form a column based flexbox */}
          <div className={classes.details}>
            <CardContent className={classes.content}>

              {/* A grid is used to space out the different movie details */}
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography component="h5" variant="h5" id='dailsModalTitle'>
                    {movie.title} ({movie.year})
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="subtitle1" color="textSecondary">
                    {movie.genres.join(', ')}
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="subtitle1" color="textSecondary">
                    Rated: {movie.rated}<br />
                  </Typography>
                </Grid>
                <Grid item xs={4}>
                  <Typography variant="subtitle1" color="textSecondary">
                    IMDB Score: {movie.imdbrating}/10
                  </Typography>
                </Grid>
                <Grid item xs={12} className={classes.description}>
                  <Typography variant="body1">
                    {movie.description}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2">
                    Written by {movie.writers.join(', ')}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2">
                    Directed by {movie.directors.join(', ')}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2">
                    Starring {movie.actors.join(', ')}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>

            {/* Show a simple text button at the bottom-left for closing the modal */}
            <div className={classes.controls}>
              <Button onClick={handleClose} color="primary">
                Close
              </Button>
            </div>
          </div>

          {/* To the right of the details flexbox, show the movie poster */}
          <CardMedia className={classes.poster} component='img'
            image={`images/posters/${movie.image}`}
            title={`'${movie.title}' movie poster`}
          />
        </Card>
      </Fade>
    </Modal>
  )
}

MovieDetailsModal.propTypes = {
  modalOpen: PropTypes.bool.isRequired,
  isFetching: PropTypes.bool.isRequired,
  movie: PropTypes.object,
  dispatch: PropTypes.func.isRequired
}

// Translating global state from the store into props
function mapStateToProps (state) {
  return {
    modalOpen: state.modalOpen,
    isFetching: state.movie.isFetching,
    movie: state.movie.data
  }
}

// Connect to redux
export default connect(mapStateToProps)(MovieDetailsModal)
