import React, { useState, useEffect } from "react";
import Module from "./Module";

const Modules = () => {
  const [nbrMod, setNbrMod] = useState(0);
  const [modulesData, setModulesData] = useState<
    { average: number | null; coef: number }[]
  >([]);
  const [generalAverage, setGeneralAverage] = useState<number | null>(null);

  const handleModuleChange = (
    index: number,
    data: { average: number | null; coef: number }
  ) => {
    setModulesData((prev) => {
      const updated = [...prev];
      updated[index] = data;
      return updated;
    });
  };

  const calculateAvg = () => {
    let totalCoef = 0;
    let weightedSum = 0;

    modulesData.forEach(({ average, coef }) => {
      if (average !== null) {
        weightedSum += average * coef;
        totalCoef += coef;
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
      <input
        type="number"
        min="0"
        placeholder="Nombre de modules"
        value={nbrMod}
        onChange={(e) => setNbrMod(parseInt(e.target.value))}
        className="sticky top-0 shadow-sm w-full mb-6 px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <div className="space-y-4">
        {Array.from({ length: nbrMod }).map((_, i) => (
          <Module key={i} onChange={(data) => handleModuleChange(i, data)} />
        ))}
      </div>
      <div className="result flex items-center space-x-4 mt-4">
        <button
          onClick={calculateAvg}
          className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 active:scale-95 transition duration-200"
        >
          Calculate
        </button>
        <p className="text-gray-800 text-lg">
          Moyenne générale :{" "}
          {generalAverage !== null ? generalAverage.toFixed(2) : "--"}
        </p>
      </div>
    </div>
  );
};

export default Modules;
