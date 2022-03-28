import React, { useState } from "react";
import { Button, Form } from "react-bootstrap";
// import { useMutation, useQuery, useQueryClient } from "react-query";

function FileUpload() {
  const [file, setFile] = useState(null);
  const KILO_BYTES_PER_BYTE = 1000;
  const DEFAULT_MAX_FILE_SIZE_IN_BYTES = 500000;
  const convertBytesToKB = (bytes) => Math.round(bytes / KILO_BYTES_PER_BYTE);

  const handleFileUpload = (e) => {
    const { files } = e.target;
    const uploadedFile = files[0];
    console.log("uploadedFile", uploadedFile);
    if (uploadedFile?.size <= DEFAULT_MAX_FILE_SIZE_IN_BYTES) {
      setFile(uploadedFile);
    }
  };

  return (
    <>
      <Form.Group controlId="formFile" className="my-3 d-flex flex-row">
        <Form.Control
          aria-describedby="File upload"
          aria-label="Upload a file"
          size="sm"
          type="file"
          onChange={handleFileUpload}
        />
        <Button
          variant="primary"
          size="sm"
          id="submit-button"
          type="button"
          //   onClick={}
        >
          Upload
        </Button>
      </Form.Group>
      {file && <span>File size: {convertBytesToKB(file.size)} kb</span>}
    </>
  );
}

export default FileUpload;
