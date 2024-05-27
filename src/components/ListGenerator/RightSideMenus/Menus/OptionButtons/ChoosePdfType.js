import { Button, Grid } from "@mui/material";
import React from "react";
import { OPTIONS } from "../../../../../constants/textsAndMessages";

const ChoosePdfType = (props) => {
  return props.display ? (
    <Grid container direction="row" justifyContent="space-between">
      <Grid item xs={5}>
        <Button
          variant="outlined"
          onClick={() => {
            props.openPDfInNewTab({ printDefaultList: true });
            props.setShowPdfVariantButtons(false);
          }}
        >
          {OPTIONS.CREATE_DEFAULT_LIST}
        </Button>
      </Grid>
      <Grid item xs={5}>
        <Button
          variant="outlined"
          onClick={() => {
            props.openPDfInNewTab({ printDefaultList: false });
            props.setShowPdfVariantButtons(false);
          }}
        >
          {OPTIONS.CREATE_DETAILED_LIST}
        </Button>
      </Grid>
    </Grid>
  ) : null;
};

export default ChoosePdfType;
