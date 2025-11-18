// Material UI
import { IconButton, Tooltip } from "@mui/material";
// components and functions
import CustomIcon from "./CustomIcon";
// icons
import customPdfIcon from "../../assets/icons/customPDFIcon.svg";

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

              console.log("clicked")
            }}
          >
            <CustomIcon
              icon={customPdfIcon} //
              altText={props.toolTipTitle}
              height={"65px"}
              width={"65px"}
              boxHeight={"70px"}
              boxWidth={"62px"}
            />
          </IconButton>
        </span>
      </Tooltip>
      {props.children}
    </>
  );
};

export default CreatePdfButton;
