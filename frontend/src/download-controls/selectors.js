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

const selectDownloadLoading = createSelector(
    selectInputs,
    inputs => inputs.downloadLoading
)

const selectDownloadError = createSelector(
    selectInputs,
    inputs => inputs.downloadError
)


export {
    selectStartDate,
    selectEndDate,
    selectPackageNames,
    selectDownloadData,
    selectMaxDownload,
    selectColourScale,
    selectDownloadLoading,
    selectDownloadError
}