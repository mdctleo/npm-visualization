import { createSelector } from 'reselect'
import { initialState } from './reducer'

const selectDownloads = state => state.downloads || initialState

const selectStartDate = createSelector(
    selectDownloads,
    downloads => downloads.start
)

const selectEndDate = createSelector(
    selectDownloads,
    downloads => downloads.end
)

const selectPackageNames = createSelector(
    selectDownloads,
    downloads => downloads.packageNames.length > 0? downloads.packageNames.split(",") : []
)

const selectColourScale = createSelector(
    selectDownloads,
    downloads => downloads.colourScale
)

const selectDownloadData = createSelector(
    selectDownloads,
    downloads => downloads.downloadData
)

const selectMaxDownload = createSelector(
    selectDownloads,
    downloads => downloads.maxDownload
)

const selectDownloadLoading = createSelector(
    selectDownloads,
    downloads => downloads.downloadLoading
)

const selectDownloadError = createSelector(
    selectDownloads,
    downloads => downloads.downloadError
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