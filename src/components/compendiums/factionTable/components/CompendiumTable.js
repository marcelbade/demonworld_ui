// React
import { Fragment, useContext } from "react";
// material ui
import { Grid2 as Grid, Typography } from "@mui/material";
// components & functions
import CompendiumTableRow from "./CompendiumTableRow";
import DetailedCardView from "./CardRow";
import CompendiumTableHeader from "./CompendiumTableHeader";
import AppBarToggle from "../../../shared/AppBarToggle";
import AppBar from "../../../shared/AppBar";
//icons
import FactionAndUnitSelectors from "./FactionAndUnitSelectors";
import { CompendiumContext } from "../../../../contexts/tableContext";
// constants
import { COMPENDIUM } from "../../../../constants/textsAndMessages";
import { ID } from "../../../../constants/MenuAndDialogConstants";

const CompendiumTable = () => {
  const CC = useContext(CompendiumContext);

  return (
    <Grid container>
      <AppBarToggle
        iconSize="25em" //
        bttnSize="2em"
        margin="0.5em"
      />
      <AppBar hiddenElements={[ID.LIST_DISPLAY]} />
      <Grid //
        container
        direction="row"
      >
        <Grid size={8}>
          <Typography
            variant="h3"
            sx={{
              marginLeft: "0.5em", //
              marginTop: "0.5em",
              marginBottom: "0.5em",
              fontFamily: "NotMaryKate",
            }}
          >
            {COMPENDIUM.TITLE}
          </Typography>
          <FactionAndUnitSelectors />
        </Grid>
      </Grid>

      <Grid size={12}>
        <table rules="none">
          <CompendiumTableHeader columns={CC.columns} />
          <tbody>
            {CC.displayUnits
              .filter((u) => u.multiStateOrderNumber < 2)
              .map((unit, i) => {
                return (
                  <Fragment key={i}>
                    <CompendiumTableRow
                      unit={unit} //
                      rowNumber={i}
                      key={i}
                    />
                    <DetailedCardView
                      unit={unit} //
                      key={`${i},${unit.unitName},${unit.subFaction}`}
                    />
                  </Fragment>
                );
              })}
          </tbody>
        </table>
      </Grid>
    </Grid>
  );
};

export default CompendiumTable;
