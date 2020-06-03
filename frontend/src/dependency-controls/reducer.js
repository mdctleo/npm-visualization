import {
    GET_DEPENDENCIES,
    RECEIVE_DEPENDENCIES,
    SET_DEPENDENCY_ERROR,
    SET_DEPENDENCY_LOADING,
} from "./action";

export const initialState = {
    packageName: "react",
    version: "latest",
    data: {},
    dependencyLoading: false,
    dependencyError: false
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
        case SET_DEPENDENCY_ERROR:
            return {
                ...state,
                dependencyError: action.isError
            }
        case SET_DEPENDENCY_LOADING:
            return {
                ...state,
                dependencyLoading: action.isLoading
            }
        default:
            return state
    }
}

export default dependency