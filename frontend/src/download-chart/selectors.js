import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectDownloadChart = state => console.log(state)
const selectDownloadData = () => createSelector(
    selectDownloadChart,
    downloadChart => downloadChart.data
)

export { selectDownloadChart, selectDownloadData}