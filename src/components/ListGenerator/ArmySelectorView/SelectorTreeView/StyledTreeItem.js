import TreeItem from "@material-ui/lab/TreeItem";
import { fade, withStyles } from "@material-ui/core/styles";
import { TransitionComponent } from "./treeViewFunctions";

export const StyledTreeItem = withStyles((theme) => ({
  // CSS for icons that expend/collapse the treeview ("+/-")
  label: {
    fontWeight: "bold",
  },

  iconContainer: {
    "& .close": {
      opacity: 0.3,
    },
  },
  group: {
    borderLeft: `1px dashed ${fade(theme.palette.text.primary, 0.4)}`,
  },
}))((props) => <TreeItem {...props} TransitionComponent={TransitionComponent} />);
