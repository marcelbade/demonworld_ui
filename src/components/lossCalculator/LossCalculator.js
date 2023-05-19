// React
import React, { useState, useContext, useEffect, Fragment } from "react";
//Material UI
import { Grid, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
// components and functions
import { ArmyContext } from "../../contexts/armyContext"
 
// constants
 
const useStyles = makeStyles({});

const AlternativeArmyListSelector = () => {
  const classes = useStyles();
  const contextArmy = useContext(ArmyContext);

  //state
  
  useEffect(() => {
    
  }, [ ]); // eslint-disable-line react-hooks/exhaustive-deps

 
 
  return <Fragment>

            <Typography>  CALCULATOR HERE :D  </Typography>

  </Fragment>;
};

export default AlternativeArmyListSelector;
