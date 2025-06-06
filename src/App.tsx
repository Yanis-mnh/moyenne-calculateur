import { useState } from "react";
import "./App.css";
import type ModuleModel from "./class/ModuleModel";
import Modules from "./components/Modules";
import Sidebar from "./components/Sidebar";
import { ModuleContext } from "./contexts/ModuleContext";
import { Toaster } from "react-hot-toast";

function App() {
  const [modules, setModule] = useState<ModuleModel[]>([]);
  const [nbrMod, setNbrMod] = useState(0);

  return (
    <ModuleContext.Provider value={{ modules, setModule, nbrMod, setNbrMod }}>
      <Toaster />
      <Sidebar />
      <Modules></Modules>
    </ModuleContext.Provider>
  );
}

export default App;
