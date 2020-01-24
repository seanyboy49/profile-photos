"use strict"

const Hapi = require("@hapi/hapi")

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
    handler: (request, h) => {
      console.log(request.payload)
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
