import TreeItem from "@material-ui/lab/TreeItem";
import { fade, withStyles } from "@material-ui/core/styles";
import { TransitionComponent } from "../dependencies/treeViewFunctions";
import { colors } from "@material-ui/core";

export const StyledTreeItem = withStyles((theme) => ({



  // CSS for icons that expend/collapse the treeview ("+/-")
  label: {
    fontFamily: "NotMaryKate",
    fontWeight: "bold",
    
  },

  iconContainer: {
    "& .close": {
      opacity: 0.3,
    },
  },
  group: {
    marginLeft: 7,
    paddingLeft: 18,
    borderLeft: `1px dashed ${fade(theme.palette.text.primary, 0.4)}`,
  },
}))((props) => <TreeItem {...props} TransitionComponent={TransitionComponent} />);
