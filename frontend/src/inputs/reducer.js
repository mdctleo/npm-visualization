import {DELET_SEARCH, SET_DATE, SET_SEARCH} from "./action";
import moment from 'moment';

export const initialState = {
    start: moment().format('YYYY-MM-DD'),
    end: moment().format('YYYY-MM-DD'),
    packageNames: ""
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
                packageNames: state.packageNames + action.packageNames
            }
        default:
            return state
    }
}

export default inputs