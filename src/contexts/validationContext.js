import { createContext } from "react";

const ValidationContext = createContext();
const ValidationProvider = ValidationContext.Provider;

export { ValidationContext };
export default ValidationProvider;
