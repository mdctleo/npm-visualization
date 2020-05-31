import {API} from "./api";
import express from "express";
import cors from "cors"
import {DependencyNode} from "./Node";

const app = express();
const port = 8000
// TODO: disable this for production
app.use(cors())

const DOWNLOAD_API = `https://api.npmjs.org/downloads`
const ALL_API =   `https://replicate.npmjs.com/_all_docs`
const API_BASE = `https://registry.npmjs.org`

let api = new API(API_BASE, DOWNLOAD_API)

api.search("react")
    .then((result) => console.log(result.body))
    .catch((err) => console.log(err))

app.get('/getDownloads', (req: any, res: any) => {
    let period: string = `${req.query.start}:${req.query.end}`
    let packageNames: string = String(req.query.packageName)
    api.getDownloads(period, packageNames)
        .then((result) => {
            console.log(result)
            res.status(200).send(result)
        })
        .catch((err) => {
            console.log("api error")
            console.log(err)
            res.status(500).send(err)

        })
})

app.get('/getDependencies', (req: any, res: any) => {
    let packageName: string = String(req.query.packageName)
    let version: string = String(req.query.version)

    let result: Set<string> = new Set()
    let rootNode = new DependencyNode(packageName, version)
    api.getDependencies(packageName, version, rootNode,  result)
        .then(() => {
            res.status(200).send(rootNode)
        })
        .catch((err) => {
            console.log("/getDependencies error")
            console.log(err)
            res.status(500).send(err)
        })

})

app.get('/')

app.listen(port, () => console.log(`backend listening at http://localhost:${port}`))


// api.getDownloads("2020-04-01:2020-04-20", ["express", "jquery"])
// api.getRegistryMeta()
// api.getPackage("express", "4.17.0")
// api.search("express")