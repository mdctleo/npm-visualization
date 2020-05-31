import {GET_DEPENDENCIES, RECEIVE_DEPENDENCIES} from "./action";

// export const initialState = {
//     packkgeName: "",
//     version: "",
//     data: {}
// }

export const initialState = {
    packageName: "react",
    version: "latest",
    data: {}
}



const dependencyControls = (state = initialState, action) => {
    switch (action.type) {
        case GET_DEPENDENCIES:
            return {
                ...state,
                packageName: action.packageName,
                version: action.version
            }
        case RECEIVE_DEPENDENCIES:
            return {
                ...state,
                data: action.data
            }
        default:
            return state
    }
}

export default dependencyControls