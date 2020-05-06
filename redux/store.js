// Redux support for central state store
import thunk from 'redux-thunk'
import { createLogger } from 'redux-logger'
import { createStore, applyMiddleware } from 'redux'

// Custom redux methods
import movieBrowseApp from './reducers'

export default function configureStore (includeLogger, withSSR) {
  if (withSSR) {
    // Create and configure redux store with middleware
    if (includeLogger) {
      const logger = createLogger()
      return (initialState, options) => {
        return createStore(movieBrowseApp, initialState, applyMiddleware(thunk, logger))
      }
    }

    // Without logger middleware
    return (initialState, options) => {
      return createStore(movieBrowseApp, initialState, applyMiddleware(thunk))
    }
  }

  // Create and configure redux store with middleware
  if (includeLogger) {
    const logger = createLogger()
    return createStore(movieBrowseApp, applyMiddleware(thunk, logger))
  }

  // Without logger middleware
  return createStore(movieBrowseApp, applyMiddleware(thunk))
}
