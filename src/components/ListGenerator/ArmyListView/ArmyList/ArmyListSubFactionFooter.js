// React
import React, { useContext, useEffect, useState } from "react";
// Material UI
import { ListItemText, makeStyles, List } from "@material-ui/core";
// components and functions
import { ArmyContext } from "../../../../contexts/armyContext";
import { uuidGenerator } from "../../../shared/sharedFunctions";
import { calculateTotalUnitPointCost } from "../../../shared/sharedFunctions";
import { ruleObjectProvider } from "../../../../gameLogic/armyListValidationRules/ruleObjectProvider";
// clsx

const useStyles = makeStyles({
  listElement: {
    display: "flex",
    flexDirection: "column",
  },
  textBox: {
    gap: "1em",
    display: "flex",
    flexDirection: "row",
  },
  font: {},
});

const ArmyListSubFactionFooter = (props) => {
  const classes = useStyles();
  const contextArmy = useContext(ArmyContext);

  const [subFactionTotal, setSubFactionTotal] = useState(0);

  const [percentages, setPercentages] = useState({
    min: 0,
    max: 0,
  });

  /**
   * Useffect calculates the point total for the sub faction and validates it.
   */
  useEffect(() => {
    let total = 0;
    if (props.subFactionUnits) {
      props.subFactionUnits.forEach((u) => (total += calculateTotalUnitPointCost(u)));
    }
    setSubFactionTotal(total);
  }, [props.subFactionUnits]);

  useEffect(() => {
    const result = calculateMinAndMaxPercentages();
    setPercentages({ min: result.min, max: result.max });
  }, [contextArmy.selectedFactionName]); // eslint-disable-line react-hooks/exhaustive-deps

  /**
   * Function calculates the minimum and maximum percentage allowance for the subfaction.
   * @returns Object with min and
   */
  const calculateMinAndMaxPercentages = () => {
    const ruleArray = ruleObjectProvider(contextArmy.selectedFactionName);
    const filteredArray = ruleArray.filter((r) => r.cardNames.includes(props.subFactionName));

    // when changing armies, the rulearray very briefly becomes undefined. Hence the test for length.
    const minPercentage = filteredArray.length !== 0 ? filteredArray[0].min * 100 : 0;
    const maxPercentage = filteredArray.length !== 0 ? filteredArray[0].max * 100 : 0;

    return {
      min: Math.trunc(minPercentage),
      max: Math.trunc(maxPercentage),
    };
  };

  const calculateCurrentPercentage = () => {
    return (subFactionTotal / contextArmy.maxPointsAllowance) * 100;
  };

  const displayPoints = () => {
    return subFactionTotal === 0 ? null : `${subFactionTotal} Punkte`;
  };

  const displayPercents = () => {
    // Number(Math.round(100 - (price / listprice) * 100 + 'e2') + 'e-2').toFixed(2);
    const result = calculateCurrentPercentage() === 0 ? null : `Prozent ${Number(calculateCurrentPercentage()).toFixed(2)} %`;
    return result;
  };

  return (
    <List>
      <ListItemText className={classes.listElement} key={uuidGenerator()} primary={<span className={classes.font}>Gesamt</span>} />
      <ListItemText
        className={classes.listElement}
        key={uuidGenerator()}
        primary={
          <span className={classes.textBox}>
            <span className={classes.font}>{displayPoints()}</span>
            <span className={classes.font}> {displayPercents()}</span>
          </span>
        }
        secondary={
          <span className={classes.textBox}>
            <span className={classes.font}>{`Minimum: ${percentages.min} %`}</span>
            <span className={classes.font}>{`Maximum ${percentages.max} %`}</span>
          </span>
        }
      />
    </List>
  );
};

export default ArmyListSubFactionFooter;
