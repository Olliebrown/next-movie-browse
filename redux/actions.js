import Axios from 'axios'

/*
 * action types
 */
export const SET_ALERT_STATE = 'SET_ALERT_STATE'
export const SET_MODAL_OPEN = 'SET_MODAL_OPEN'

export const REQUEST_MOVIES = 'REQUEST_MOVIES'
export const REQUEST_DETAILS = 'REQUEST_DETAILS'
export const RECEIVE_MOVIES = 'RECEIVE_MOVIES'
export const RECEIVE_DETAILS = 'RECEIVE_DETAILS'

export const FETCH_MOVIES_REQUEST = 'FETCH_MOVIES_REQUEST'
export const FETCH_MOVIES_FAILURE = 'FETCH_MOVIES_FAILURE'
export const FETCH_MOVIES_SUCCESS = 'FETCH_MOVIES_SUCCESS'

export const FETCH_DETAILS_REQUEST = 'FETCH_DETAILS_REQUEST'
export const FETCH_DETAILS_FAILURE = 'FETCH_DETAILS_FAILURE'
export const FETCH_DETAILS_SUCCESS = 'FETCH_DETAILS_SUCCESS'

/*
 * action creators
 */

export function setAlertState (alert) {
  return { type: SET_ALERT_STATE, alert }
}

export function setModalOpen (open) {
  return { type: SET_MODAL_OPEN, open }
}

export function requestMovies () {
  return { type: REQUEST_MOVIES }
}

export function requestDetails (movieID) {
  return { type: REQUEST_DETAILS, movieID }
}

export function receiveMovies (response) {
  return { type: RECEIVE_MOVIES, data: response.data }
}

export function receiveDetails (response) {
  return { type: RECEIVE_DETAILS, data: response.data }
}

export function fetchMovies () {
  return (dispatch) => {
    dispatch(requestMovies())
    return Axios.get('api/movies')
      .then((results) => { dispatch(receiveMovies(results)) })
  }
}

export function fetchMoviesIfNeeded () {
  return (dispatch, getState) => {
    const curMovies = getState().movies.data
    if (!getState().movies.isFetching &&
      (curMovies == null || curMovies.length === 0)) {
      return dispatch(fetchMovies())
    }
  }
}

export function fetchDetails (movieID) {
  return (dispatch) => {
    dispatch(requestDetails())
    return Axios.get(`api/movie/${movieID}`)
      .then((results) => { dispatch(receiveDetails(results)) })
  }
}
