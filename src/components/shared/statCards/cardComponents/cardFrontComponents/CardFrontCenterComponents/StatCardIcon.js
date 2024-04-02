// React
import React, { Fragment } from "react";
// Material UI
import { Typography } from "@mui/material";
// components & functions
import { setUnitStat } from "../../../../../ListGenerator/RightSideMenus/Menus/ItemShop/ItemLogic/StatChangesLogic";
import CustomIcon from "../../../CustomIcon";

const StatCardIcon = (props) => {
  const HEIGHT_WIDTH = "25px";
  const HEIGHT_WIDTH_BOX = "35px";

  return (
    <Fragment>
      <CustomIcon
        icon={props.icon} //
        altText={props.altText}
        height={HEIGHT_WIDTH}
        width={HEIGHT_WIDTH}
        boxHeight={HEIGHT_WIDTH_BOX}
        boxWidth={HEIGHT_WIDTH_BOX}
      />
      <Typography variant="h6">{setUnitStat(props.unit, props.stat)}</Typography>
    </Fragment>
  );
};

export default StatCardIcon;
