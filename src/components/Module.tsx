import { useState, useEffect } from "react";

const Module = ({
  onChange,
}: {
  onChange: (data: { average: number | null; coef: number }) => void;
}) => {
  const [tdChecked, setTdChecked] = useState(false);
  const [tpChecked, setTpChecked] = useState(false);
  const [examChecked, setExamChecked] = useState(false);

  const [tdNote, setTdNote] = useState<number | null>(null);
  const [tpNote, setTpNote] = useState<number | null>(null);
  const [examNote, setExamNote] = useState<number | null>(null);

  const [tdCoef, setTdCoef] = useState<number>(1);
  const [tpCoef, setTpCoef] = useState<number>(1);
  const [examCoef, setExamCoef] = useState<number>(1);

  const [coefGlobal, setcoefGlobal] = useState<number>(1);
  const [average, setAverage] = useState<number | null>(null);

  useEffect(() => {
    let total = 0;
    let weightedSum = 0;

    if (tdChecked && tdNote !== null) {
      weightedSum += tdNote * tdCoef;
      total += tdCoef;
    }

    if (tpChecked && tpNote !== null) {
      weightedSum += tpNote * tpCoef;
      total += tpCoef;
    }

    if (examChecked && examNote !== null) {
      weightedSum += examNote * examCoef;
      total += examCoef;
    }

    const avg = total > 0 ? weightedSum / total : null;
    setAverage(avg);
    onChange({ average: avg, coef: coefGlobal });
  }, [
    tdChecked,
    tpChecked,
    examChecked,
    tdNote,
    tpNote,
    examNote,
    tdCoef,
    tpCoef,
    examCoef,
    coefGlobal,
  ]);

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-2xl space-y-4 mb-6">
      <input
        type="text"
        placeholder="Nom Module"
        className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      {/*  coef global */}
      <div>
        <input
          type="number"
          placeholder="Coef Module"
          value={coefGlobal}
          onChange={(e) => setcoefGlobal(parseFloat(e.target.value))}
          className="w-40 px-2 py-1 border rounded-md"
        />
      </div>
      {/* TD */}
      <div className="flex items-center gap-3">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={tdChecked}
            onChange={(e) => setTdChecked(e.target.checked)}
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
              onChange={(e) => setTdNote(parseFloat(e.target.value))}
              className="w-24 px-2 py-1 border rounded-md"
            />
            <input
              type="number"
              placeholder="% Coef"
              value={tdCoef}
              onChange={(e) => setTdCoef(parseFloat(e.target.value))}
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
            onChange={(e) => setTpChecked(e.target.checked)}
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
              onChange={(e) => setTpNote(parseFloat(e.target.value))}
              className="w-24 px-2 py-1 border rounded-md"
            />
            <input
              type="number"
              placeholder="% Coef"
              value={tpCoef}
              onChange={(e) => setTpCoef(parseFloat(e.target.value))}
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
            onChange={(e) => setExamChecked(e.target.checked)}
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
              onChange={(e) => setExamNote(parseFloat(e.target.value))}
              className="w-24 px-2 py-1 border rounded-md"
            />
            <input
              type="number"
              placeholder="% Coef"
              value={examCoef}
              onChange={(e) => setExamCoef(parseFloat(e.target.value))}
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
