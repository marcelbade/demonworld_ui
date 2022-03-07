// React
import React from "react";
// Material UI
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, ListItem } from "@material-ui/core";

// icons
import armor from "../../icons/armor.png";
import banner from "../../icons/banner.png";
import chest from "../../icons/chest.png";
import drum from "../../icons/drum.png";
import imp from "../../icons/imp.png";
import potion from "../../icons/potionIcon.svg";
import sword from "../../icons/sword.jpg";

const useStyles = makeStyles({
  gearListHeader: {
    testAlign: "right",
    color: "red",
  },
  customIcons: {
    width: "1em",
    height: "1em",
    border: "0px",
    padding: "0px", 
  },
  listItems: {
    border: "0",
    padding: "0", 
    marginLeft: "1em",
    marginRight: "1em",
  },
});

const GearList = (props) => {
  // TODO:
  /**
   *  - component gets the unit
   *  - only those buttons are rendered for which items can be selected
   *  - onClick => open a menu that only shows the filtered items
   *  -
   */

  // eslint-disable-next-line no-unused-vars
  const classes = useStyles();

  const symbols = [armor, sword, chest, banner, drum, potion, imp];

  const openItemShop = (type, faction) => {
    // stub
    console.log("OPEN ITEM SHOP");
  };

  return (
    <List
      className={classes.list}
      style={{ display: "flex", flexDirection: "row", padding: 0 }}
    >
      {symbols.map((s) => (
        <ListItem key={s} className={classes.listItems}>
          <IconButton onClick={openItemShop}>
            <img src={s} className={classes.customIcons} alt="instrument" />
          </IconButton>
        </ListItem>
      ))}
    </List>
  );
};

export default GearList;
