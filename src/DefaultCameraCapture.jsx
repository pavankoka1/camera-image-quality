import React, { useRef } from "react";

const ImageCapture = () => {
  const fileInputRef = useRef(null);

  const handleCapture = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      // You can display or upload the captured image here
      console.log("Captured file:", file);
      console.log("Image URL:", imageUrl);

      // For displaying the captured image
      const imgElement = document.getElementById("capturedImage");
      imgElement.src = imageUrl;
      imgElement.style.display = "block"; // Show the image
    }
  };

  const openCamera = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger the input click to open the camera
    }
  };

  return (
    <div>
      <button onClick={openCamera}>Open Camera</button>
      <input
        type="file"
        accept="image/*"
        capture="environment" // or 'user' for the front camera
        onChange={handleCapture}
        ref={fileInputRef}
        style={{ display: "none" }} // Hide the file input
      />
      <img
        id="capturedImage"
        alt="Captured"
        style={{ display: "none", marginTop: "10px", maxWidth: "100%" }}
      />
    </div>
  );
};

export default ImageCapture;
