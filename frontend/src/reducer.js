import { combineReducers } from 'redux'
import inputs from './download-controls/reducer'
import dependency from './dependency-controls/reducer'

export default combineReducers({
    inputs,
    dependency
})