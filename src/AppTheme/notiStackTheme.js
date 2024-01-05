import { styled } from "@mui/material/styles";
import { MaterialDesignContent } from "notistack";

const customStyledMessage = styled(MaterialDesignContent)(() => ({
  "&.notistack-MuiContent-error": {
    fontFamily: "jaapokkiRegular",
    fontSize: "1.2em",
  },
}));

export default customStyledMessage;
