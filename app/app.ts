import {API} from "./api";
import express from "express";

const app = express();
const port = 8000

const DOWNLOAD_API = `https://api.npmjs.org/downloads`
const ALL_API =   `https://replicate.npmjs.com/_all_docs`
const API_BASE = `https://registry.npmjs.org`

let api = new API(API_BASE, DOWNLOAD_API)

app.get('/getDownloads', (req, res) =>  console.log("got here"))

app.listen(port, () => console.log(`backend listening at http://localhost:${port}`))


// api.getDownloads("2020-04-01:2020-04-20", ["express", "jquery"])
// api.getRegistryMeta()
// api.getPackage("express", "4.17.0")
// api.search("express")