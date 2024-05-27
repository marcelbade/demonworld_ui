// React
import React from "react";
// material ui
import { IconButton } from "@mui/material";
// icons
import { ChevronLeft, ChevronRight } from "@mui/icons-material";


const StatCardCarousellButton = (props) => {
  const ICON_STYLE = { width: "2em", height: "2em" };

  return (
    <IconButton
      onClick={() => {
        props.action();
      }}
      size="large"
    >
      {props.side === "left" ? ( //
        <ChevronLeft sx={ICON_STYLE} />
      ) : (
        <ChevronRight sx={ICON_STYLE} />
      )}
    </IconButton>
  );
};

export default StatCardCarousellButton;
