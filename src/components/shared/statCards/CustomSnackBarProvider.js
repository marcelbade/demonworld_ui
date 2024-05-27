//  react
import React from "react";
// notistack
import { SnackbarProvider } from "notistack";
//Material UI
import { Fade } from "@mui/material";
// components and functions
import CustomIcon from "./CustomIcon";
import customStyledMessage from "../../../AppTheme/notiStackTheme";
// icons
import SpellBookIcon from "../../../assets/icons/spellbook-white.png";
// constants
import { TOOLTIPS } from "../../../constants/textsAndMessages";

const CustomSnackBarProvider = (props) => {
  return (
    <SnackbarProvider
      Components={{
        error: customStyledMessage,
        info: customStyledMessage,
      }}
      preventDuplicate
      maxSnack={3}
      TransitionComponent={Fade}
      iconVariant={{
        error: (
          <CustomIcon
            icon={SpellBookIcon} //
            altText={TOOLTIPS.RULE_BOOK_TEXT}
            height={35}
            width={35}
            boxHeight={45}
            boxWidth={45}
          />
        ),
      }}
    >
      {props.children}
    </SnackbarProvider>
  );
};

export default CustomSnackBarProvider;
