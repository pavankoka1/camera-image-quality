import React, { useRef, useState, useEffect } from "react";

const CameraCapture = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [imageQuality, setImageQuality] = useState(null);

  useEffect(() => {
    const getVideo = async () => {
      // Request the highest resolution available
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user", // front camera
          width: { ideal: 1920 }, // maximum width
          height: { ideal: 1080 }, // maximum height
        },
      });

      videoRef.current.srcObject = stream;

      // Set canvas size based on the stream's video track settings
      const videoTrack = stream.getVideoTracks()[0];
      const { width, height } = videoTrack.getSettings();
      canvasRef.current.width = width;
      canvasRef.current.height = height;
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

    // Capture the video frame onto the canvas
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    // Get the data URL from the canvas at the highest quality setting
    const dataUrl = canvas.toDataURL("image/jpeg", 1.0);
    setImageSrc(dataUrl);

    // Estimate quality in KB
    const quality = Math.round((dataUrl.length * 3) / 4 / 1024);
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
      <canvas ref={canvasRef} style={{ display: "none" }}></canvas>
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
