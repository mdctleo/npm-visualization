import {API} from "./api";
import express from "express";
import cors from "cors"
import {DependencyNode} from "./Node";

const app = express();
const port = 8000
// TODO: disable this for production
app.use(cors())

const DOWNLOAD_API = `https://api.npmjs.org/downloads`
const API_BASE = `https://registry.npmjs.org`

let api = new API(API_BASE, DOWNLOAD_API)


app.get('/getDownloads', (req: any, res: any) => {
    let period: string = `${req.query.start}:${req.query.end}`
    let packageNames: string = String(req.query.packageName)
    api.getDownloads(period, packageNames)
        .then((result) => {
            res.status(200).send(result)
        })
        .catch((err) => {
            res.status(500).send(err)

        })
})

app.get('/getDependencies', (req: any, res: any) => {
    let packageName: string = String(req.query.packageName)
    let version: string = String(req.query.version)

    let result: Set<string> = new Set()

    api.getDependencies(packageName, version, result)
        .then((rootNode: DependencyNode) => {
            rootNode.setTreeSize(result.size)
            res.status(200).send(rootNode)
        })
        .catch((err) => {
            res.status(500).send(err)
        })

})

app.get('/')

app.listen(port, () => console.log(`backend listening at http://localhost:${port}`))