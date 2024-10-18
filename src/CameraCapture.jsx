import React, { useRef, useState, useEffect } from "react";

const CameraCapture = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [image, setImage] = useState(null);

  useEffect(() => {
    const getVideo = async () => {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: "user",
          width: { ideal: 1920 },
          height: { ideal: 1080 },
          frameRate: { ideal: 30 }, // Set frame rate if necessary
        },
      });
      videoRef.current.srcObject = stream;
    };

    getVideo();

    return () => {
      const stream = videoRef.current.srcObject;
      if (stream) {
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
      }
    };
  }, []);

  const capturePhoto = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const video = videoRef.current;

    // Set canvas dimensions to match video
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Draw the video frame to the canvas
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Get the image as a data URL
    const imageDataUrl = canvas.toDataURL("image/jpeg", 1.0); // Highest quality
    setImage(imageDataUrl);
  };

  return (
    <div>
      <h1>Camera Capture</h1>
      <div style={{ display: "flex", gap: "32px" }}>
        <video
          ref={videoRef}
          autoPlay
          muted
          style={{ width: "300px", height: "300px" }}
        />
      </div>
      <button onClick={capturePhoto}>Capture Photo</button>

      <canvas ref={canvasRef} style={{ display: "none" }} />
      {image && (
        <div>
          <h2>Captured Image:</h2>
          <img src={image} alt="Captured" style={{ maxHeight: "300px" }} />
        </div>
      )}
    </div>
  );
};

export default CameraCapture;
