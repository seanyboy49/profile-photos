"use strict"

const Hapi = require("@hapi/hapi")

async function initServer() {
  const server = new Hapi.Server({
    port: 3001,
    host: "localhost"
  })

  server.route({
    method: "GET",
    path: "/",
    handler: (request, h) => {
      return "Hello Wold!"
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
