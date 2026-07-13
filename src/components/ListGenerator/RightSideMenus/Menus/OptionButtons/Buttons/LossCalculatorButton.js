// react
import { useContext } from "react";
import { useHistory } from "react-router-dom";
// Material UI
import { IconButton, Tooltip } from "@mui/material";
// components and functions
import CustomIcon from "../../../../../shared/CustomIcon";
// custom hooks
import useTestListButton from "../../../../../../customHooks/UseTestListButton";
// context
import { SelectionContext } from "../../../../../../contexts/selectionContext";
// icons
import deathIcon from "../../../../../../assets/icons/calculator.png";
// constants
import { OPTIONS } from "../../../../../../constants/textsAndMessages";

const LossCalculatorButton = () => {
  const SEC = useContext(SelectionContext);
  const history = useHistory();

  const ICON_SIZE = "60px";
  const ICON_BOX_SIZE = "65px";

  /**
   * Function takes the current army list as an object, stores it in the history object and naviagates to the LossCalculator component.
   */
  const navigateToLossCalculator = () => {
    history.push({
      pathname: "/lossCalculator",
      state: {
        lastPage: "listGenerator",
        selectedArmy: SEC.selectedUnits,
      },
    });
  };

  const testButtonCondition = useTestListButton({
    selectionData: SEC.selectedUnits,
    errorMessage: OPTIONS.NO_LIST,
    action: navigateToLossCalculator,
  });

  return (
    <Tooltip title={OPTIONS.TO_LOSS_CALCULATOR}>
      <span>
        <IconButton
          onClick={() => {
            testButtonCondition.test();
          }}
        >
          <CustomIcon
            icon={deathIcon} //
            altText={OPTIONS.TO_LOSS_CALCULATOR}
            height={ICON_SIZE}
            width={ICON_SIZE}
            boxHeight={ICON_BOX_SIZE}
            boxWidth={ICON_BOX_SIZE}
          />
        </IconButton>
      </span>
    </Tooltip>
  );
};

export default LossCalculatorButton;
