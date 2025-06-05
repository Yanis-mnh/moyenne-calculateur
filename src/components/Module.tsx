import { useState, useEffect, useRef } from "react";
import ModuleModel from "../class/ModuleModel";

interface Props {
  name?: string;
  tdChecked?: boolean;
  coefTd?: number;
  tpChecked?: boolean;
  coefTp?: number;
  examenChecked?: boolean;
  coefExamen?: number;
  coefGlobal?: number;
  examNoteProp?: number;

  onChange: (moduleModel: ModuleModel) => void;
}

const Module: React.FC<Props> = (props) => {
  const { onChange } = props;

  // moduleModel pour chaque module (contien les infor)
  const moduleModel = useRef(new ModuleModel()).current;

  //init local state with props
  const [name, setName] = useState<string>(props.name || "");
  const [coefGlobal, setCoefGlobal] = useState<number>(props.coefGlobal ?? 1);

  const [tdChecked, setTdChecked] = useState<boolean>(props.tdChecked ?? false);
  const [tdCoef, setTdCoef] = useState<number>(props.coefTd ?? 1);
  const [tdNote, setTdNote] = useState<number | null>(null);

  const [tpChecked, setTpChecked] = useState<boolean>(props.tpChecked ?? false);
  const [tpCoef, setTpCoef] = useState<number>(props.coefTp ?? 1);
  const [tpNote, setTpNote] = useState<number | null>(null);

  const [examChecked, setExamChecked] = useState<boolean>(
    props.examenChecked ?? false
  );
  const [examCoef, setExamCoef] = useState<number>(props.coefExamen ?? 1);
  const [examNote, setExamNote] = useState<number | null>(
    props.examNoteProp ?? null
  );

  const [average, setAverage] = useState<number | null>(null);

  //sync local change quand local state change :)
  useEffect(() => {
    setName(props.name || "");
  }, [props.name]);

  useEffect(() => {
    setCoefGlobal(props.coefGlobal ?? 1);
  }, [props.coefGlobal]);

  useEffect(() => {
    setTdChecked(props.tdChecked ?? false);
  }, [props.tdChecked]);

  useEffect(() => {
    setTdCoef(props.coefTd ?? 1);
  }, [props.coefTd]);

  useEffect(() => {
    setTpChecked(props.tpChecked ?? false);
  }, [props.tpChecked]);

  useEffect(() => {
    setTpCoef(props.coefTp ?? 1);
  }, [props.coefTp]);

  useEffect(() => {
    setExamChecked(props.examenChecked ?? false);
  }, [props.examenChecked]);

  useEffect(() => {
    setExamCoef(props.coefExamen ?? 1);
  }, [props.coefExamen]);

  useEffect(() => {
    setExamNote(props.examNoteProp ?? null);
  }, [props.examNoteProp]);

  useEffect(() => {
    // Update ModuleModel from local state:
    moduleModel.setNom(name);
    moduleModel.setCoefGlobal(coefGlobal);

    moduleModel.setTdChecked(tdChecked);
    moduleModel.setTd({ coef: tdCoef, note: tdNote ?? 0 });

    moduleModel.setTpChecked(tpChecked);
    moduleModel.setTp({ coef: tpCoef, note: tpNote ?? 0 });

    moduleModel.setExamChecked(examChecked);
    moduleModel.setExamen({ coef: examCoef, note: examNote ?? 0 });

    // calcile de avr
    let totalCoef = 0;
    let weightedSum = 0;
    if (tdChecked && tdNote !== null) {
      totalCoef += tdCoef;
      weightedSum += tdNote * tdCoef;
    }
    if (tpChecked && tpNote !== null) {
      totalCoef += tpCoef;
      weightedSum += tpNote * tpCoef;
    }
    if (examChecked && examNote !== null) {
      totalCoef += examCoef;
      weightedSum += examNote * examCoef;
    }

    const avg = totalCoef > 0 ? weightedSum / totalCoef : null;
    setAverage(avg);
    moduleModel.setAverage(avg);

    // tell the parent comp que ce module a changer
    onChange(moduleModel);
  }, [
    name,
    coefGlobal,
    tdChecked,
    tdCoef,
    tdNote,
    tpChecked,
    tpCoef,
    tpNote,
    examChecked,
    examCoef,
    examNote,
  ]);

  //render module
  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-2xl space-y-4 mb-6">
      {/* Module Name */}
      <input
        type="text"
        placeholder="Nom Module"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      {/* Coef Global */}
      <div>
        <input
          type="number"
          placeholder="Coef Module"
          value={coefGlobal}
          onChange={(e) => setCoefGlobal(parseFloat(e.target.value) || 0)}
          className="w-40 px-2 py-1 border rounded-md"
        />
      </div>

      {/* TD */}
      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={tdChecked}
            onChange={(e) => {
              const checked = e.target.checked;
              setTdChecked(checked);
              moduleModel.setTdChecked(checked);
            }}
            className="h-4 w-4 accent-blue-500"
          />
          <span className="text-gray-700">TD</span>
        </label>
        {tdChecked && (
          <>
            <input
              type="number"
              placeholder="Note TD"
              value={tdNote ?? ""}
              onChange={(e) => setTdNote(parseFloat(e.target.value) || null)}
              className="w-24 px-2 py-1 border rounded-md"
            />
            <input
              type="number"
              placeholder="% Coef"
              value={tdCoef}
              onChange={(e) => setTdCoef(parseFloat(e.target.value) || 0)}
              className="w-24 px-2 py-1 border rounded-md"
            />
          </>
        )}
      </div>

      {/* TP */}
      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={tpChecked}
            onChange={(e) => {
              const checked = e.target.checked;
              setTpChecked(checked);
              moduleModel.setTpChecked(checked);
            }}
            className="h-4 w-4 accent-blue-500"
          />
          <span className="text-gray-700">TP</span>
        </label>
        {tpChecked && (
          <>
            <input
              type="number"
              placeholder="Note TP"
              value={tpNote ?? ""}
              onChange={(e) => setTpNote(parseFloat(e.target.value) || null)}
              className="w-24 px-2 py-1 border rounded-md"
            />
            <input
              type="number"
              placeholder="% Coef"
              value={tpCoef}
              onChange={(e) => setTpCoef(parseFloat(e.target.value) || 0)}
              className="w-24 px-2 py-1 border rounded-md"
            />
          </>
        )}
      </div>

      {/* Examen */}
      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={examChecked}
            onChange={(e) => {
              const checked = e.target.checked;
              setExamChecked(checked);
              moduleModel.setExamChecked(checked);
            }}
            className="h-4 w-4 accent-blue-500"
          />
          <span className="text-gray-700">Examen</span>
        </label>
        {examChecked && (
          <>
            <input
              type="number"
              placeholder="Note Examen"
              value={examNote ?? ""}
              onChange={(e) => setExamNote(parseFloat(e.target.value) || null)}
              className="w-24 px-2 py-1 border rounded-md"
            />
            <input
              type="number"
              placeholder="% Coef"
              value={examCoef}
              onChange={(e) => setExamCoef(parseFloat(e.target.value) || 0)}
              className="w-24 px-2 py-1 border rounded-md"
            />
          </>
        )}
      </div>

      {/* Moyenne */}
      <div className="text-center mt-4">
        <p className="text-lg font-bold text-blue-700">
          Moyenne du module : {average !== null ? average.toFixed(2) : "--"}
        </p>
      </div>
    </div>
  );
};

export default Module;
