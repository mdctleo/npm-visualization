import * as request from "superagent";

export const GET_DEPENDENCIES = 'GET_DEPENDENCIES'
export const RECEIVE_DEPENDENCIES = 'RECEIVE_DEPENDENCIES'

export const SET_DEPENDENCY_ERROR = 'SET_DEPENDENCY_ERROR'
export const SET_DEPENDENCY_LOADING = 'SET_DEPENDENCY_LOADING'

export const getDependencies = (packageName, version) => {
    return {
        type: GET_DEPENDENCIES,
        packageName,
        version
    }
}

export const receiveDependencies = (data) => {
    return {
        type: RECEIVE_DEPENDENCIES,
        data
    }
}

export const setDependencyError = (isError, message) => {
    return {
        type: SET_DEPENDENCY_ERROR,
        isError,
        message
    }
}

export const setDependencyLoading = (isLoading) => {
    return {
        type: SET_DEPENDENCY_LOADING,
        isLoading
    }
}

export const fetchDependencies = (packageName, version) => {
    return dispatch => {
        dispatch(setDependencyLoading(true))
        dispatch(getDependencies(packageName, version))
        let url = "http://localhost:8000/getDependencies"
        return request.get(url)
            .query(`packageName=${packageName}`)
            .query(`version=${version}`)
            .then(response => {
                dispatch(setDependencyLoading(false))
                dispatch(receiveDependencies(response.body))
            })
            .catch(err => {
                dispatch(setDependencyLoading(false))
                dispatch(setDependencyError(true, err.message))
            })
    }
}