import React from "react"
import PropTypes from "prop-types"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons"

const Preview = ({ images, removeImage }) => {
  return images.map((image, i) => (
    <div key={i} className="fadein">
      <div onClick={() => removeImage(image.id)} className="delete">
        <FontAwesomeIcon icon={faTimesCircle} size="2x" />
        <img src={image.url} />
      </div>
    </div>
  ))
}

Preview.propTypes = {
  images: PropTypes.array.isRequired,
  removeImage: PropTypes.func.isRequired
}

export default Preview
