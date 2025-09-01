// React
import { Fragment, useContext } from "react";
// material ui
import { Grid2 as Grid } from "@mui/material";
// components & functions
import CompendiumTableRow from "./CompendiumTableRow";
import DetailedCardView from "./CardRow";
import CompendiumTableHeader from "./CompendiumTableHeader";
//icons
import FactionAndUnitSelectors from "./FactionAndUnitSelectors";
import { CompendiumContext } from "../../../../contexts/compendiumContext";
// constants
import { COMPENDIUM } from "../../../../constants/textsAndMessages";

import TopMenuDrawer from "../../../shared/TopMenuDrawer";

const CompendiumTable = () => {
  const CC = useContext(CompendiumContext);

  return (
    <Grid container>
      <Grid //
        container
        direction="row"
        size={12}
        spacing={9}
        justifyContent="space-between"
      >
        <TopMenuDrawer title={COMPENDIUM.TITLE} displayNaviBttn={true} />

        <Grid size={4}>
          <FactionAndUnitSelectors />
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
