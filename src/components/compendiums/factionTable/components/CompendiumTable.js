// React
import React, { Fragment, useEffect, useState } from "react";
// Axios
import axios from "axios";
// material ui
import { Grid, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
// components & functions
import CompendiumTableRow from "./CompendiumTableRow";
import DetailedCardView from "./CardRow";
import CompendiumTableHeader from "./CompendiumTableHeader";
import LightSwitch from "../../../shared/LightSwitch";
import MainMenuReturnButton from "../../../shared/MainMenuReturnButton";
import { columnGroupObjects, columnsStateObjects } from "./columnsStateObject";
//icons
import FactionAndUnitSelectors from "./FactionAndUnitSelectors";
import TableProvider from "../../../../contexts/tableContext";
// constants
import { COMPENDIUM } from "../../../../constants/textsAndMessages";
import CompendiumDropDown from "./CompendiumDropDown";

const CompendiumTable = () => {
  // intialize local state
  const [receivedData, setReceivedData] = useState([]);
  const [data, setData] = useState([]);
  const [selectedFaction, setSelectedFaction] = useState("");
  const [selectedSubFaction, setSelectedSubFaction] = useState("");
  const [displaySubFactions, setDisplaySubFactions] = useState([]);
  const [displayUnits, setDisplayUnits] = useState([]);
  const [selectedStatCards, setSelectedStatCards] = useState([]);
  const [allBoxes, setAllBoxes] = useState(false);
  const [columns, setColumns] = useState(columnsStateObjects);
  const [toggleGroups, setToggleGroups] = useState(columnGroupObjects);

  const theme = useTheme();

  useEffect(() => {
    fetchData();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const fetchData = async () => {
    const result = await axios(`http://localhost:8080/factions`);
    setReceivedData(addLock(result.data));
  };

  useEffect(() => {
    setData(receivedData);
    setDisplayUnits(receivedData);
  }, [receivedData]); // eslint-disable-line react-hooks/exhaustive-deps

  const addLock = (rawUnits) => {
    for (let i = 0; i < rawUnits.length; i++) {
      rawUnits[i] = { ...rawUnits[i], unitLocked: false };
    }

    return rawUnits;
  };

  /**
   * Function toggles the unitCard view on and off for a single table row.
   * @param {UnitCard} unit
   */
  const toggleUnitCard = (unit) => {
    console.log("unit", unit);

    const name = unit.multiCardName === "" ? unit.unitName : unit.multiCardName;

    const id = unit.faction + name;

    console.log("id", id);

    selectedStatCards.includes(id)
      ? setSelectedStatCards(selectedStatCards.filter((c) => c !== id))
      : setSelectedStatCards([...selectedStatCards, id]);

    console.log("selectedStatCards", selectedStatCards);
  };

  /**
   * Function triggered by the Checkboxes. Controls which columns of the table are displayed by
   * setting the displayed property.
   * @param {String} column
   * @param {boolean} isChecked
   */
  const toggleColumn = (column, isChecked) => {
    setColumns(
      columns.filter((c) => {
        if (c.column === column) {
          c.displayed = !isChecked;
        }
        return c;
      })
    );
  };

  /**
   * Function toggles all table columns of one Group.
   *
   * @param {String} name
   * @param {[String]} columnGroup
   * @param {boolean} isChecked
   */
  const toggleGroupsOfColumns = (groupName) => {
    let oldGroupToggleValue;

    setToggleGroups(
      toggleGroups.map((t) => {
        if (t.toggleGroup === groupName) {
          oldGroupToggleValue = t.displayEntireGroup;
          t.displayEntireGroup = !t.displayEntireGroup;
        }
        return t;
      })
    );

    setColumns(
      columns.map((c) => {
        if (c.toggleGroup === groupName) {
          c.displayed = !oldGroupToggleValue;
        }
        return c;
      })
    );
  };

  /**
   * Function toggles all table columns.
   */
  const toggleAllColumns = () => {
    const temp = allBoxes;

    setColumns(
      columns.map((c) => {
        c.displayed = temp;
        return c;
      })
    );

    setToggleGroups(
      toggleGroups.map((t) => {
        t.displayEntireGroup = temp;
        return t;
      })
    );

    setAllBoxes((prevState) => !prevState);
  };

  return receivedData ? (
    <>
      <TableProvider
        value={{
          displayUnits: displayUnits,
          displaySubFactions: displaySubFactions,
          data: data,
          allBoxes: allBoxes,
          columns: columns,
          toggleGroups: toggleGroups,
          selectedFaction: selectedFaction,
          selectedSubFaction: selectedSubFaction,
          selectedStatCards: selectedStatCards,
          setData: setData,
          setDisplaySubFactions: setDisplaySubFactions,
          setDisplayUnits: setDisplayUnits,
          setColumns: setColumns,
          toggleColumn: toggleColumn,
          toggleAllColumns: toggleAllColumns,
          toggleGroupsOfColumns: toggleGroupsOfColumns,
          setSelectedFaction: setSelectedFaction,
          setSelectedSubFaction: setSelectedSubFaction,
          toggleUnitCard: toggleUnitCard,
        }}
      >
        <Grid container>
          <Grid
            item //
            container
            xs={12}
            alignContent="flex-start"
            direction="row"
            justifyContent="space-between"
            sx={{
              position: "relative", //
              paddingRight: "3em",
            }}
          >
            <Grid
              item //
              container
              xs={11}
            >
              <MainMenuReturnButton />
            </Grid>

            <Grid
              item //
              container
              xs={1}
              alignContent="flex-start"
              justifyContent="end"
            >
              <LightSwitch />
            </Grid>
          </Grid>
          <Grid item container direction="row">
            <Grid item xs={8}>
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

          <Grid item xs={12}>
            <Grid
              container
              justifyContent="flex-end"
              sx={{
                backgroundColor: theme.palette.compendiumHeaderBackground,
              }}
            >
              <CompendiumDropDown />
            </Grid>
            {receivedData ? (
              <table rules="none">
                <CompendiumTableHeader columns={columns} />
                <tbody>
                  {displayUnits
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
            ) : null}
          </Grid>
        </Grid>
      </TableProvider>
    </>
  ) : null;
};

export default CompendiumTable;
