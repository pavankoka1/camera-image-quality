import React, { useRef, useState, useEffect } from "react";

const CameraCapture = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [imageQuality, setImageQuality] = useState(null);

  useEffect(() => {
    const getVideo = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      videoRef.current.srcObject = stream;
    };

    getVideo();

    return () => {
      if (videoRef.current.srcObject) {
        const stream = videoRef.current.srcObject;
        stream.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  const captureImage = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const dataUrl = canvas.toDataURL("image/jpeg", 1.0); // Adjust quality from 0 to 1
    setImageSrc(dataUrl);

    // To estimate quality
    const quality = Math.round((dataUrl.length * 3) / 4 / 1024); // Convert bytes to KB
    setImageQuality(quality + " KB");
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
        This image is captured using canvas by setting video quality to max
      </p>
      <video ref={videoRef} autoPlay style={{ width: "100%" }} />
      <button onClick={captureImage}>Capture Photo</button>
      <canvas
        ref={canvasRef}
        style={{ display: "none" }}
        width="640"
        height="480"
      ></canvas>
      {imageSrc && (
        <>
          <img src={imageSrc} alt="Captured" style={{ marginTop: "10px" }} />
          <div>Image Quality: {imageQuality}</div>
        </>
      )}
    </div>
  );
};

export default CameraCapture;
