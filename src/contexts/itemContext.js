import { createContext } from "react";

const ItemContext = createContext();
const ItemProvider = ItemContext.Provider;

export { ItemContext };
export default ItemProvider;
