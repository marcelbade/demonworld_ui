import { createContext } from "react";

const CardCreationContext = createContext();
const CardCreationProvider = CardCreationContext.Provider;

export { CardCreationContext };
export default CardCreationProvider;
