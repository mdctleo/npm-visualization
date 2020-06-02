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

const selectDownloadData = createSelector(
    selectInputs,
    inputs => inputs.downloadData
)

const selectMaxDownload = createSelector(
    selectInputs,
    inputs => inputs.maxDownload
)

const selectisFetching = createSelector(
    selectInputs,
    inputs => inputs.isFetching
)


export {
    selectStartDate,
    selectEndDate,
    selectPackageNames,
    selectDownloadData,
    selectMaxDownload,
    selectColourScale,
    selectisFetching}