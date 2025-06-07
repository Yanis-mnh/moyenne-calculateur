import { useEffect, useRef, useState } from "react";
import "./App.css";
import ModuleModel from "./class/ModuleModel";
import Modules from "./components/Modules";
import Sidebar from "./components/Sidebar";
import { ModuleContext } from "./contexts/ModuleContext";
import { Toaster } from "react-hot-toast";
import { Toast } from "./components/Toast";

function App() {
  const [modules, setModule] = useState<ModuleModel[]>([]);
  const [nbrMod, setNbrMod] = useState(0);
  const isFirstSave = useRef(true);
  useEffect(() => {
    const userModule = localStorage.getItem("userModule");
    if (userModule != null) {
      try {
        const parsedMod = JSON.parse(userModule);
        const mdl = parsedMod.map((obj: any) => {
          return new ModuleModel(
            obj.nom,
            obj.coef,
            obj.td,
            obj.tp,
            obj.examen,
            obj.tdChecked ?? false,
            obj.tpChecked ?? false,
            obj.examChecked ?? false,
            obj.coefGlobal ?? 1,
            obj.average ?? null
          );
        });

        setNbrMod(mdl.length);
        setModule(mdl);
        console.log(parsedMod);

        Toast({ text: "Modules loaded succesfuly ", type: "success" });
      } catch {
        Toast({
          text: "ooh noo there was an ERROR in loading the module",
          type: "error",
        });
      }
    }
  }, []);
  useEffect(() => {
    if (isFirstSave.current) {
      isFirstSave.current = false;
      return;
    }
    try {
      localStorage.setItem("userModule", JSON.stringify(modules));
    } catch {
      Toast({ text: "ERROR IN SAVING ", type: "error" });
    }
  }, [modules]);
  return (
    <ModuleContext.Provider value={{ modules, setModule, nbrMod, setNbrMod }}>
      <Toaster />
      <Sidebar />
      <Modules></Modules>
    </ModuleContext.Provider>
  );
}

export default App;
