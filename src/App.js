import CameraCapture from "./components/CameraCapture";
import DefaultCameraCapture from "./components/DefaultCameraCapture";
import ReactWebCam from "./components/ReactWebCam";

function App() {
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
      <CameraCapture />
      <p style={{ height: "2px", width: "100vw", backgroundColor: "black" }} />
      <DefaultCameraCapture />
      <p style={{ height: "2px", width: "100vw", backgroundColor: "black" }} />
      <ReactWebCam />
    </div>
  );
}

export default App;
