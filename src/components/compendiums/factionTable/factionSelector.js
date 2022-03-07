// React
import React, { useState } from "react";
// Material UI
import { Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// icons
// import SwordIcon from "./customIcons/blackSword.png";
// import BowIcon from "./customIcons/bow.jpg";
// components & functions
// constants
import { ALL_FACTIONS_ARRAY } from "../../../constants/factions";

const useStyles = makeStyles({
  root: {
    height: "100%",
    width: "100%",
    fontSize: "20px",
    fontWeight: "bold",
  },
  buttons: {
    backgroundColor:"grey",
    marginRight:"10px",
    textAlign:"center",
    fontFamily: "notMaryKate",
    fontSize: "30px",
    height: "60px",
    width: "200px",
  },
  bttnGroup: {
    height: "60px",
    marginLeft: "60px", 
    marginBottom: "50px",
  },
});

const  SelectFactionButtonGroup = (props) => {
  const classes = useStyles();
   
  const [flag, setFlag] = useState("zwerge");  

  const handleSelection = (newFaction) => { 
    props.filterData(newFaction);
  };

  const createButton = () => {
    return ALL_FACTIONS_ARRAY.map((f) => ( 
      <Button
        className={classes.buttons}
        key={f}
        color={flag.toLowerCase() === f.toLowerCase() ? "primary" : "secondary"}
        onClick={() => {
          handleSelection(f);
           setFlag(f);
        }}
      >
        {f}
      </Button>
    ));
  };

  return (
    <Grid container direction="row" className={classes.bttnGroup}>
      {createButton()}
    </Grid>
  );
};

export default  SelectFactionButtonGroup;
