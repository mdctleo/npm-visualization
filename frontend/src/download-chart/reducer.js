import { RECEIVE_PACKAGE_DOWNLOAD, GET_PCAKGE_DOWNLOAD } from "./action";

export const initialState = {
    isFetching: false,
    start: new Date(),
    end: new Date(),
    maxDownload: 0,
    downloadData: [],
}

const downloadChart = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_PACKAGE_DOWNLOAD:
            return {
                ...state,
                isFetching: false,
                start: new Date(action.start),
                end: new Date(action.end),
                maxDownload: action.maxDownload > state.maxDownload || state.maxDownload === undefined ? action.maxDownload : state.maxDownload,
                downloadData: [...state.downloadData,
                    {name: action.name, downloads: action.downloads.map((d) => {return {day: new Date(d.day), downloads: d.downloads}})}
                ]
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

export default downloadChart