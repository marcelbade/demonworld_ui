// React
import { Fragment, useContext } from "react";
// material ui
import { Grid2 as Grid, Typography } from "@mui/material";
// components & functions
import CompendiumTableRow from "./CompendiumTableRow";
import DetailedCardView from "./CardRow";
import CompendiumTableHeader from "./CompendiumTableHeader";
import AppBar from "../../../shared/options/OptionsMenu";
//icons
import FactionAndUnitSelectors from "./FactionAndUnitSelectors";
import { CompendiumContext } from "../../../../contexts/compendiumContext";
// constants
import { COMPENDIUM } from "../../../../constants/textsAndMessages";
import OptionsButton from "../../../shared/options/OptionsButton";

const CompendiumTable = () => {
  const CC = useContext(CompendiumContext);

  return (
    <Grid container>
      <AppBar />

      <Grid //
        container
        direction="row"
        size={12}
        spacing={9}
        justifyContent="space-between"
      >
        <Grid size={4}>
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
        <Grid>
          <OptionsButton />
        </Grid>
      </Grid>

      <Grid size={12}>
        <table rules="none">
          <CompendiumTableHeader />
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
