import { combineReducers } from 'redux'
import inputs from './inputs/reducer'
import dependency from './dependency-controls/reducer'

export default combineReducers({
    inputs,
    dependency
})