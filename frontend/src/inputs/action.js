import * as request from "superagent"
import {API_BASE} from "../API";

export const GET_PCAKGE_DOWNLOAD = 'GET_PACKAGE_DOWNLOAD'
export const RECEIVE_PACKAGE_DOWNLOAD = 'RECEIVE_PACKAGE_DOWNLOAD'
export const SET_COLOUR_SCALE = 'SET_COLOUR_SCALE'

export const SET_DATE = 'SET_DATE'
export const SET_SEARCH = 'SET_SERACH'
export const DELET_SEARCH = 'DELET_SEARCH'

export const SET_DOWNLOAD_ERROR = 'SET_DOWNLOAD_ERROR'
export const SET_DOWNLOAD_LOADING = 'SET_DOWNLOAD__LOADING'


export const setSearchDate = (start, end) => ({
    type: SET_DATE,
    start,
    end
})

export const setSearchTerm = (packageName) => ({
    type: SET_SEARCH,
    packageName
})

export const deleteSearch = (packageName) => ({
    type: DELET_SEARCH,
    packageName
})


export const getPackageDownload = (packageName, start, end) => ({
    type: GET_PCAKGE_DOWNLOAD,
    packageName,
    start,
    end
})

export const receivePackageDownload = (responseBody) =>  {
    return {
        type: RECEIVE_PACKAGE_DOWNLOAD,
        maxDownload: responseBody.maxCount,
        data: responseBody.data
    }
}

export const setColourScale = (colourScale) => {
    return {
        type: SET_COLOUR_SCALE,
        colourScale: colourScale
    }
}

export const setDownloadLoading = (isLoading) => {
    return {
        type: SET_DOWNLOAD_LOADING,
        isLoading
    }
}

export const setDownloadError = (isError, message) => {
    return {
        type: SET_DOWNLOAD_ERROR,
        isError,
        message
    }
}

export const fetchPackagesDownload = (packageNames, start, end) => {
    return dispatch => {
        dispatch(setDownloadLoading(true))
        dispatch(getPackageDownload(packageNames, start, end))
        let url = `/getDownloads`
        return request.get(url)
            .query(`packageName=${packageNames}`)
            .query(`start=${start}`)
            .query(`end=${end}`)
            .then(response => {
                response.body.data.forEach((d) => {
                    d.downloads.forEach((dataPoint) => {
                        dataPoint.day = new Date(dataPoint.day)
                    })
                })
                dispatch(setDownloadLoading(false))
                dispatch(receivePackageDownload(response.body))
            })
            .catch(err => {
                dispatch(setDownloadLoading(false))
                dispatch(setDownloadError(true, err.message))
            })
    }

}