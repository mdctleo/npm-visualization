import * as request from "superagent"

export const GET_PCAKGE_DOWNLOAD = 'GET_PACKAGE_DOWNLOAD'
export const RECEIVE_PACKAGE_DOWNLOAD = 'RECEIVE_PACKAGE_DOWNLOAD'

export const getPackageDownload = (packageName, start, end) => ({
    type: GET_PCAKGE_DOWNLOAD,
    packageName,
    start,
    end
})

export const receivePackageDownload = (packageName, data) =>  {
    return {
        type: RECEIVE_PACKAGE_DOWNLOAD,
        packageName,
        data
    }
}

export const fetchPackageDownload = (packageName, start, end) => {
    return dispatch => {
        dispatch(getPackageDownload(packageName, start, end))
        let url = "http://localhost:8000/getDownloads"
        return request.get(url)
            .then(response => {
                dispatch(receivePackageDownload(packageName, response.body))
            })
            .catch(err => {
                console.log(err)
            })

    }

}