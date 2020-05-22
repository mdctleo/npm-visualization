import { RECEIVE_PACKAGE_DOWNLOAD, GET_PCAKGE_DOWNLOAD } from "./action";

const todos = (state = [], action) => {
    switch (action.type) {
        case RECEIVE_PACKAGE_DOWNLOAD:
            return [
                ...state,
                {
                    isFetching: false,
                    data: action.data
                }
            ]
        case GET_PCAKGE_DOWNLOAD:
            return [
                ...state,
                {
                    isFetching: true
                }
            ]
        default:
            return state
    }
}

export default todos