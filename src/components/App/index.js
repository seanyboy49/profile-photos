import React, { useState } from "react";
import Preview from "../Preview";
import ImageUpload from "../ImageUpload";
// import { API_URL } from './config'
import request from "../../utils/request";
import "./index.css";

const baseUrl = "http://localhost:3001";

const App = () => {
  const [images, setImages] = useState([]);

  console.log("images", images);

  function onChange(e) {
    const files = Array.from(e.target.files);

    const formattedFiles = files.map((f, i) => {
      const url = URL.createObjectURL(f);

      return Object.assign(f, { id: i, url });
    });

    setImages(formattedFiles);
  }

  function removeImage(id) {
    const filteredImages = images.filter(image => image.id !== id);
    setImages(filteredImages);
  }

  async function submit() {
    const { images } = this.state;

    const formData = new FormData();

    images.forEach((file, i) => {
      formData.append(i, file);
    });

    console.log(...formData);

    const response = await request.post(`${baseUrl}/upload-photos`, formData);
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

  const content = () => {
    switch (true) {
      case images.length > 0:
        return <Preview images={images} removeImage={removeImage} />;
      default:
        return <ImageUpload onChange={onChange} />;
    }
  };

  return (
    <div>
      <button type="button" onClick={submit}>
        Submit
      </button>
      <div className="buttons">{content()}</div>
    </div>
  );
};

export default App;
