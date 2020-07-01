import { combineReducers } from 'redux'
import downloads from './download-controls/reducer'
import dependency from './dependency-controls/reducer'

export default combineReducers({
    downloads,
    dependency
})