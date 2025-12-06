// Material UI
import { IconButton, Tooltip } from "@mui/material";
// components and functions
import CustomIcon from "./CustomIcon";
// icons
import customPdfIcon_black from "../../assets/icons/customPDFIcon.svg";
import customPdfIcon_white from "../../assets/icons/customPDFIconWhite.png";

/**
 * Function creates a nested JSX element that renders an icon button
 * that renders a dialog box if clicked.
 * @param {object} props
 *  - toolTipTitle: the String displayed as tooltip when hovering and
 *    as alt text for the icon
 *  - disabledIf: boolean, if true, disables button
 *  - openDialog: function for the icon button onClick event
 * @returns a nested React element.
 */
const CreatePdfButton = (props) => {
  return (
    <>
      <Tooltip title={props.toolTipTitle}>
        <span>
          <IconButton
            disabled={props.disabledIf} //
            onClick={() => {
              props.openDialog(true);
            }}
            sx={{ marginLeft: props.marginLeft }}
          >
            <CustomIcon
              icon={props.color === "white" ? customPdfIcon_white : customPdfIcon_black} //
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
