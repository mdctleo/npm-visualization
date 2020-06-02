import {GET_DEPENDENCIES, RECEIVE_DEPENDENCIES} from "./action";

// export const initialState = {
//     packkgeName: "",
//     version: "",
//     data: {}
// }

export const initialState = {
    packageName: "react",
    version: "latest",
    data: {},
    isFetching: false
}



const dependency = (state = initialState, action) => {
    switch (action.type) {
        case GET_DEPENDENCIES:
            return {
                ...state,
                packageName: action.packageName,
                version: action.version,
                isFetching: true
            }
        case RECEIVE_DEPENDENCIES:
            return {
                ...state,
                data: action.data,
                isFetching: false
            }
        default:
            return state
    }
}

export default dependency