import React, { useEffect, useRef, useState } from "react";

import "./ImageUpload.css";
import Button from "./Button";

const ImageUpload = (props) => {
  const [files, setFiles] = useState();
  const [previewUrl, setPreviewUrl] = useState();
  const [isValid, setIsValid] = useState(false);
  const fileUploadRef = useRef();

  const pickImageHandler = () => {
    fileUploadRef.current.click();
  };

  useEffect(() => {
    if (!files) {
      return;
    }
    const fileReader = new FileReader();
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result);
    };
    fileReader.readAsDataURL(files);
  }, [files]);

  const fileOnChangeHandler = (event) => {
    let formPicker;
    let fileIsValid = isValid;

    if (event.target.files && event.target.files.length === 1) {
      formPicker = event.target.files[0];
      setFiles(formPicker);
      setIsValid(true);
      fileIsValid = true;
    } else {
      setIsValid(false);
      fileIsValid = false;
    }
    return props.onInput(props.id, formPicker, fileIsValid);
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
          {previewUrl && <img src={previewUrl} alt="Preview" />}
          {!previewUrl && <p>Please pick an image</p>}
        </div>
        <Button type="button" onClick={pickImageHandler}>
          PICK IMAGE
        </Button>
      </div>
      {!isValid && <p>{props.errorText}</p>}
    </div>
  );
};

export default ImageUpload;
