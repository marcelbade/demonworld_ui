import { styled } from "@mui/material/styles";
import { MaterialDesignContent } from "notistack";

const customStyledMessage = styled(MaterialDesignContent)(() => ({
  "&.notistack-MuiContent-error": {
    fontFamily: "jaapokkiRegular",
    fontSize: "1.2em",
  },
  "&.notistack-MuiContent-info": {
    fontFamily: "jaapokkiRegular",
    fontSize: "1.2em",
    color: "black",
    whiteSpace: 'pre-line' 
  },
}));

export default customStyledMessage;
