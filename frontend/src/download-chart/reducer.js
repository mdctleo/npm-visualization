import { RECEIVE_PACKAGE_DOWNLOAD, GET_PCAKGE_DOWNLOAD } from "./action";

export const initialState = {
    isFetching: false,
    data: []
}

const downloadChart = (state = initialState, action) => {
    switch (action.type) {
        case RECEIVE_PACKAGE_DOWNLOAD:
            return Object.assign({}, state, {
                isFetching: false,
                data: action.data
            })
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