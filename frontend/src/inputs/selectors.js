import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectInputs = state => state.input || initialState

const selectStartDate = createSelector(
    selectInputs,
    inputs => inputs.start
)

const selectEndDate = createSelector(
    selectInputs,
    inputs => inputs.end
)

const selectPackageNames = createSelector(
    selectInputs,
    inputs => inputs.packageNames
)

// const selectDownloadData = () => createSelector(
//     selectDownloadChart,
//     downloadChart => downloadChart.downloadData
// )

export {selectStartDate, selectEndDate}