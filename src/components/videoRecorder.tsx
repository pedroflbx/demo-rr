import { useEffect, useRef } from "react";
import { ReactMediaRecorder } from "react-media-recorder";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

const VideoPreview = ({ stream }: any) => {
  const videoRef = useRef<any>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);
  if (!stream) {
    return null;
  }
  return <video ref={videoRef} width={480} height={640} autoPlay />;
};

const FromMediaRecorder = () => {
  return (
    <ReactMediaRecorder
      video={{
        width: { exact: 480, ideal: 480 },
        height: { exact: 640, ideal: 640 },
        aspectRatio: 0.75,
      }}
      render={({
        previewStream,
        status,
        startRecording,
        stopRecording,
        mediaBlobUrl,
      }) => {
        return (
          <div
            style={{
              border: "1px solid black",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexDirection: "column",
            }}
          >
            <p>{status}</p>
            <button onClick={startRecording}>Start Recording</button>
            <button onClick={stopRecording}>Stop Recording</button>
            {status !== "stopped" ? (
              <VideoPreview stream={previewStream} />
            ) : (
              <video
                src={mediaBlobUrl}
                autoPlay
                loop
                width={480}
                height={640}
                style={{ border: "2px solid red" }}
                controls
              />
            )}
          </div>
        );
      }}
    />
  );
};

const VideoRecordPage = (props: { history: any[] }) => {
  return (
    <div className="App">
      <h1>Video record</h1>

      <div style={{ width: "100%", maxWidth: 480, height: 640 }}>
        <FromMediaRecorder />
      </div>
    </div>
  );
};

const VideoPreviewPage = (props: {
  location: { state: { videoBlob: Blob | MediaSource } };
}) => {
  return (
    <div className="App">
      <h1>Video preview</h1>

      {props.location.state && props.location.state.videoBlob && (
        <div style={{ width: "100%", maxWidth: 480, height: 640 }}>
          <video
            src={window.URL.createObjectURL(props.location.state.videoBlob)}
            width={480}
            height={640}
            autoPlay
            loop
            controls
          />
        </div>
      )}
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Switch>
        <Redirect to="/videoRecord" exact path="/" />
        <Route path="/videoRecord" component={VideoRecordPage} />
        <Route path="/videoPreview" component={VideoPreviewPage} />
      </Switch>
    </Router>
  );
}
