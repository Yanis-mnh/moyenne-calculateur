import { createContext } from "react";
import type ModuleModel from "../class/ModuleModel";

type moduleType = {
  modules: ModuleModel[];
  setModule: React.Dispatch<React.SetStateAction<ModuleModel[]>>;
};

export const ModuleContext = createContext<moduleType | null>(null);
