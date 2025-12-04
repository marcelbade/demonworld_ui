// React
import { useContext } from "react";
// Material UI
import { ListItemText, List, Typography, Grid2 as Grid } from "@mui/material";
// components and functions
import useSubFactionStats from "../../../../../../customHooks/UseSubFactionStats";
// contexts
import { ArmyContext } from "../../../../../../contexts/armyContext";
import { SelectionContext } from "../../../../../../contexts/selectionContext";
// constants
import { STATS } from "../../../../../../constants/textsAndMessages";

const ArmyListSubFactionFooter = (props) => {
  const AC = useContext(ArmyContext);
  const SEC = useContext(SelectionContext);

  const stats = useSubFactionStats();

  const percentages = stats.minAndMaxAllowance(AC.selectedFactionName, props.subFactionName);

  const MIN_PERCENTAGE = percentages.min;
  const MAX_PERCENTAGE = percentages.max;

  const displayCurrentTotal = () => {
    const total = stats.currentTotal(props.subFactionUnits);
    return total === 0 ? `` : `${total}`;
  };

  const displayCurrentPercentage = () => {
    const percentage = stats.currentPercentage(props.subFactionUnits, SEC.maxPointsAllowance);
    return percentage === 0 ? `` : `${percentage}%`;
  };

  const displayRemainder = () => {
    const remainder = stats.remaingPointsToMinAndMax(
      AC.selectedFactionName, //
      props.subFactionName,
      props.subFactionUnits,
      SEC.maxPointsAllowance
    );

    const remainingTilMin =
      remainder.tilMin > 0 //
        ? `(Verbleibende Punkte: ${remainder.tilMin})`
        : "";

    const remainingTilMax =
      remainder.tilMax > 0 //
        ? `(Verbleibende Punkte: ${remainder.tilMax})`
        : "";

    return { tilMin: remainingTilMin, tilMax: remainingTilMax };
  };

  return (
    <List>
      <ListItemText //
        sx={{ display: "flex", flexDirection: "column" }}
        key={props.subFaction}
        primary={<span>{STATS.TOTAL}</span>}
      />
      <ListItemText
        sx={{ display: "flex", flexDirection: "column" }}
        key={props.subFaction}
        primary={
          <span>
            <span>{displayCurrentTotal()}</span>
            <span> {displayCurrentPercentage()}</span>
          </span>
        }
      />
      <ListItemText
        secondary={
          <>
            <Typography
              variant="caption text" //
              align="right"
              sx={{
                paddingRight: "4.3em", //
              }}
            >
              {`Minimum: ${MIN_PERCENTAGE} %`}
            </Typography>

            <Typography
              variant="caption text" //
              align="right"
            >
              {displayRemainder().tilMin}
            </Typography>
          </>
        }
      />
      <ListItemText
        secondary={
          <>
            <Typography
              variant="caption text" //
              align="right"
              sx={{ paddingRight: "4em" }}
            >
              {`Maximum: ${MAX_PERCENTAGE} %`}
            </Typography>
            <Typography
              variant="caption text" //
              align="right"
            >
              {displayRemainder().tilMax}
            </Typography>
          </>
        }
      />
    </List>
  );
};

export default ArmyListSubFactionFooter;
