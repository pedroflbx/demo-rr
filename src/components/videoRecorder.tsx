import {
  Box,
  Button,
  ButtonGroup,
  IconButton,
  Rating,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { ReactMediaRecorder } from "react-media-recorder";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useHistory,
} from "react-router-dom";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import StopIcon from "@mui/icons-material/Stop";
import PhotoTaker from "./photoTaker";
import ImageIcon from "@mui/icons-material/Image";
import ThankYouPage from "./ThankYouPage";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import Dialog from "@mui/material/Dialog";

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
  return <video ref={videoRef} width={365} height={700} autoPlay />;
};

const FromMediaRecorder = () => {
  const history = useHistory();
  return (
    <ReactMediaRecorder
      video={{
        width: { exact: 365, ideal: 365 },
        height: { exact: 700, ideal: 700 },
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
              position: "relative",
              height: "100%",
              width: "100%",
            }}
          >
            <Box
              sx={{
                position: "absolute",
                bottom: "64px",
                textAlign: "center",
                zIndex: 200,
              }}
            >
              {status === "idle" || status === "stopped" ? (
                <IconButton onClick={startRecording}>
                  <FiberManualRecordIcon
                    sx={{ color: "red" }}
                    fontSize="large"
                  />
                </IconButton>
              ) : (
                <IconButton onClick={stopRecording}>
                  <StopIcon sx={{ color: "red" }} fontSize="large" />
                </IconButton>
              )}
            </Box>

            {status !== "stopped" ? (
              <VideoPreview stream={previewStream} />
            ) : (
              <video
                src={mediaBlobUrl}
                autoPlay
                // loop
                width={365}
                height={700}
                controls
              />
            )}
            {status === "stopped" && (
              <Button
                variant="contained"
                color="secondary"
                sx={{
                  zIndex: 100000,
                  position: "absolute",
                  bottom: 32,
                }}
                onClick={() => history.push("/submitted")}
              >
                Submit
              </Button>
            )}
          </div>
        );
      }}
    />
  );
};

type Mode = "video" | "image";

const VideoRecordPage = (props: { history: any[] }) => {
  const [mode, setMode] = useState<Mode>("video");
  const [value, setValue] = useState(2);
  const [displayRating, setDisplayRating] = useState(false);
  const [displaySticker, setDisplaySticker] = useState(false);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [text, setText] = useState("");

  return (
    <div className="App">
      <div
        style={{
          width: "100%",
          height: 700,
          position: "relative",
        }}
      >
        <Stack
          sx={{
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            top: "16px",
            width: "100%",
          }}
        >
          <ButtonGroup
            variant="contained"
            aria-label="outlined primary button group"
            size="small"
            color="secondary"
            sx={{
              zIndex: 300,
            }}
          >
            <Button
              onClick={() => setMode("image")}
              sx={{
                backgroundColor:
                  mode === "image" ? "secondary.main" : "secondary.light",
              }}
            >
              Photo
            </Button>
            <Button
              onClick={() => setMode("video")}
              sx={{
                backgroundColor:
                  mode === "video" ? "secondary.main" : "secondary.light",
              }}
            >
              Video
            </Button>
          </ButtonGroup>
          <Stack direction="row" gap={2} m={2} sx={{ zIndex: 300 }}>
            <IconButton
              disabled
              sx={{ color: "black", display: "flex", flexDirection: "column" }}
            >
              <ImageIcon /> <Typography variant="caption">Filters</Typography>
            </IconButton>
            <IconButton
              onClick={() => setDisplaySticker(!displaySticker)}
              sx={{ color: "black", display: "flex", flexDirection: "column" }}
            >
              <ImageIcon /> <Typography variant="caption">Stickers</Typography>
            </IconButton>
            <IconButton
              onClick={() => (text === "" ? setDialogOpen(true) : setText(""))}
              sx={{ color: "black", display: "flex", flexDirection: "column" }}
            >
              <ImageIcon /> <Typography variant="caption">Text</Typography>
            </IconButton>
            <IconButton
              onClick={() => setDisplayRating(!displayRating)}
              sx={{ color: "black", display: "flex", flexDirection: "column" }}
            >
              <ImageIcon /> <Typography variant="caption">Rating</Typography>
            </IconButton>
          </Stack>
          {displayRating && (
            <Rating
              name="simple-controlled"
              sx={{ zIndex: 1000 }}
              value={value}
              onChange={(event, newValue) => {
                setValue(newValue as number);
              }}
            />
          )}
          {text !== "" && (
            <Typography
              sx={{ zIndex: 231241, transform: "rotate(-5deg)", marginTop: 2 }}
              variant="h2"
              color="white"
            >
              {text}
            </Typography>
          )}
          {displaySticker && (
            <ThumbUpIcon
              sx={{
                color: "gold",
                fontSize: 96,
                marginTop: "300px",
                marginLeft: "200px",
                zIndex: 23123124,
                transform: "rotate(-15deg)",
              }}
            />
          )}
        </Stack>

        {mode === "video" && <FromMediaRecorder />}
        {mode === "image" && <PhotoTaker />}
      </div>
      <Dialog open={isDialogOpen}>
        <TextField
          sx={{ padding: 2 }}
          onChange={(e) => {
            setText(e.currentTarget.value);
          }}
        />
        <Button sx={{ padding: 2 }} onClick={() => setDialogOpen(false)}>
          Submit
        </Button>
      </Dialog>
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
        <div style={{ width: "100%", maxWidth: 365, height: 700 }}>
          <video
            src={window.URL.createObjectURL(props.location.state.videoBlob)}
            width={365}
            height={700}
            autoPlay
            // loop
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
        <Route path="/submitted" component={ThankYouPage} />
      </Switch>
    </Router>
  );
}
