import { Box, IconButton } from '@mui/material'
import { useEffect, useRef } from 'react'
import { ReactMediaRecorder } from 'react-media-recorder'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom'
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord'
import StopIcon from '@mui/icons-material/Stop'

const VideoPreview = ({ stream }: any) => {
  const videoRef = useRef<any>(null)

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream
    }
  }, [stream])
  if (!stream) {
    return null
  }
  return <video ref={videoRef} width={365} height={580} autoPlay />
}

const FromMediaRecorder = () => {
  return (
    <ReactMediaRecorder
      video={{
        width: { exact: 365, ideal: 365 },
        height: { exact: 580, ideal: 580 },
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
              border: '1px solid black',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexDirection: 'column',
              position: 'relative',
            }}
          >
            <Box sx={{ position: 'absolute', bottom: '64px', zIndex: 200 }}>
              <p>{status}</p>
              {status === 'idle' || status === 'stopped' ? (
                <IconButton onClick={startRecording}>
                  <FiberManualRecordIcon sx={{ color: 'red' }} />
                </IconButton>
              ) : (
                <IconButton onClick={stopRecording}>
                  <StopIcon sx={{ color: 'red' }} />
                </IconButton>
              )}
            </Box>

            {status !== 'stopped' ? (
              <VideoPreview stream={previewStream} />
            ) : (
              <video
                src={mediaBlobUrl}
                autoPlay
                loop
                width={365}
                height={580}
                style={{ border: '2px solid red' }}
                controls
              />
            )}
          </div>
        )
      }}
    />
  )
}

const VideoRecordPage = (props: { history: any[] }) => {
  return (
    <div className='App'>
      <h1>Video record</h1>

      <div style={{ width: '100%', maxWidth: 365, height: 580 }}>
        <FromMediaRecorder />
      </div>
    </div>
  )
}

const VideoPreviewPage = (props: {
  location: { state: { videoBlob: Blob | MediaSource } }
}) => {
  return (
    <div className='App'>
      <h1>Video preview</h1>

      {props.location.state && props.location.state.videoBlob && (
        <div style={{ width: '100%', maxWidth: 365, height: 580 }}>
          <video
            src={window.URL.createObjectURL(props.location.state.videoBlob)}
            width={365}
            height={580}
            autoPlay
            loop
            controls
          />
        </div>
      )}
    </div>
  )
}

export default function App() {
  return (
    <Router>
      <Switch>
        <Redirect to='/videoRecord' exact path='/' />
        <Route path='/videoRecord' component={VideoRecordPage} />
        <Route path='/videoPreview' component={VideoPreviewPage} />
      </Switch>
    </Router>
  )
}
