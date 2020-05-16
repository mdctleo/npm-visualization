import * as request from 'superagent'
const API_BASE = `https://registry.npmjs.org`
export const getRegistryMeta = async () => {
    try {
        let result = await request.get(`${API_BASE}`).withCredentials()
        return result
    } catch (err) {
        console.log("get registry meta failed")
        console.log(err)
    }
}

export const getPackage = async (packageName) => {
    try {
        let response = await request.get(`${API_BASE}/${packageName}`)
        console.log(response)
        return response
    } catch (err) {
        console.log("get pacakge failed")
        console.log(err)
    }
}
