import React from "react"
import Spinner from "../Spinner"
import Preview from "../Preview"
import ImageUpload from "../ImageUpload"
// import { API_URL } from './config'
import "./index.css"

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

  sumbit = () => {
    // const formData = new FormData()
    // files.forEach((file, i) => {
    //   formData.append(i, file)
    // })
    // const baseUrl = "http://localhost:3001"
    // fetch(baseUrl).then(res => console.log(res))
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
        <div className="buttons">{content()}</div>
      </div>
    )
  }
}

export default App
