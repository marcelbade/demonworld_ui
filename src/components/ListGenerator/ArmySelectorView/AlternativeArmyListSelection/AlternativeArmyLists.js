// React
import { useContext, Fragment } from "react";
import makeStyles from '@mui/styles/makeStyles';
// components and functions
import AlternativeArmyListSelector from "./AlternativeArmyListSelector";
import { AlternativeListContext } from "../../../../contexts/alternativeListContext";

const useStyles = makeStyles(() => ({}));

const AlternativeArmyListBox = () => {
  const ALC = useContext(AlternativeListContext);
  const classes = useStyles();

  return (
    <Fragment>
      {ALC.armyHasAlternativeLists && ALC.numberOfAlternativeChoices > 0 ? (
        <AlternativeArmyListSelector //
          firstSelector={true}
          isArmySelector={false}
          className={classes.selector}
        />
      ) : null}
      {ALC.armyHasAlternativeLists && ALC.numberOfAlternativeChoices > 1 ? (
        <AlternativeArmyListSelector //
          firstSelector={false}
          isArmySelector={false}
          className={classes.selector}
        />
      ) : null}
    </Fragment>
  );
};

export default AlternativeArmyListBox;
