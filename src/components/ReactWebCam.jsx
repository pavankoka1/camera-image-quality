import React, { useRef, useState } from "react";
import Webcam from "react-webcam";

const ReactWebCam = () => {
  const webcamRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [imageQuality, setImageQuality] = useState(null);

  const capture = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    if (imageSrc) {
      setImageSrc(imageSrc);

      // Calculate image size for quality estimation
      const byteString = atob(imageSrc.split(",")[1]); // Base64 to binary
      const sizeInBytes = byteString.length * (3 / 4); // Estimate size; assumes JPEG quality of ~3/4.
      const quality = Math.round(sizeInBytes / 1024); // Convert to KB
      setImageQuality(quality + " KB");
    }
  };

  return (
    <div
      style={{
        width: "100vw",
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        gap: "32px",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <p style={{ textAlign: "center" }}>
        This image is captured using react-web-cam library
      </p>
      <Webcam
        audio={false}
        ref={webcamRef}
        screenshotFormat="image/jpeg" // Capture as JPEG format
        width={640} // Optional: set the width for the camera
        height={480} // Optional: set the height for the camera
      />
      <div>
        <button onClick={capture}>Capture Photo</button>
      </div>
      {imageSrc && (
        <>
          <img
            src={imageSrc}
            alt="Captured"
            style={{ marginTop: "10px", maxWidth: "100%" }}
          />
          <div>Image Quality: {imageQuality}</div>
        </>
      )}
    </div>
  );
};

export default ReactWebCam;
