// React
import { Fragment, useContext, useEffect, useState } from "react";
// material ui
import { Grid2 as Grid, Pagination } from "@mui/material";
// components & functions
import CompendiumTableRow from "./CompendiumTableRow";
import DetailedCardView from "./CardRow";
import CompendiumTableHeader from "./CompendiumTableHeader";
import CollapsableTopMenuDrawer from "../../../shared/CollapsableTopMenuDrawer";
import TopDrawerButton from "../../../shared/TopDrawerButton";
//icons
import FactionAndUnitSelectors from "./FactionAndUnitSelectors";
import { CompendiumContext } from "../../../../contexts/compendiumContext";
// constants
import { COMPENDIUM } from "../../../../constants/textsAndMessages";

const CompendiumTable = () => {
  const CC = useContext(CompendiumContext);

  const [numberOfPages, setNumberOfPages] = useState(0);
  const [selectedPage, setSelectedPage] = useState(1);
  const [singlePageData, setSinglePageData] = useState([]);

  const ROWS_PER_PAGE = 20;

  useEffect(() => {
    calculateNumberOfPages(CC.displayUnits);
  }, [CC.displayUnits]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    createDataForPage();
  }, [numberOfPages, selectedPage]); // eslint-disable-line react-hooks/exhaustive-deps

  const calculateNumberOfPages = (dataArray) => {
    setNumberOfPages(Math.ceil(dataArray.length / ROWS_PER_PAGE));
  };

  const createDataForPage = () => {
    const offset = (selectedPage - 1) * ROWS_PER_PAGE;
    setSinglePageData(CC.displayUnits.slice(offset, offset + ROWS_PER_PAGE));
  };

  const turnPage = (event, value) => { // event is needed!
    setSelectedPage(value);
  };

  return (
    <Grid container>
      <Grid //
        container
        direction="column"
        size={12}
      >
        <Grid
          container //
          direction="column"
          alignItems="center"
        >
          <CollapsableTopMenuDrawer
            displayPageTitle={true}
            title={COMPENDIUM.TITLE} //
            displayNaviBttn={true}
            displayListBttns={true}
          />
          <TopDrawerButton />
        </Grid>
        <Grid
          container //
          direction="row"
          justifyContent="space-between"
          alignItems="end"
          sx={{ paddingTop: "2em" }}
        >
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
                marginBottom: "1em",
              },
            }}
          />
        </Grid>
      </Grid>

      <Grid size={12}>
        <table rules="none">
          <CompendiumTableHeader />
          <tbody>
            {singlePageData
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
