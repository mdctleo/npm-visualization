import * as request from "superagent"
import * as fs from "fs"
import {isNumber} from "util";
export class API {
    API_BASE: string
    DOWNLOAD_API: string
    constructor(apiBase: string, downloadAPI: string) {
        this.API_BASE = apiBase
        this.DOWNLOAD_API = downloadAPI
    }
    // argument example /downloads/point/2014-02-01:2014-02-08/express
    public async getDownloads(period: string, packageNames: string): Promise<any>{
        let url =`${this.DOWNLOAD_API}/range/${period}/`

        url += `${packageNames}`

        // for (const [i, packageName] of packageNames.entries()) {
        //     if (i !== packageNames.length - 1) {
        //         url += `${packageName},`
        //     } else {
        //         url += `${packageName}`
        //     }
        // }

        let result = await request.get(url)

        let mresult = {
            maxCount: 0,
            start: "",
            end: "",
            data: []
        }
        console.log(result.body)

        let maxCount = 0
        let data: Array<any> = []
        for (let [packageName, pack] of Object.entries(result.body)) {
            mresult.start = result.body[packageName].start
            mresult.end = result.body[packageName].end
            delete result.body[packageName].start
            delete result.body[packageName].end
            for (let dataPoint of pack.downloads) {
                maxCount = dataPoint.downloads > maxCount ? dataPoint.downloads : maxCount
            }

            data.push(result.body[packageName])
        }

        mresult.maxCount = maxCount
        mresult.data = data

        return mresult

    }

    public async getRegistryMeta(): Promise<any> {
        try {
            let url = `${this.API_BASE}`
            let response = await request.get(url)
            // console.log(response.body)
        } catch (err) {
            console.log("failed to get registry meta")
            console.log(err)
        }
    }


    public async getPackage (packageName: string): Promise<any> {
        try {
            let url = `${this.API_BASE}/${packageName}`
            let response = await request.get(url).accept('application/vnd.npm.install-v1+json; q=1.0, application/json; q=0.8, */*')
            console.log(response.body)
            return response
        } catch (err) {
            console.log("get pacakge failed")
            console.log(err)
        }
    }

    // public async getPackage (packageName: string, version: string): Promise<any> {
    //     try {
    //         let url = `${this.API_BASE}/${packageName}/${version}`
    //         let response = await request.get(url)
    //         console.log(response.body)
    //         return response
    //     } catch (err) {
    //         console.log("get package version failed")
    //         console.log(err)
    //     }
    // }

    public async search(text: string, size=20, from=0,
                        quality=0, popularity=1, maintenance=0): Promise<any> {
        try {
            let url = `${this.API_BASE}/-/v1/search`

            let response = await request.get(url)
                .query({text: text})
                .query({size: size})
                .query({from: from})
                .query({quality: quality})
                .query({popularity: popularity})
                .query({maintenance: maintenance})

            console.log(response.body)
        } catch (err) {
            console.log("search failed")
            console.log(err)
        }

    }

}