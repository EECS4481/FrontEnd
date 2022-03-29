import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { sendFile } from "../pages/client/api";

function FileUpload({ providerId, clientId }) {
  const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 500000;

  //file upload
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState(null);
  const [uploadError, setUploadError] = useState(false);
  const onFile = (e) => {
    setFile(e.target.files[0]);
  };
  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (file?.size <= DEFAULT_MAX_FILE_SIZE_IN_BYTES) {
      const formData = new FormData();
      formData.append("file", file);
      console.log(file);
      formData.append("receiver", providerId);
      formData.append("sender", clientId);
      const fileName = await sendFile(formData);
      setFileName(fileName);
      console.log("filename", fileName);
    } else {
      setUploadError(true);
    }
  };

  return (
    <Form onSubmit={handleFileUpload}>
      <Form.Group controlId="formFile" className="my-3 d-flex flex-row">
        <Form.Control
          aria-describedby="File upload"
          aria-label="Upload a file"
          size="sm"
          type="file"
          onChange={onFile}
        />
        <Button variant="primary" size="sm" id="submit-button" type="submit">
          Upload
        </Button>
      </Form.Group>

      {uploadError && <span>File size is too big</span>}
      {/* {file && !uploadError && (
        <span>Send the uploaded file name to the Provider: {fileName}</span>
      )} */}
    </Form>
  );
}

export default FileUpload;
