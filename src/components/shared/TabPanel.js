


const TabPanel = (props) => {
  return props.tabValue === props.panelNr ? props.content : null;
};

export default TabPanel;
