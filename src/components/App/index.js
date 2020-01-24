import React from "react"
import Spinner from "../Spinner"
import Preview from "../Preview"
import ImageUpload from "../ImageUpload"
// import { API_URL } from './config'
import request from "../../utils/request"
import "./index.css"

const baseUrl = "http://localhost:3001"

class App extends React.Component {
  state = {
    uploading: false,
    images: []
  }

  onChange = e => {
    const files = Array.from(e.target.files)

    const formattedFiles = files.map((f, i) => {
      const url = URL.createObjectURL(f)

      return Object.assign(f, { id: i, url })
    })

    this.setState({ images: formattedFiles })
  }

  removeImage = id => {
    this.setState({
      images: this.state.images.filter(image => image.id !== id)
    })
  }

  submit = async () => {
    const { images } = this.state

    const formData = new FormData()

    images.forEach((file, i) => {
      formData.append(i, file)
    })

    console.log(...formData)

    const response = await request.post(`${baseUrl}/upload-photos`, formData)
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

  render() {
    const { uploading, images } = this.state

    const content = () => {
      switch (true) {
        case uploading:
          return <Spinner />
        case images.length > 0:
          return <Preview images={images} removeImage={this.removeImage} />
        default:
          return <ImageUpload onChange={this.onChange} />
      }
    }

    return (
      <div>
        <button type="button" onClick={this.submit}></button>
        <div className="buttons">{content()}</div>
      </div>
    )
  }
}

export default App
