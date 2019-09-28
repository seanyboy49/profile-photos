import React from 'react'
import Spinner from '../Spinner'
import ImageUpload from '../ImageUpload'
import Buttons from '../Buttons'
// import { API_URL } from './config'
import './index.css'

class App extends React.Component {
  state = {
    uploading: false,
    images: [],
  }

  onChange = e => {
    console.log(e.target.files)
    const files = Array.from(e.target.files)
    this.setState({ uploading: true })

    const formData = new FormData()

    files.forEach((file, i) => {
      formData.append(i, file)
    })
    console.log(files)

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

  removeImage = id => {
    this.setState({
      images: this.state.images.filter(image => image.public_id !== id),
    })
  }

  render() {
    const { uploading, images } = this.state

    const content = () => {
      switch (true) {
        case uploading:
          return <Spinner />
        case images.length > 0:
          return <ImageUpload images={images} removeImage={this.removeImage} />
        default:
          return <Buttons onChange={this.onChange} />
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
