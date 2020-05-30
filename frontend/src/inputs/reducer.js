import {
    DELET_SEARCH,
    SET_DATE,
    SET_SEARCH,
    GET_PCAKGE_DOWNLOAD,
    RECEIVE_PACKAGE_DOWNLOAD,
    SET_COLOUR_SCALE
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
    isFetching: false,
    start: "2016-01-01",
    end: "2016-03-01",
    packageNames: "",
    maxDownload: 100,
    downloadData: [],
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
                isFetching: false,
                maxDownload: action.maxDownload > state.maxDownload || state.maxDownload === undefined ? action.maxDownload : state.maxDownload,
                downloadData: [...state.downloadData, ...action.data]
            }
        case GET_PCAKGE_DOWNLOAD:
            return {
                ...state,
                isFetching: true
            }
        default:
            return state
    }
}

export default inputs