import { createContext } from "react";
import type ModuleModel from "../class/ModuleModel";

type moduleType = {
  modules: ModuleModel[];
  setModule: React.Dispatch<React.SetStateAction<ModuleModel[]>>;
  nbrMod: number;
  setNbrMod: React.Dispatch<React.SetStateAction<number>>;
};

export const ModuleContext = createContext<moduleType | null>(null);
