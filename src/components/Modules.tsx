import { useState, useContext, useEffect } from "react";
import Module from "./Module";
import { ModuleContext } from "../contexts/ModuleContext";
import Button from "./Button";
import type ModuleModel from "../class/ModuleModel";

const Modules = () => {
  const context = useContext(ModuleContext);
  if (!context) {
    throw new Error("MODULE IS NULL");
  }
  const { modules, setModule, nbrMod, setNbrMod } = context;
  console.log(modules.length);

  const [generalAverage, setGeneralAverage] = useState<number | null>(null);
  //pour le changement de la taille (le nbr de module)
  useEffect(() => {
    setModule((prev) => {
      const updated = [...prev];
      if (nbrMod < updated.length) {
        return updated.slice(0, nbrMod);
      } else {
        return updated;
      }
    });
  }, [nbrMod]);
  const handleModuleChange = (index: number, moduleModel: ModuleModel) => {
    setModule((prev) => {
      const updated = [...prev];
      updated[index] = moduleModel;
      return updated;
    });
  };

  const calculateAvg = () => {
    let totalCoef = 0;
    let weightedSum = 0;

    modules.forEach(({ average, coefGlobal }) => {
      if (average !== null) {
        weightedSum += average * coefGlobal;
        totalCoef += coefGlobal;
      }
    });

    if (totalCoef > 0) {
      setGeneralAverage(weightedSum / totalCoef);
    } else {
      setGeneralAverage(null);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <label>
        Nombre de Modules:
        <input
          type="number"
          min="0"
          placeholder="Nombre de modules"
          value={nbrMod}
          onChange={(e) => setNbrMod(parseInt(e.target.value))}
          className="sticky top-0 shadow-sm w-full mb-6 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </label>

      {/** generatin the all modules  */}
      <div className="space-y-4">
        {Array.from({ length: nbrMod }).map((_, i) => {
          const mdl = modules[i];

          return (
            <Module
              name={mdl?.getNom()}
              tdChecked={mdl?.getTdChecked()}
              coefTd={mdl?.getTd().coef}
              noteTP={mdl?.getTp().note}
              noteTd={mdl?.getTd().note}
              noteExamen={mdl?.getExamen().note}
              tpChecked={mdl?.getTpChecked()}
              coefTp={mdl?.getTp().coef}
              examenChecked={mdl?.getExamChecked()}
              coefExamen={mdl?.getExamen().coef}
              coefGlobal={mdl?.getCoefGlobal()}
              key={i}
              onChange={(moduleModel) => handleModuleChange(i, moduleModel)}
            />
          );
        })}
      </div>
      <div className="result flex items-center space-x-4 mt-4">
        <Button onClick={calculateAvg}>Calculate</Button>
        <p className="text-gray-800 text-lg">
          Moyenne générale :{" "}
          {generalAverage !== null ? generalAverage.toFixed(2) : "--"}
        </p>
      </div>
    </div>
  );
};

export default Modules;
