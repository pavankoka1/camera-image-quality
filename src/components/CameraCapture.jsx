import React, { useRef, useState, useEffect } from "react";

const CameraCapture = () => {
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const [imageSrc, setImageSrc] = useState(null);
  const [imageQuality, setImageQuality] = useState(null);

  useEffect(() => {
    const getVideo = async () => {
      const constraints = {
        video: {
          facingMode: { ideal: "user" },
          width: { ideal: 1280 },
          height: { ideal: 720 },
        },
      };

      try {
        const stream = await navigator.mediaDevices.getUserMedia(constraints);
        videoRef.current.srcObject = stream;

        videoRef.current.addEventListener("loadedmetadata", () => {
          const { videoWidth, videoHeight } = videoRef.current;
          canvasRef.current.width = videoWidth;
          canvasRef.current.height = videoHeight;

          // Attempt to play the video automatically
          videoRef.current.play().catch((error) => {
            console.error("Error attempting to play video: ", error);
          });
        });
      } catch (error) {
        console.error("Error accessing the camera: ", error);
      }
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

    // Draw the video frame onto the canvas
    context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);

    // Capture the canvas image as a PNG
    const dataUrl = canvas.toDataURL("image/png");
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
      <video
        ref={videoRef}
        autoPlay
        muted
        playsInline
        style={{ width: "100%" }}
      />
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
