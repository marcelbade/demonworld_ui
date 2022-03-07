// React
import React from "react";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
import { Dialog, Grid } from "@material-ui/core";
import FormLabel from "@material-ui/core/FormLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
// icons
// import SecurityIcon from "@material-ui/icons/Security";
// import Icon from "@material-ui/core/Icon";
// import SwordIcon from "./customIcons/blackSword.png";
// import BowIcon from "./customIcons/bow.jpg";
// import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";

const useStyles = makeStyles({
  root: {
    position: "absolute",
    "& .MuiDialog-paper": {
      position: "absolute",
      width: "80%",
      maxWidth: "none",
    },
    "& span": {
      fontFamily: "gonjuring",
      fontSize: "20px",
      fontWeight: "bold",
    },
    "& legend": {
      fontSize: "50px",
      fontWeight: "bold",
      fontFamily: "gonjuring",
    },
  },
  checkboxGroup: {
    display: "flex",
    direction: "column",

    maxHeight: "300px",
  },
});

const stats = [
  { column: "faction", renderedName: "Fraktion", display: false },
  { column: "unitName", renderedName: "Name", display: false },
  { column: "rangedWeapon", renderedName: "FernkampfWaffe", display: false },
  { column: "rangedAttackStats", renderedName: "Fernkampf", display: false },
  { column: "uniqueUnit", renderedName: "Eizigartig", display: false },
  { column: "leader", renderedName: "Anfuehrer", display: false },
  { column: "musician", renderedName: "Musiker", display: false },
  { column: "standardBearer", renderedName: "Bannertraeger", display: false },
  { column: "wedgeFormation", renderedName: "Keilformation", display: false },
  {
    column: "skirmishFormation",
    renderedName: "Plaenklerformation",
    display: false,
  },
  { column: "squareFormation", renderedName: "Karreformation", display: false },
  { column: "horde", renderedName: "Horde", display: false },
  { column: "commandStars", renderedName: "Befehle", display: false },
  { column: "magic", renderedName: "Magielevel", display: false },
  { column: "subFaction", renderedName: "Unterfraktion", display: false },
  { column: "points", renderedName: "Punkte", display: false },
  {
    column: "numberOfElements",
    renderedName: "Anzahl der Elemente",
    display: false,
  },
  { column: "move", renderedName: "Bewegung", display: false },
  { column: "charge", renderedName: "Angriff", display: false },
  { column: "skirmish", renderedName: "Plaenkeln", display: false },
  { column: "hold_maneuvers", renderedName: "Halten/Manoever", display: false },
  {
    column: "controlZone_OverRun",
    renderedName: "Kontrolzone/Ueberrennen",
    display: false,
  },
  { column: "initiative", renderedName: "initiative", display: false },
  { column: "unitSize", renderedName: "Groesse", display: false },
  { column: "armourRange", renderedName: "Fernkampfruestung", display: false },
  { column: "armourMelee", renderedName: "Nahkampfruestung", display: false },
  { column: "weapon1", renderedName: "1. Nahkampfwaffe", display: false },
  { column: "weapon2", renderedName: "2. Nahkampfwaffe", display: false },
  { column: "skillMelee", renderedName: "Nahkampffertigkeit", display: false },
  { column: "skillRange", renderedName: "Fernkampffertigkeit", display: false },
  { column: "fear", renderedName: "Furchtfaktor", display: false },
  { column: "moral1", renderedName: "1. Moralwert", display: false },
  { column: "moral2", renderedName: "2. Moralwert", display: false },
  { column: "hitpoints", renderedName: "Trefferpunkte", display: false },
  { column: "specialRules", renderedName: "Sonderregeln", display: false },
];

const TableOptions = (props) => {
  const classes = useStyles();

  const handleChange = () => {};

  const createLabels = () => {
    return stats.map((s) => (
      <FormControlLabel
        key={s.column}
        className="gonjuring"
        control={
          <Checkbox
            color="grey"
            key={s.column}
            checked={s.display}
            onChange={handleChange}
            name={s.renderedName}
          />
        }
        label={s.renderedName}
      />
    ));
  };

  const handleClose = () => {
    props.closeDialog();
  };

  return (
    <Dialog
      modal={true}
      autoDetectWindowHeight={false}
      autoScrollBodyContent={false}
      onClose={handleClose}
      open={props.showOptions}
      className={classes.root}
    >
      <FormLabel component="legend">
        Welche Spalten sollen angezeigt werden?
      </FormLabel>
      <Grid
        container
        justify="left"
        direction="row"
        wrap="nowrap"
        className={classes.checkboxGroup}
      >
        <FormGroup>{createLabels()}</FormGroup>
      </Grid>
    </Dialog>
  );
};

export default TableOptions;
