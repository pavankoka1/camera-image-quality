import logo from "./logo.svg";
import "./App.css";
import CameraCapture from "./CameraCapture";
import DefaultCameraCapture from "./DefaultCameraCapture";

function App() {
  return (
    <div>
      <CameraCapture />
      <DefaultCameraCapture />
    </div>
  );
}

export default App;
