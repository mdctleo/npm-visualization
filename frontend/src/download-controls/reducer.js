import {
    DELETE_DOWNLOAD_SEARCH,
    SET_DATE,
    SET_SEARCH,
    GET_PCAKGE_DOWNLOAD,
    RECEIVE_PACKAGE_DOWNLOAD,
    SET_COLOUR_SCALE,SET_DOWNLOAD_LOADING, SET_DOWNLOAD_ERROR
} from "./action";
import moment from 'moment';

// export const initialState = {
//     isFetching: false,
//     start: moment().format('YYYY-MM-DD'),
//     end: moment().format('YYYY-MM-DD'),
//     packageNames: "",
//     maxDownload: 0,
//     downloadData: [],
// }

export const initialState = {
    downloadLoading: false,
    start: "2016-01-01",
    end: "2016-03-01",
    packageNames: "",
    maxDownload: 100,
    downloadData: [],
    downloadError: false
}

const inputs = (state = initialState, action) => {
    switch (action.type) {
        case SET_DATE:
            return {
                ...state,
                start: action.start,
                end: action.end
            }
        case SET_SEARCH:
            return {
                ...state,
                packageNames: state.packageNames.length > 0? `${state.packageNames},${action.packageName}` : `${action.packageName}`
            }
        case SET_COLOUR_SCALE:
            return {
                ...state,
                colourScale: action.colourScale
            }
        case RECEIVE_PACKAGE_DOWNLOAD:
            return {
                ...state,
                // maxDownload: action.maxDownload > state.maxDownload || state.maxDownload === undefined ? action.maxDownload : state.maxDownload,
                maxDownload: getMaxDownload([...state.downloadData, ...action.data]),
                downloadData: [...state.downloadData, ...action.data]
            }
        case GET_PCAKGE_DOWNLOAD:
            return {
                ...state,
            }
        case SET_DOWNLOAD_LOADING:
            return {
                ...state,
                downloadLoading: action.isLoading
            }
        case SET_DOWNLOAD_ERROR:
            return {
                ...state,
                downloadError: action.isError
            }
        case DELETE_DOWNLOAD_SEARCH:
            let i = state.downloadData.findIndex(d => d.package === action.packageName)
            let packageNamesArr = state.packageNames.split(",")
            let j = packageNamesArr.findIndex(name => name === action.packageName)
            let newDownloadData = [...state.downloadData.slice(0, i), ...state.downloadData.slice(i+1, state.downloadData.length)]
            return {
                ...state,
                maxDownload: getMaxDownload(newDownloadData),
                downloadData: [...state.downloadData.slice(0, i), ...state.downloadData.slice(i+1, state.downloadData.length)],
                packageNames: packageNamesArr.slice(0, j).concat(packageNamesArr.slice(j+1, packageNamesArr.length)).join()
            }
        default:
            return state
    }
}

const getMaxDownload = (data) => {
    let maxDownload = Number.MIN_SAFE_INTEGER

    data.forEach((pack) => {
        if (pack.maxDownload > maxDownload) {
            maxDownload = pack.maxDownload
        }
    })

    return maxDownload

}

export default inputs