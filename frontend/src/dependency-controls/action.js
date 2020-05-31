import * as request from "superagent";
import {getPackageDownload, receivePackageDownload} from "../inputs/action";

export const GET_DEPENDENCIES = 'GET_DEPENDENCIES'
export const RECEIVE_DEPENDENCIES = 'RECEIVE_DEPENDENCIES'

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

export const fetchDependencies = (packageName, version) => {
    return dispatch => {
        dispatch(getDependencies(packageName, version))
        let url = "http://localhost:8000/getDependencies"
        return request.get(url)
            .query(`packageName=${packageName}`)
            .query(`version=${version}`)
            .then(response => {
                dispatch(receiveDependencies(response.body))
            })
            .catch(err => {
                console.log(err)
            })
    }
}