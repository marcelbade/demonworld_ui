import { Button, Grid } from "@mui/material";
import React from "react";
import { OPTIONS } from "../../../../../constants/textsAndMessages";

const ChoosePdfType = (props) => {
  return props.display ? (
    <Grid container direction="row">
      <Button
        onClick={() => {
          props.openPDfInNewTab({ printDefaultList: true });
          props.setShowPdfVariantButtons(false);
        }}
      >
        {OPTIONS.CREATE_DEFAULT_LIST}
      </Button>
      <Button
        onClick={() => {
          props.openPDfInNewTab({ printDefaultList: true });
          props.setShowPdfVariantButtons(false);
        }}
      >
        {OPTIONS.CREATE_DETAILED_LIST}
      </Button>
    </Grid>
  ) : null;
};

export default ChoosePdfType;
