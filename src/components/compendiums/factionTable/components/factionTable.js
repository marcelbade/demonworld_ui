// React
import React, { useEffect, useState } from "react";
// Axios
import axios from "axios";
import makeStyles from "@mui/styles/makeStyles";
import { AppBar, Dialog, Grid, IconButton, Toolbar, Typography, Slide } from "@mui/material";
// components & functions
import SelectionInput from "../../../shared/selectionInput";
import { ALL_FACTIONS_ARRAY } from "../../../../constants/factions";
import FactionTableRow from "./factionTableRow";
import DetailedCardView from "./detailedCardView";
import ToggleColumnsMenu from "./toggleColumnsMenu";
import FactionTableHeader from "./factionTableHeader";
import { COMPENDIUM, INPUT_TEXTS } from "../../../../constants/textsAndMessages";
import LightSwitch from "../../../shared/LightSwitch";
import MainMenuReturnButton from "../../../shared/MainMenuReturnButton";
import { columnGroupObjects, columnsStateObjects } from "./columnsStateObject";
//icons
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const useStyles = makeStyles({
  test: {
    backgroundColor: "pink",
  },
  test2: {
    backgroundColor: "blue",
  },
  topButtons: {
    paddingRight: "3em",
  },
  table: {
    width: "100%",
    textAlign: "center",
  },
  pageTitle: {
    marginLeft: "0.5em",
    fontFamily: "NotMaryKate",
  },
  toggleGroupBox: {
    border: 1,
    borderColor: "pink",
  },
  checkBoxLabel: {
    margin: "10px",
    width: "250px",
    "& .MuiFormControlLabel-label": {
      fontFamily: "NotMaryKate",
    },
  },
});

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const FactionTable = () => {
  const classes = useStyles();

  // intialize local state
  const [receivedData, setReceivedData] = useState([]);
  const [allFactions, setAllFactions] = useState([]);
  const [singleFilteredFaction, setSingleFilteredFaction] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [selectedStatCards, setSelectedStatCards] = useState([]);
  const [allBoxes, setAllBoxes] = useState(false);
  const [openOptions, setOpenOptions] = useState(false);
  const [columns, setColumns] = useState(columnsStateObjects);
  const [toggleGroups, setToggleGroups] = useState(columnGroupObjects);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const result = await axios(`http://localhost:8080/factions`);
    setReceivedData(result.data);
  };

  useEffect(() => {
    setAllFactions(receivedData);
    setTableData(receivedData);
  }, [receivedData]);

  /**
   * Generates the options for the faction name selector.
   * @returns [String]
   */
  const setSelectorFactionNames = () => {
    return ALL_FACTIONS_ARRAY.sort();
  };

  /**
   * Generates the options for the unit name selector. If a faction has been selected, only the names of that faction
   * are shown as options (singleFilteredFaction), otherwise ALL unit names in the games are displayed (localFactions).
   * @returns [String]
   */
  const setSelectorUnitNames = () => {
    const options = singleFilteredFaction.length === 0 ? allFactions : singleFilteredFaction;
    return options.map((u) => u.unitName).sort();
  };

  /**
   * OnChange function for faction name selector. Allows user to type and see the matching factions in real time.
   * setTableData changes table content after selection.
   * @param {[{}]} selectedFaction
   */
  const selectFaction = (selectedFaction) => {
    setSingleFilteredFaction(allFactions.filter((u) => u.faction=== selectedFaction));
    setTableData(allFactions.filter((u) => u.faction === selectedFaction));
  };

  /**
   *  "onChange" function for the unit name selector. getUnitNames() resets it
   *  after the selection to show all units of the faction.
   * @param {[{}]} nameSearchString
   */
  const selectUnit = (nameSearchString) => {
    setSelectorUnitNames();
    setTableData(allFactions.filter((lf) => lf.unitName.includes(nameSearchString)));
  };

  const clearFaction = () => {
    setTableData(allFactions);
  };

  const clearUnit = () => {
    setTableData(singleFilteredFaction);
  };

  const toggleUnitCard = (unit) => {
    const id = unit.faction + unit.unitName;

    selectedStatCards.includes(id)
      ? setSelectedStatCards(selectedStatCards.filter((c) => c !== id))
      : setSelectedStatCards([...selectedStatCards, id]);
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

  const handleOptionsOpen = () => {
    setOpenOptions(true);
  };

  const handleOptionsClose = () => {
    setOpenOptions(false);
  };

  return receivedData ? (
    <>
      <Grid container>
        <Grid
          item //
          container
          xs={12}
          alignContent="flex-start"
          direction="row"
          justifyContent="space-between"
          className={classes.topButtons}
        >
          <MainMenuReturnButton />
          <Grid
            item //
            container
            xs={1}
            alignContent="flex-start"
            justifyContent="end"
          >
            <LightSwitch />
            <IconButton onClick={handleOptionsOpen}>
              <MenuIcon />
            </IconButton>
          </Grid>
        </Grid>
        <Grid item container direction="row">
          <Grid item xs={8}>
            <Typography variant="h3" className={classes.pageTitle}>
              {COMPENDIUM.TITLE}
            </Typography>

            <SelectionInput
              alternatives={setSelectorFactionNames()}
              filterFunction={selectFaction}
              clearFunction={clearFaction}
              label={INPUT_TEXTS.SELECT_FACTION}
            />
            <SelectionInput
              alternatives={setSelectorUnitNames()}
              filterFunction={selectUnit}
              clearFunction={clearUnit}
              label={INPUT_TEXTS.SELECT_UNIT}
            />
          </Grid>
        </Grid>

        <Dialog
          open={openOptions} //
          onClose={handleOptionsClose}
          TransitionComponent={Transition}
          // override CSS for paper component child
          PaperProps={{
            sx: {
              minWidth: "80vw",
              minHeight: "80vh",
            },
          }}
        >
          <AppBar sx={{ position: "relative" }}>
            <Toolbar>
              <IconButton edge="start" color="inherit" onClick={handleOptionsClose} aria-label="close">
                <CloseIcon />
              </IconButton>
              <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                {COMPENDIUM.COLUMNS}
              </Typography>
            </Toolbar>
          </AppBar>
          <ToggleColumnsMenu
            allBoxes={allBoxes}
            columns={columns}
            toggleGroups={toggleGroups}
            toggleColumn={toggleColumn}
            toggleAllColumns={toggleAllColumns}
            toggleGroupsOfColumns={toggleGroupsOfColumns}
          />
        </Dialog>
        <Grid item xs={12}>
          {receivedData ? (
            <table className={classes.table} rules="none">
              <FactionTableHeader columns={columns} />
              <tbody>
                {tableData.map((unit) => {
                  return (
                    <>
                      <FactionTableRow
                        columns={columns}
                        unit={unit}
                        selectedStatCards={selectedStatCards}
                        toggleUnitCard={toggleUnitCard}
                      />
                      <DetailedCardView selectedCards={selectedStatCards} unit={unit} />
                    </>
                  );
                })}
              </tbody>
            </table>
          ) : null}
        </Grid>
      </Grid>
    </>
  ) : null;
};

export default FactionTable;
