// React
import { useContext } from "react";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
// components and functions
import AlternativeArmyListSelector from "./AlternativeArmyListSelector";
import { ArmyContext } from "../../../../contexts/armyContext";
// constants
import { NONE, ARMIES_WITH_TWO_ALTERNATE_ARMY_PICKS } from "../../../../constants/factions";
import { Fragment } from "react";

const useStyles = makeStyles((theme) => ({}));

const AlternativeArmyListBox = () => {
  const AC = useContext(ArmyContext);
  const classes = useStyles();

  return (
    <Fragment>
      {AC.armyHasAlternativeLists && AC.numberOfAlternativeChoices > 0 ? (
        <AlternativeArmyListSelector //
          firstSelector={true}
          options={AC.alternateArmyListOptions}
          isArmySelector={false}
          className={classes.selector}
        />
      ) : null}
      {AC.armyHasAlternativeLists && AC.numberOfAlternativeChoices > 1 ? (
        <AlternativeArmyListSelector //
          firstSelector={false}
          options={AC.secondAlternativeArmyOptions}
          isArmySelector={false}
          className={classes.selector}
        />
      ) : null}
    </Fragment>
  );
};

export default AlternativeArmyListBox;
