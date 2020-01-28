import React, { useState } from "react"
import Preview from "../Preview"
import ImageUpload from "../ImageUpload"
// import { API_URL } from './config'
import usePost from "../../hooks/usePost"

import "./index.css"

const App = () => {
  const [images, setImages] = useState([])
  const baseUrl = "http://localhost:3001"
  console.log("app mounts")

  const { postData, isFetching, error, parsedResponse } = usePost({})
  console.log("isFetching", isFetching)
  console.log("error", error)
  console.log("parsedResponse", parsedResponse)
  console.log("postData", postData)

  function onChange(e) {
    const files = Array.from(e.target.files)

    const formattedFiles = files.map((f, i) => {
      const url = URL.createObjectURL(f)

      return Object.assign(f, { id: i, url })
    })

    setImages(formattedFiles)
  }

  function removeImage(id) {
    const filteredImages = images.filter(image => image.id !== id)
    setImages(filteredImages)
  }

  function submit() {
    const formData = new FormData()

    images.forEach((file, i) => {
      formData.append(i, file)
    })

    postData({ url: `${baseUrl}/upload-photos`, body: formData })
    // console.log(response)
    // fetch(`${API_URL}/image-upload`, {
    //   method: 'POST',
    //   body: formData,
    // })
    //   .then(res => res.json())
    //   .then(images => {
    //     this.setState({
    //       uploading: false,
    //       images,
    //     })
    //   })
  }

  const isPreview = images.length > 0

  return (
    <div>
      <div className="buttons">
        {isPreview ? (
          <Preview images={images} removeImage={removeImage} />
        ) : (
          <ImageUpload onChange={onChange} />
        )}
      </div>
      <button type="button" onClick={submit} disabled={!images}>
        Submit Photos
      </button>
    </div>
  )
}

export default App
