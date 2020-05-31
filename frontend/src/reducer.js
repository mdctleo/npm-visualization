import { combineReducers } from 'redux'
import inputs from './inputs/reducer'
import dependencyControls from './dependency-controls/reducer'

export default combineReducers({
    inputs,
    dependencyControls
})