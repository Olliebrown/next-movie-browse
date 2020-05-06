import { combineReducers } from 'redux'
import {
  SET_ALERT_STATE,
  SET_MODAL_OPEN,

  REQUEST_MOVIES,
  RECEIVE_MOVIES,

  REQUEST_DETAILS,
  RECEIVE_DETAILS
} from './actions'

function alert (state = { message: '', open: false }, action) {
  switch (action.type) {
    case SET_ALERT_STATE:
      return action.alert
    default:
      return state
  }
}

function modalOpen (state = false, action) {
  switch (action.type) {
    case SET_MODAL_OPEN:
      return action.open
    default:
      return state
  }
}

function movies (
  state = { isFetching: false, data: [] },
  action
) {
  switch (action.type) {
    case REQUEST_MOVIES:
      return { ...state, isFetching: true }
    case RECEIVE_MOVIES:
      return { ...state, isFetching: false, data: action.data }
    default:
      return state
  }
}

function movie (
  state = { isFetching: false, data: null },
  action
) {
  switch (action.type) {
    case REQUEST_DETAILS:
      return { ...state, isFetching: true }
    case RECEIVE_DETAILS:
      return { ...state, isFetching: false, data: action.data }
    default:
      return state
  }
}

const movieBrowseApp = combineReducers({
  alert,
  modalOpen,
  movies,
  movie
})

export default movieBrowseApp
