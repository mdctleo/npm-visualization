import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectDownloadChart = state => state.downloadChart || initialState

const selectDownloadData = createSelector(
    selectDownloadChart,
    downloadChart => downloadChart.downloadData
)



export {selectDownloadChart, selectDownloadData}