import React, { useEffect } from 'react'
import PropTypes from 'prop-types'

import { connect } from 'react-redux'
import {
  setAlertState,
  fetchMoviesIfNeeded,
  fetchMovies
} from '../redux/actions'

import Alert from '@material-ui/lab/Alert'
import Snackbar from '@material-ui/core/Snackbar'
import Grid from '@material-ui/core/Grid'

import Banner from './Banner.jsx'
import MovieGrid from './MovieGrid.jsx'
import MovieDetailsModal from './MovieDetailsModal.jsx'

function AsyncMovieBrowsePage (props) {
  // Handle alert closing
  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') { return }
    props.dispatch(setAlertState({ open: false }))
  }

  // Retrieve the movie grid data
  useEffect(() => {
    props.dispatch(fetchMoviesIfNeeded())
  })

  const { movieData, isFetching, alert } = props
  return (
    <Grid container>
      <Grid item xs={12}>
        <Banner title="MyFlix Movie Browser">
          Click on a movie below for more information.
        </Banner>
      </Grid>
      <Grid item xs={12}>
        {!isFetching &&
          <MovieGrid movieData={movieData} />
        }
      </Grid>
      <MovieDetailsModal />
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity="error">
          {alert.message}
        </Alert>
      </Snackbar>
    </Grid>
  )
}

AsyncMovieBrowsePage.getInitialProps = ({ store, isServer }) => {
  if (isServer) {
    store.dispatch(fetchMovies())
  }
}

// Props validation
AsyncMovieBrowsePage.propTypes = {
  movieData: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  alert: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired
}

// Translating global state from the store into props
function mapStateToProps (state) {
  const { movies, alert } = state

  return {
    movieData: movies.data,
    isFetching: movies.isFetching,
    alert
  }
}

// Connect to redux
export default connect(mapStateToProps)(AsyncMovieBrowsePage)
