import {GET_DEPENDENCIES, RECEIVE_DEPENDENCIES, SET_ERROR, SET_LOADING} from "./action";

export const initialState = {
    packageName: "react",
    version: "latest",
    data: {},
    isLoading: false,
    isError: false
}



const dependency = (state = initialState, action) => {
    switch (action.type) {
        case GET_DEPENDENCIES:
            return {
                ...state,
                packageName: action.packageName,
                version: action.version,
            }
        case RECEIVE_DEPENDENCIES:
            return {
                ...state,
                data: action.data,
            }
        case SET_ERROR:
            return {
                ...state,
                isError: action.isError
            }
        case SET_LOADING:
            return {
                ...state,
                isLoading: action.isLoading
            }
        default:
            return state
    }
}

export default dependency