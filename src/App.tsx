import { Box } from "@mui/material";
import { Stack } from "@mui/system";

const App = () => {
  return (
    <Stack
      sx={{
        height: "100vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Box
        sx={{
          borderRadius: 4,
          border: "2px solid black",
          height: 700,
          width: 375,
          px: 2.5,
          pt: 6,
          pb: 8,
        }}
      >
        <Box height="100%" border="1px solid grey"></Box>
      </Box>
    </Stack>
  );
};

export default App;
