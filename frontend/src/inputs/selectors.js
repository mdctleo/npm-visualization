import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectInputs = state => state.inputs || initialState

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
    inputs => inputs.packageNames.length > 0? inputs.packageNames.split(",") : []
)

// const selectDownloadData = () => createSelector(
//     selectDownloadChart,
//     downloadChart => downloadChart.downloadData
// )

export {selectStartDate, selectEndDate, selectPackageNames}