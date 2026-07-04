// material ui
import { useTheme } from "@emotion/react";
// components & functions
import { renderDynamicIcons } from "../../../util/utilityFunctions";
import { Grid, Typography } from "@mui/material";

/**
 * Creates the card title. The name displayed is, by default, the unit's name.
 * However if the unit has multiple stat cards (isMultiStateUnit flag == true), the multiCardName
 *  is protrayed, i.e., the name of one of the stat cards that belong to the unit.
 *  E.g.: "Riesenyeti"
 * @returns html element
 */
const   CardFrontTitle = (props) => {
  const theme = useTheme();

  return (
    <Grid

      sx={{
        ...theme.palette.statCards.backGround, //
        ...theme.palette.statCards.titlePadding,
        width:"100%"
      }}
      container
      justifyContent="space-around"
      direction="row"
    >
      <Typography
        variant="h4"
        sx={theme.palette.statCards.cardTitle} //
        align="center"
      >
        {renderDynamicIcons("*", props.unit.commandStars)}
      </Typography>
      <Typography
        variant="h4"
        align="center"
        sx={{
          ...theme.palette.statCards.cardTitle,
          height: "1.5em",
        }} //
      >
        {props.unit.isMultiStateUnit ? props.unit.multiCardName : props.unit.unitName}
      </Typography>
      <Typography
        variant="h6"
        sx={theme.palette.cardTitle} //
        align="center"
      >
        {renderDynamicIcons("/", props.unit.magic)}
      </Typography>
    </Grid>
  );
};

export default CardFrontTitle;
