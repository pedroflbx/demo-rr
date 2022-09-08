import { Box, Button, IconButton, Stack } from '@mui/material'
import React, { useState } from 'react'
import { Camera, FACING_MODES } from 'react-html5-camera-photo'
import 'react-html5-camera-photo/build/css/index.css'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'

export default function PhotoTaker() {
  const [dataURI, setDataURI] = useState('')
  return (
    <Box
      className='App'
      sx={{
        '.react-html5-camera-photo>img, .react-html5-camera-photo>video': {
          width: '375px',
        },
      }}
    >
      {dataURI !== '' ? (
        <Box position='relative'>
          <img src={dataURI} alt='' />
          <Stack
            direction='row'
            position='absolute'
            sx={{ bottom: 32 }}
            spacing={2}
            justifyContent='space-between'
            width='100%'
          >
            <IconButton onClick={() => setDataURI('')}>
              <ArrowBackIcon sx={{ color: 'white' }} />
            </IconButton>
            <Button variant='contained'>Submit</Button>
            <div style={{ width: 40 }} />
          </Stack>
        </Box>
      ) : (
        <Camera
          idealFacingMode={FACING_MODES.ENVIRONMENT}
          isImageMirror={false}
          // isFullScreen={true}
          // isMaxResolution={true}
          idealResolution={{
            width: 375,
            height: 700,
          }}
          sizeFactor={1}
          onTakePhoto={(dataURI: React.SetStateAction<string>) => {
            setDataURI(dataURI)
            console.log(dataURI)
          }}
        />
      )}
    </Box>
  )
}
