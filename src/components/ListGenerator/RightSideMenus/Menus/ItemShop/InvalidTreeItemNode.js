import React from "react";
// material ui
import { Typography, IconButton, Grid } from "@mui/material";
import { useTheme } from "@emotion/react";
// icons
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
// constants
import ContextHelpButton from "../../../../shared/ContextHelpButton";
import { PUSH_MESSAGE_TYPES } from "../../../../../constants/textsAndMessages";

const InvalidTreeItemNode = (props) => {
  const theme = useTheme();

  return (
    <Grid container alignItems="center" direction="row">
      <Grid item container direction="column" xs={2}>
        <Typography
          variant="body1" //
          sx={{
            color: theme.palette.disabled,
          }}
        >
          {props.item.itemName}
        </Typography>
        <Typography
          variant="body1" //
          sx={{
            color: theme.palette.disabled,
          }}
        >
          {props.item.points}
        </Typography>
      </Grid>
      <Grid item xs={6}>
        <IconButton size="large" disabled={true}>
          <AddCircleOutlineIcon />
        </IconButton>
        <ContextHelpButton
          message={props.message} //
          type={PUSH_MESSAGE_TYPES.ERROR}
        />
      </Grid>
    </Grid>
  );
};

export default InvalidTreeItemNode;
