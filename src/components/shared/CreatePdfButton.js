// Material UI
import { IconButton, Tooltip } from "@mui/material";
// components and functions
import CustomIcon from "./CustomIcon";
// icons
import customPdfIcon_black from "../../assets/icons/customPDFIcon.svg";
// custom hooks
import useTestListButton from "../../customHooks/UseTestListButton";
// constants
import { OPTIONS } from "../../constants/textsAndMessages";

/**
 * Function creates a nested JSX element that renders an icon button
 * that shows a dialog box if clicked.
 * @param {object} props
 *  - toolTipTitle: the String displayed as tooltip when hovering
 *    over the button. Also the alt text for the icon
 *  - disabledIf: boolean, if true, disables button
 *  - openDialog: function for the icon button onClick event
 * @returns a nested React element.
 */
const CreatePdfButton = (props) => {
  const testButtonCondition = useTestListButton({
    selectionData: props.data,
    errorMessage: OPTIONS.NO_LIST,
    action: props.openDialog,
    actionParameter: true,
  });

  return (
    <>
      <Tooltip title={props.toolTipTitle}>
        <span>
          <IconButton
            onClick={() => {
              testButtonCondition.test();
            }}
            sx={{ marginLeft: props.marginLeft }}
          >
            <CustomIcon
              icon={customPdfIcon_black} //
              altText={props.toolTipTitle}
              height={props.size}
              width={props.size}
              boxHeight={props.boxSize}
              boxWidth={props.boxSize}
            />
          </IconButton>
        </span>
      </Tooltip>
      {props.children}
    </>
  );
};

export default CreatePdfButton;
