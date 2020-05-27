import { combineReducers } from 'redux'
import downloadChart from './download-chart/reducer'
import inputs from './inputs/reducer'

export default combineReducers({
    downloadChart,
    inputs
})