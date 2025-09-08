// React
import { Fragment, useContext, useEffect, useState } from "react";
// material ui
import { Grid2 as Grid, Pagination } from "@mui/material";
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

  const [numberOfPages, setNumberOfPages] = useState(0);
  const [selectedPage, setSelectedPage] = useState(1);
  const [slicedDisplayUnits, setSlicedDisplayUnits] = useState([]);

  const ROWS_PER_PAGE = 20;

  useEffect(() => {
    calculateNumberOfPages(CC.displayUnits);
  }, [CC.displayUnits]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    createSlicedData();
  }, [numberOfPages, selectedPage]); // eslint-disable-line react-hooks/exhaustive-deps

  const calculateNumberOfPages = (dataArray) => {
    setNumberOfPages(Math.ceil(dataArray.length / ROWS_PER_PAGE));
  };

  const createSlicedData = () => {
    const offset = (selectedPage - 1) * ROWS_PER_PAGE;
    setSlicedDisplayUnits(CC.displayUnits.slice(offset, offset + ROWS_PER_PAGE));
  };

  const turnPage = (event, value) => {
    console.log(value);

    setSelectedPage(value);
  };

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

        <Grid size={6}>
          <FactionAndUnitSelectors />
          <Pagination
            count={numberOfPages} //
            page={selectedPage}
            onChange={turnPage}
            sx={{
              "& .MuiButtonBase-root": {
                height: "2em",
                width: "2em",
                fontSize: "20px",
              },
            }}
          />
        </Grid>
      </Grid>

      <Grid size={12}>
        <table rules="none">
          <CompendiumTableHeader />
          <tbody>
            {slicedDisplayUnits
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
