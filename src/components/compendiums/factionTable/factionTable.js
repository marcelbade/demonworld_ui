// React
import React, { useEffect, useState } from "react";
// Axios
import axios from "axios";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import MaterialTable, { MTableToolbar } from "material-table";
import { Button, Grid, Paper } from "@material-ui/core";
 // icons
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
// clsx
import clsx from "clsx";
// components & functions
import {
  renderBoolean,
  renderSpecialRules,
  unitOrCmdCard,
} from "./depencies/factionTableFunctions";
import { tableIcons } from "./depencies/tableIcons";
import TableOptions from "./OptionsMenuDialog";
import ArmySelection from "../../shared/armySelection";
 
const useStyles = makeStyles({
  root: {
    height: "100%",
    width: "100%",
    fontSize: "20px",
    fontWeight: "bold",
    "& th": {
      fontFamily: "Beryliumbold",
      fontWeight: "bold",
      fontSize: "20px",
    },
    "&  td": {
      textAlign: "center",
      padding: "0px",
    },
  },
  tableTitle: {
    fontWeight: "bold",
    fontFamily: "notMaryKate",
    color: "red",
    fontSize: "50px",
    marginBottom: "10px",
    marginLeft: "60px",
    textAlign: "left",
  },
  armySelector: {
    marginLeft: "60px",
    position: "relative",
    // right :"10px",
    // top: "52px",
    // zIndex:"800"
  },
  options: {
    fontFamily: "notMaryKate",
    fontSize: "20px",
    marginBottom: "10px",
    marginLeft: "60px",
    textAlign: "left",
  },
  optionsBttn: {
    // fontWeight: "bold",
    fontFamily: "notMaryKate",
    color: "red",
    fontSize: "30px",
    paddingTop: "15px",
    paddingRight: "350px",
  },
  titleIcons: {
    height: "24px",
    width: "24px",
  },
  unitCardStripe: {
    padding: "10px",
    color: "white",
    backgroundColor: "black",
  },
  unitCardBox: {
    width: "20%",
  },
  cardTitle: {
    textAlign: "center",
    fontSize: "40px",
    color: "red",
    borderWidth: "0px",
    "& .MuiGrid-item": { border: "none", padding: "0px", margin: "0px" },
  },
});

const OverviewTable = () => {
  const classes = useStyles();

  // intialize local state
  const [localFactions, setLocalFactions] = useState([]);
  const [singleFilteredFaction, setSingleFilteredFaction] = useState();
  const [showOptions, setShowOptions] = useState(false);
  //const [hideColumns, setHideColumns] = useState();

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const result = await axios(`http://localhost:8080/factions`);
    setLocalFactions(result.data);
  };

  /**
   * filters the factions JSON by faction.
   * @param {[{}]} selectedFaction
   */
  const filterData = (selectedFaction) => {
    setSingleFilteredFaction(
      localFactions.filter(
        (lf) => lf.faction.toLowerCase() === selectedFaction.toLowerCase()
      )
    );
  };

  /**
   * show the options menu
   */
  const handleBttn = () => {
    setShowOptions(!showOptions);
  };

  /**
   * THE TABLE
   */
  return localFactions ? (
    <Paper className={clsx(classes.root, "font-face-gonjuring")}>
      <Grid container alignItems="center">
        <Grid item xs={6}>
          {/* TITLE  */}
          <p className={classes.tableTitle}>Kompendium</p>
          <Grid className={classes.armySelector}>
            <ArmySelection filterData={filterData} />
          </Grid>
        </Grid>

        <Grid item xs={6}>
          {/* <p className={classes.options}>Fraktionen</p>
          <Switch />
          <p className={classes.options}>Gegenstände</p> */}
        </Grid>
      </Grid>
      <MaterialTable
        columns={[
          {
            title: "Fraktion",
            field: "faction",
            hidden: false,
            headerStyle: {
              width: "500px",
              padding: "10px",
            },
            cellStyle: {
              width: "500px",
              padding: "10px",
            },
          },
          {
            title: "Unterfraktion",
            field: "subFaction",
            headerStyle: {
              padding: "10px",
              width: 200,
            },
            cellStyle: {
              textAlign: "center",
              padding: "10px",
              width: 200,
            },
          },
          {
            title: "Name",
            field: "unitName",
            headerStyle: {
              padding: "10px",
              width: "500px",
            },
            cellStyle: {
              textAlign: "center",
              padding: "10px",
              width: "500px",
            },
          },
          {
            title: "Typ",
            field: "unitType",
          },
          {
            title: "Elemente",
            field: "numberOfElements",
          },
          {
            title: "Banner",
            field: "standardBearer",
            cellStyle: {
              width: "5px",
              maxWidth: "5px",
            },
            headerStyle: {
              width: "5%",
              maxWidth: "5%",
            },
            render: (rowData) =>
              renderBoolean(rowData.numberOfElements, rowData.standardBearer),
          },
          {
            title: "Musiker",
            field: "musician",

            render: (rowData) =>
              renderBoolean(rowData.numberOfElements, rowData.musician),
          },
          //formations
          {
            title: "Keil",
            field: "wedgeFormation",

            render: (rowData) =>
              renderBoolean(rowData.numberOfElements, rowData.wedgeFormation),
          },
          {
            title: "Plänkler",
            field: "skirmishFormation",

            render: (rowData) =>
              renderBoolean(
                rowData.numberOfElements,
                rowData.skirmishFormation
              ),
          },
          {
            title: "Kare",
            field: "squareFormation",

            render: (rowData) =>
              renderBoolean(rowData.numberOfElements, rowData.squareFormation),
          },
          {
            title: "Horde",
            field: "horde",

            render: (rowData) =>
              renderBoolean(rowData.numberOfElements, rowData.horde),
          },
          // movement
          {
            title: "B",
            field: "move",
          },
          {
            title: "A",
            field: "charge",
          },
          {
            title: "P",
            field: "skirmish",
          },
          {
            title: "H/Manöver",
            field: "hold_maneuvers",
          },
          // combat stats
          {
            title: "Größe",
            field: "unitSize",
          },
          {
            title: "Rüstung",
            render: (rowData) => {
              return rowData.armourRange + " / " + rowData.armourMelee;
            },
            // field: "armourRange",
          },

          {
            title: "1. Waffe",
            field: "weapon1",
          },
          {
            title: "2. Waffe",
            field: "weapon2",
          },
          {
            title: "Fernkampf",
            field: "rangedWeapon",
          },
          {
            title: "NK-Fertigkeit",
            field: "skillMelee",
          },
          {
            title: "FK-Fertigkeit",
            field: "skillRange",
          },
          {
            title: "Initiative",
            field: "initiative",
          },
          {
            title: "Größe",
            field: "unitSize",
          },
          {
            title: "Befehle",
            field: "commandStars",
          },
          {
            title: "Magie",
            field: "magic",
          },

          {
            title: "Kontrolbereich/Überrennen",
            field: "controlZone_OverRun",
            headerStyle: {
              width: "5%",
              maxWidth: "5%",
            },
            cellStyle: {
              width: "5%",
              maxWidth: "5%",
            },
          },
          {
            title: "Trefferpunkte",
            field: "hitpoints",
          },
          //moral
          {
            title: "Furcht",
            field: "fear",
          },
          {
            title: "Moral",
            render: (rowData) => {
              return rowData.moral1 + " / " + rowData.moral1;
            },
          },

          //special rules
          {
            title: "Sonderregeln",
            field: "specialRules",
            cellStyle: {
              fontSize: "20px",
            },
            render: (rowData) => renderSpecialRules(rowData.specialRules),
          },
          //points
          {
            title: "Punkte",
            field: "points",
          },
        ]}
        data={singleFilteredFaction}
        icons={tableIcons}
        options={{
          sorting: true,
          paging: false,
          showTitle: false,
          search: true,
          searchFieldStyle: {
            width: "300px",
            marginLeft: "350px",
          },
          pageSize: 20,
          pageSizeOptions: [5, 10, 20, 50, 100],
          headerStyle: {
            backgroundColor: "black",
            color: "white",
            textAlign: "center",
            "&:hover": {
              color: "#bbdefb",
            },
          },
        }}
        localization={{
          toolbar: {
            searchPlaceholder: "Detailsuche",
          },
        }}
        components={{
          Toolbar: (props) => (
            <Grid
              container
              direction="row"
              justify="space-between"
              alignItems="center"
            >
              <Grid xs={6} item container direction="row">
                <MTableToolbar {...props} />
              </Grid>
              <Button className={classes.optionsBttn} onClick={handleBttn}>
                Optionen
              </Button>
            </Grid>
          ),
        }}
        detailPanel={[
          {
            icon: ArrowForwardIosIcon,
            disabled: false,
            tooltip: "Karte anzeigen",
            render: (rowData) => {
              return unitOrCmdCard(rowData);
            },
          },
        ]}
      />
      {/* OPTIONS DIALOG  - opens new window */}
      <TableOptions showOptions={showOptions} closeDialog={handleBttn} />
    </Paper>
  ) : (
    <p>no data</p>
  );
};

export default OverviewTable;
