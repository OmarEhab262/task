import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [rows, setRows] = useState(3);
  const [cols, setCols] = useState(3);
  const [values, setValues] = useState(
    Array.from({ length: 3 }, () => Array(3).fill(""))
  );

  const handleInputChange = (r, c, value) => {
    const newValues = [...values];
    newValues[r][c] = value;
    setValues(newValues);
  };

  const calculateRowAverage = (r) => {
    const sum = values[r].reduce((acc, num) => acc + (parseFloat(num) || 0), 0);
    return (sum / cols).toFixed(2);
  };

  return (
    <div className="p-4 space-y-4 max-w-md mx-auto">
      <div className="flex space-x-2">
        <input
          type="number"
          className="border p-2 rounded w-full"
          value={rows}
          onChange={(e) => setRows(parseInt(e.target.value) || 0)}
          placeholder="عدد الصفوف"
        />
        <input
          type="number"
          className="border p-2 rounded w-full"
          value={cols}
          onChange={(e) => setCols(parseInt(e.target.value) || 0)}
          placeholder="عدد الأعمدة"
        />
      </div>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border-collapse border border-gray-300 text-center">
          <thead>
            <tr className="bg-gray-200">
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
