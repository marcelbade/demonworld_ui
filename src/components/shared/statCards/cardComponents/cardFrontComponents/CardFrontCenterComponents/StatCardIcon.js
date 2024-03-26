// React
import React, { Fragment } from "react";
// Material UI
import { Typography } from "@mui/material";
// components & functions
import { setStat } from "../../../../../ListGenerator/RightSideMenus/Menus/ItemShop/ItemLogic/StatChangesLogic";
import CustomIcon from "../../../CustomIcon";

const StatCardIcon = (props) => {
  const HEIGHT_WIDTH = "25";

  return (
    <Fragment>
      <div
        sx={{
          display: "flex", //
          alignItems: "center",
          marginLeft: "1em",
          marginBottom: "0.4em",
        }}
      >
        <CustomIcon
          icon={props.rangeArmorIcon} //
          altText={props.altText}
          height={HEIGHT_WIDTH}
          width={HEIGHT_WIDTH}
        />
      </div>
      <Typography variant="h6">{setStat(props.unit, props.stat)}</Typography>
    </Fragment>
  );
};

export default StatCardIcon;
