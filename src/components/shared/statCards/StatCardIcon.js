// React
import { Fragment } from "react";
// Material UI
import { Typography } from "@mui/material";
// components & functions
import { setUnitStat } from "../../../gameLogic/unitStatChangeLogic/unitStatChangesLogic";
import CustomIcon from "../CustomIcon";

/**
 * Functional JSX component that renders a unit stat as an icon
 * for the unit card previews in the app.
 * The icon consists of a custom icon followed
 * by the numerical value of the stat.
 * E.g.: a shield Icon icon followed by the range armor stat.
 * PLEASE NOTE: the component renders the stat dynamically. If the
 * numerical value of stat changes due to item bonuses, the component re-renders.
 * @param {object} props
 * @returns a JSX element.
 */
const StatCardIcon = (props) => {
  const HEIGHT_WIDTH = "25px";
  const HEIGHT_WIDTH_BOX = "35px";

  // set stat for any stat w. an icon dynamically
  const stat = setUnitStat(props.unit, props.stat);

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
      <Typography variant="h6">{stat}</Typography>
    </Fragment>
  );
};

export default StatCardIcon;
