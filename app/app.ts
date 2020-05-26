import {API} from "./api";
import express from "express";
import cors from "cors"

const app = express();
const port = 8000
// TODO: disable this for production
app.use(cors())

const DOWNLOAD_API = `https://api.npmjs.org/downloads`
const ALL_API =   `https://replicate.npmjs.com/_all_docs`
const API_BASE = `https://registry.npmjs.org`

let api = new API(API_BASE, DOWNLOAD_API)

app.get('/getDownloads', (req, res) => {
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

app.get('/')

app.listen(port, () => console.log(`backend listening at http://localhost:${port}`))


// api.getDownloads("2020-04-01:2020-04-20", ["express", "jquery"])
// api.getRegistryMeta()
// api.getPackage("express", "4.17.0")
// api.search("express")