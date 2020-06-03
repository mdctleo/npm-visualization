import * as request from "superagent";
import {getPackageDownload, receivePackageDownload} from "../inputs/action";

export const GET_DEPENDENCIES = 'GET_DEPENDENCIES'
export const RECEIVE_DEPENDENCIES = 'RECEIVE_DEPENDENCIES'

export const SET_ERROR = 'SET_ERROR'
export const SET_LOADING = 'SET_LOADING'

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

export const setError = (isError, message) => {
    return {
        type: SET_ERROR,
        isError,
        message
    }
}

export const setLoading = (isLoading) => {
    return {
        type: SET_LOADING,
        isLoading
    }
}

export const fetchDependencies = (packageName, version) => {
    return dispatch => {
        dispatch(setLoading(true))
        dispatch(getDependencies(packageName, version))
        let url = "http://localhost:8000/getDependencies"
        return request.get(url)
            .query(`packageName=${packageName}`)
            .query(`version=${version}`)
            .then(response => {
                dispatch(setLoading(false))
                dispatch(receiveDependencies(response.body))
            })
            .catch(err => {
                dispatch(setLoading(false))
                dispatch(setError(true, err.message))
            })
    }
}