import { createContext } from "react";

const ColorContext = createContext();
const ColorProvider = ColorContext.Provider;

export { ColorContext };
export default ColorProvider;
