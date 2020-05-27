import * as request from "superagent"

export const GET_PCAKGE_DOWNLOAD = 'GET_PACKAGE_DOWNLOAD'
export const RECEIVE_PACKAGE_DOWNLOAD = 'RECEIVE_PACKAGE_DOWNLOAD'

export const getPackageDownload = (packageName, start, end) => ({
    type: GET_PCAKGE_DOWNLOAD,
    packageName,
    start,
    end
})

export const receivePackageDownload = (responseBody) =>  {
    return {
        type: RECEIVE_PACKAGE_DOWNLOAD,
        start: responseBody.start,
        end: responseBody.end,
        maxDownload: responseBody.maxCount,
        data: responseBody.data
    }
}

export const fetchPackageDownload = (packageNames, start, end) => {
    return dispatch => {
        dispatch(getPackageDownload(packageNames, start, end))
        let url = "http://localhost:8000/getDownloads"
        return request.get(url)
            .query(`packageName=${packageNames}`)
            .query(`start=${start}`)
            .query(`end=${end}`)
            .then(response => {
                response.body.data.forEach((d) => {
                    d.downloads.forEach((dataPoint) => {
                        dataPoint.day = new Date(dataPoint.day)
                    })
                })
                dispatch(receivePackageDownload(response.body))
            })
            .catch(err => {
                console.log(err)
            })

    }

}