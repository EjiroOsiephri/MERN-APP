import React, { useRef } from "react";

import "./ImageUpload.css";
import Button from "./Button";

const ImageUpload = (props) => {
  const fileUploadRef = useRef();

  const pickImageHandler = () => {
    fileUploadRef.current.click();
  };

  const fileOnChangeHandler = (event) => {
    console.log(event.target);
  };

  return (
    <div className="form-control">
      <input
        type="file"
        id={props.id}
        style={{ display: "none" }}
        accept=".jpg,.png,.jpeg"
        ref={fileUploadRef}
        onChange={fileOnChangeHandler}
      />
      <div className={`image-upload ${props.center && "center"}`}>
        <div className="image-upload__preview">
          <img src="" alt="Preview" />
        </div>
        <Button type="button" onClick={pickImageHandler}>
          PICK IMAGE
        </Button>
      </div>
    </div>
  );
};

export default ImageUpload;
