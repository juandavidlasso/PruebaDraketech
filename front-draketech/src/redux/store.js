import { applyMiddleware, compose } from 'redux'
import { configureStore } from '@reduxjs/toolkit'
import thunk from 'redux-thunk'
import reducer from './reducers'

// Configuración del store de Redux
const loadState = () => {
  try {
    const serializedData = sessionStorage.getItem('state')
    if(serializedData === null) {
      return undefined
    }
    return (JSON.parse(serializedData))
  } catch (error) {
    return undefined
  }
}


const saveState = (state) => {
  try {
    const serializedData = JSON.stringify(state)
    sessionStorage.setItem('state', serializedData)
  } catch (error) {
    return null
  }
}


const initialState = loadState() || {}

const composeEnhancers = compose(
  applyMiddleware(thunk),
  typeof window === 'object' && typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ?
    window.__REDUX_DEVTOOLS_EXTENSION__()
  : 
    f => f
);

const store = configureStore({
  reducer,
  initialState,
  composeEnhancers
})



store.subscribe( function () {
  saveState(store.getState())
})

export default store