import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImages } from "@fortawesome/free-solid-svg-icons";

const ImageUpload = props => (
  <div className="buttons fadein">
    <div className="button">
      <label htmlFor="multi">
        <FontAwesomeIcon icon={faImages} color="#6d84b4" size="10x" />
      </label>
      <input type="file" id="multi" onChange={props.onChange} multiple />
    </div>
  </div>
);

export default ImageUpload;
