import * as request from "superagent"

export const GET_PCAKGE_DOWNLOAD = 'GET_PACKAGE_DOWNLOAD'
export const RECEIVE_PACKAGE_DOWNLOAD = 'RECEIVE_PACKAGE_DOWNLOAD'

export const getPackageDownload = (packageName, start, end) => ({
    type: GET_PCAKGE_DOWNLOAD,
    packageName,
    start,
    end
})

export const receivePackageDownload = (data) =>  {
    return {
        type: RECEIVE_PACKAGE_DOWNLOAD,
        start: data.start,
        end: data.end,
        maxDownload: data.maxDownload,
        name: data.package,
        downloads: data.downloads
    }
}

export const fetchPackageDownload = (packageName, start, end) => {
    return dispatch => {
        dispatch(getPackageDownload(packageName, start, end))
        let url = "http://localhost:8000/getDownloads"
        return request.get(url)
            .query(`packageName=${packageName}`)
            .query(`start=${start}`)
            .query(`end=${end}`)
            .then(response => {
                dispatch(receivePackageDownload(response.body))
            })
            .catch(err => {
                console.log(err)
            })

    }

}