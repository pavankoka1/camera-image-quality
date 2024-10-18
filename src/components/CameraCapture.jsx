import React, { useRef, useState, useEffect } from "react";

const CameraCapture = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [imageQuality, setImageQuality] = useState(null);
  const [maxWidth, setMaxWidth] = useState(null);
  const [maxHeight, setMaxHeight] = useState(null);

  useEffect(() => {
    const getMaxVideoResolution = async () => {
      const videoConstraints = {
        video: true,
      };

      // request the stream with default resolution
      const stream = await navigator.mediaDevices.getUserMedia(
        videoConstraints
      );
      const videoTrack = stream.getVideoTracks()[0];
      const { width, height } = videoTrack.getSettings();

      // Log supported settings for debugging
      console.log("Video settings:", videoTrack.getCapabilities());

      // Set the maximum width and height found in settings
      setMaxWidth(width);
      setMaxHeight(height);

      // Clean up
      return () => {
        stream.getTracks().forEach((track) => track.stop());
      };
    };

    getMaxVideoResolution();
  }, []);

  const startVideoStream = async () => {
    const constraints = {
      video: {
        facingMode: "user",
        width: { ideal: maxWidth },
        height: { ideal: maxHeight },
      },
    };

    const stream = await navigator.mediaDevices.getUserMedia(constraints);
    videoRef.current.srcObject = stream;

    videoRef.current.addEventListener("loadedmetadata", () => {
      const { videoWidth, videoHeight } = videoRef.current;
      canvasRef.current.width = videoWidth;
      canvasRef.current.height = videoHeight;
    });
  };

  const captureImage = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    // Capture the frame from the video
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    // Capture the canvas image as a high-quality PNG
    const dataUrl = canvas.toDataURL("image/png");
    setImageSrc(dataUrl);

    // Estimate quality in KB
    const quality = Math.round((dataUrl.length * 3) / 4 / 1024);
    setImageQuality(quality + " KB");
  };

  useEffect(() => {
    if (maxWidth && maxHeight) {
      startVideoStream();
    }
  }, [maxWidth, maxHeight]);

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
        Capture high-resolution images from your camera.
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
