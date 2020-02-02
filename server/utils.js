// utils.ts

const del = require("del")
const Loki = require("lokijs")
const fs = require("fs")
const uuid = require("uuid")

const loadCollection = function(colName, db) {
  return new Promise(resolve => {
    db.loadDatabase({}, () => {
      const _collection = db.getCollection(colName) || db.addCollection(colName)
      resolve(_collection)
    })
  })
}

const uploader = function(file, options) {
  if (!file) throw new Error("no file(s)")

  return _fileHandler(file, options)
}

const _fileHandler = function(file, options) {
  if (!file) throw new Error("no file")

  const originalName = file.hapi.filename
  const filename = uuid.v1()
  const path = `${options.dest}${filename}`
  const fileStream = fs.createWriteStream(path)

  return new Promise((resolve, reject) => {
    file.on("error", function(err) {
      reject(err)
    })

    file.pipe(fileStream)

    file.on("end", function(err) {
      const fileDetails = {
        originalName,
        filename,
        mimetype: file.hapi.headers["content-type"],
        destination: `${options.dest}`,
        path,
        size: fs.statSync(path).size
      }

      resolve(fileDetails)
    })
  })
}

module.exports = { loadCollection, uploader }
