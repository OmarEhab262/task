import { useState } from "react";
import "./App.css";

function App() {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [values, setValues] = useState(
    Array.from({ length: 3 }, () => Array(3).fill(""))
  );

  const handleInputChange = (r, c, value) => {
    const newValues = [...values];
    newValues[r] = [...(newValues[r] || Array(cols).fill(""))]; // ضمان وجود الصف
    newValues[r][c] = value;
    setValues(newValues);
  };

  const calculateRowAverage = (r) => {
    if (!values[r] || values[r].length === 0) return "0.00"; // التحقق من وجود الصف
    const sum = values[r].reduce((acc, num) => acc + (parseFloat(num) || 0), 0);
    return (sum / cols).toFixed(2);
  };

  return (
    <div className="p-4 space-y-4 max-w-md mx-auto">
      <div className="flex space-x-2">
        <div className="flex gap-4">
          <div className="flex flex-col gap-4 items-center justify-center">
            <h2> عدد الصفوف</h2>
            <input
              type="number"
              className="border p-2 rounded w-full"
              value={rows}
              onChange={(e) => {
                const newRows = parseInt(e.target.value) || 0;
                setRows(newRows);
                setValues((prev) =>
                  Array.from({ length: newRows }, (_, r) =>
                    prev[r] ? [...prev[r]] : Array(cols).fill("")
                  )
                );
              }}
              placeholder="عدد الصفوف"
            />
          </div>
          <div className="flex flex-col gap-4 items-center justify-center">
            <h2> عدد الأعمدة</h2>
            <input
              type="number"
              className="border p-2 rounded w-full"
              value={cols}
              onChange={(e) => {
                const newCols = parseInt(e.target.value) || 0;
                setCols(newCols);
                setValues((prev) =>
                  prev.map((row) =>
                    Array.from({ length: newCols }, (_, c) => row[c] || "")
                  )
                );
              }}
              placeholder="عدد الأعمدة"
            />
          </div>
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 text-center">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-300 p-2">رقم العمود</th>
              {Array.from({ length: cols }, (_, c) => (
                <th key={c} className="border border-gray-300 p-2">
                  عمود {c + 1}
                </th>
              ))}
              <th className="border border-gray-300 p-2">متوسط الصف</th>
            </tr>
          </thead>
          <tbody>
            {Array.from({ length: rows }, (_, r) => (
              <tr key={r}>
                <td className="border border-gray-300 p-2 font-bold text-gray-600">
                  صف {r + 1}
                </td>
                {Array.from({ length: cols }, (_, c) => (
                  <td key={c} className="border border-gray-300 p-2">
                    <input
                      type="number"
                      className="w-full p-1 border rounded text-center"
                      value={values[r]?.[c] || ""}
                      onChange={(e) => handleInputChange(r, c, e.target.value)}
                    />
                  </td>
                ))}
                <td className="border border-gray-300 p-2 font-bold text-blue-600">
                  {calculateRowAverage(r)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default App;
