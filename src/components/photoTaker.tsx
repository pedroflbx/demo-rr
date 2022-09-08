import { Box } from "@mui/material";
import React, { useState } from "react";
import { Camera, FACING_MODES } from "react-html5-camera-photo";
import "react-html5-camera-photo/build/css/index.css";
export default function PhotoTaker() {
  const [dataURI, setdataURI] = useState("");
  return (
    <Box
      className="App"
      sx={{
        ".react-html5-camera-photo>img, .react-html5-camera-photo>video": {
          width: "375px",
        },
      }}
    >
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
          setdataURI(dataURI);
          console.log(dataURI);
        }}
      />
      <a href={dataURI} download>
        <img src={dataURI} alt="" />
      </a>
    </Box>
  );
}
