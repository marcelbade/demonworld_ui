// react
import { useContext } from "react";
import { useHistory } from "react-router-dom";
// Material UI
import { IconButton, Tooltip } from "@mui/material";
// components and functions
import CustomIcon from "../../../../../shared/CustomIcon";
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

  return (
    <Tooltip title={OPTIONS.TO_LOSS_CALCULATOR}>
      <span>
        <IconButton
          disabled={SEC.selectedUnits.length === 0} //
          onClick={() => {
            navigateToLossCalculator();
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
