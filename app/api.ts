import * as request from "superagent"
import {DependencyNode} from "./Node";

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

        let result = await request.get(url)

        let mresult = {
            maxCount: 0,
            start: "",
            end: "",
            data: []
        }

        let maxCount = 0
        let data: Array<any> = []

        if (packageNames.split(",").length > 1) {

            for (let [packageName, pack] of Object.entries(result.body)) {
                mresult.start = result.body[packageName].start
                mresult.end = result.body[packageName].end
                // console.log(pack)
                delete result.body[packageName].start
                delete result.body[packageName].end
                for (let dataPoint of pack.downloads) {
                    maxCount = dataPoint.downloads > maxCount ? dataPoint.downloads : maxCount
                }

                data.push(result.body[packageName])
            }

        } else {
            for (let dataPoint of result.body.downloads) {
                maxCount = dataPoint.downloads > maxCount ? dataPoint.downloads : maxCount
            }
            data = [{package: result.body.package, downloads: result.body.downloads}]
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

    public async getPackage (packageName: string, version: string): Promise<any> {
        try {
            let url = `${this.API_BASE}/${packageName}/${version}`
            let response = await request.get(url)
            return response
        } catch (err) {
            console.log("get package version failed")
            console.log(err)
        }
    }

    public async getDependencies(packageName: string, version: string, result: Set<string>): Promise<any> {
        try {
            let packageResponse = await this.getPackage(packageName, version)

            if (packageResponse.body.dependencies === undefined) {
                return new DependencyNode(packageName, version)
            }

            let dependencies:Array<Array<string>> = Object.entries(packageResponse.body.dependencies)


            let pat = new RegExp(/[0-9]+.[0-9]+.[0-9]+/)

            let parentNode = new DependencyNode(packageName, version)

            for (let i = 0; i < dependencies.length; i++) {
                let dependencyName = dependencies[i][0]
                let dependencyVersion = dependencies[i][1]
                let dependencyVersionFormatted = pat.exec(dependencyVersion);

                if (!result.has(dependencyName)) {
                    let child = await this.getDependencies(dependencyName, dependencyVersionFormatted[0], result)
                    parentNode.addChild(child)
                    result.add(dependencyName)
                }
            }

            return parentNode


        } catch (err) {
            console.log("getDependencies failed")
            console.log(err)
        }
    }

    public async search(text: string, size=1, from=0,
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

            return response

        } catch (err) {
            console.log("search failed")
            console.log(err)
        }

    }

}