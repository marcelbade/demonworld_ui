import React from "react";

const ItemShopPanel = (props) => {
  const { children, value, index } = props;
  return <div>{value === index && <h1>{children}</h1>}</div>;
};

export default ItemShopPanel;
