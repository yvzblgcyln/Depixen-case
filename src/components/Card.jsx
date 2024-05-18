import React from "react";
import Box from "@mui/material/Box";

function Card({ data, handleDelete }) {
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
        }}
      >
        <div>
          <h1 className="text-orange-400 font-bold">{data.title}</h1>
        </div>
        <div className="h-40 ">
          <p className="six-lines">{data.description}</p>
        </div>

        <div className="bg-red-400 h-40 f-center w-full ">
          <img src={data.src} alt="" className="w-full h-full object-cover" />
        </div>

        <button onClick={() => handleDelete(data.id)} className={` text-xs self-end  bg-red-500 `}>
          delete
        </button>
      </Box>
    </Box>
  );
}

export default Card;
