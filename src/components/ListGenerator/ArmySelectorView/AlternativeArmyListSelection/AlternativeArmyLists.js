// React
import { useContext, Fragment } from "react";
// Material UI
import { makeStyles } from "@material-ui/core/styles";
// components and functions
import AlternativeArmyListSelector from "./AlternativeArmyListSelector";
import { AlternativeListContext } from "../../../../contexts/alternativeListContext";

const useStyles = makeStyles((theme) => ({}));

const AlternativeArmyListBox = () => {
  const ALC = useContext(AlternativeListContext);
  const classes = useStyles();

  return (
    <Fragment>
      {ALC.armyHasAlternativeLists && ALC.numberOfAlternativeChoices > 0 ? (
        <AlternativeArmyListSelector //
          firstSelector={true}
          options={ALC.alternateArmyListOptions}
          isArmySelector={false}
          className={classes.selector}
        />
      ) : null}
      {ALC.armyHasAlternativeLists && ALC.numberOfAlternativeChoices > 1 ? (
        <AlternativeArmyListSelector //
          firstSelector={false}
          options={ALC.secondAlternativeArmyOptions}
          isArmySelector={false}
          className={classes.selector}
        />
      ) : null}
    </Fragment>
  );
};

export default AlternativeArmyListBox;
