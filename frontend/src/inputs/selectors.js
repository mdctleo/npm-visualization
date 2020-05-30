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

const selectColourScale = createSelector(
    selectInputs,
    inputs => inputs.colourScale
)

// const selectDownloadData = () => createSelector(
//     selectDownloadChart,
//     downloadChart => downloadChart.downloadData
// )

// const selectDownloadChart = state => state.downloadChart || initialState

const selectDownloadData = createSelector(
    selectInputs,
    inputs => inputs.downloadData
)

const selectMaxDownload = createSelector(
    selectInputs,
    inputs => inputs.maxDownload
)


export {selectStartDate, selectEndDate, selectPackageNames, selectDownloadData, selectMaxDownload, selectColourScale}