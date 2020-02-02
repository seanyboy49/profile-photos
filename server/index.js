const { loadCollection, uploader } = require("./utils")

const Hapi = require("@hapi/hapi")
const Boom = require("boom")
const path = require("path")
const fs = require("fs")
const Loki = require("lokijs")

// setup
const DB_NAME = "db.json"
const COLLECTION_NAME = "images"
const UPLOAD_PATH = "uploads"
const fileOptions = { dest: `${UPLOAD_PATH}/` }
const db = new Loki(`${UPLOAD_PATH}/${DB_NAME}`, { persistenceMethod: "fs" })

// create folder for upload if not exist
if (!fs.existsSync(UPLOAD_PATH)) fs.mkdirSync(UPLOAD_PATH)

async function initServer() {
  const server = new Hapi.Server({
    port: 3001,
    host: "localhost",
    routes: {
      cors: true
    }
  })

  server.route({
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return { message: "Hello World!" }
    }
  })

  server.route({
    method: "POST",
    path: "/upload-photos",
    config: {
      payload: {
        allow: "multipart/form-data",
        output: "stream"
      }
    },
    handler: async (request, h) => {
      console.log()
      const data = request.payload
      const file = data["profile-photo"]

      // save the file
      const fileDetails = await uploader(file, fileOptions)
      console.log("fileDetails", fileDetails)
      return { message: "photo received" }
    }
  })

  await server.start()
  console.log("Server running on %s", server.info.uri)

  process.on("unhandledRejection", err => {
    console.log(err)
    process.exit(1)
  })
}

initServer()
