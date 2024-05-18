import { Box } from "@mui/material";
import React from "react";

function EmptyCard() {
  return (
    <Box className="appeal-animation">
      <Box
        display="flex"
        className="w-fit"
        px={1}
        sx={{ border: "1px solid black", marginBottom: -2, paddingBottom: 2, borderRadius: 2 }}
      >
        New Title
      </Box>
      <Box
        height={380}
        width={200}
        p={1}
        sx={{
          borderRadius: 2,
          border: "1px solid black",
          zIndex: "100",
          background: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "end",
        }}
      >
        <div className="bg-[#dcdcdc] h-40 f-center w-full cursor-pointer hover:opacity-85 "></div>
      </Box>
    </Box>
  );
}

export default EmptyCard;
