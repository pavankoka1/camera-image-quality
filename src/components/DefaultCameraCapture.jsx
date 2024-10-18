import React, { useRef, useState } from "react";

const DefaultCameraCapture = () => {
  const fileInputRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [imageQuality, setImageQuality] = useState(null);

  const handleCapture = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImageSrc(imageUrl);

      // Check file size in KB for quality estimation
      const quality = Math.round(file.size / 1024); // Convert bytes to KB
      setImageQuality(quality + " KB");
    }
  };

  const openCamera = () => {
    fileInputRef.current.click();
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
        This image is captured using mobile camera
      </p>
      <button onClick={openCamera}>Capture Photo</button>
      <input
        type="file"
        accept="image/*"
        capture="user" // Use "user" for front camera
        onChange={handleCapture}
        ref={fileInputRef}
        style={{ display: "none" }} // Hide the file input
      />
      {imageSrc && (
        <>
          <img
            src={imageSrc}
            alt="Captured"
            style={{ marginTop: "10px", maxHeight: "300px", maxWidth: "100%" }}
          />
          <div>Image Quality: {imageQuality}</div>
        </>
      )}
    </div>
  );
};

export default DefaultCameraCapture;
