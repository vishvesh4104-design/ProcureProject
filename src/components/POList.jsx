import { useEffect, useState } from "react";
import api from "../api";

function POList() {
  const [pos, setPOs] = useState([]);

  useEffect(() => {
  api.get("po/")
    .then((res) => {
      console.log("PO RESPONSE FULL:", JSON.stringify(res.data, null, 2));
   // 👈 ADD THIS
      setPOs(res.data);
    })
    .catch((err) => {
      console.error("Error fetching POs:", err);
    });
}, []);
    console.log("Current POS state:", pos); 

  return (
  <div className="min-h-screen bg-slate-50 p-8">
    <div className="max-w-6xl mx-auto">

      <h1 className="text-3xl font-bold text-slate-800 mb-8">
        Purchase Orders
      </h1>

      {pos.length === 0 ? (
        <div className="bg-white p-6 rounded-xl shadow text-center text-slate-500">
          No Purchase Orders found.
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">

          <div className="px-6 py-4 border-b border-slate-100">
            <h2 className="text-lg font-semibold text-slate-700">
              All Orders
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">

              <thead className="bg-slate-50 text-slate-600 uppercase text-xs tracking-wider">
                <tr>
                  <th className="px-6 py-3">PO ID</th>
                  <th className="px-6 py-3">PR ID</th>
                  <th className="px-6 py-3">Supplier</th>
                  <th className="px-6 py-3">Final Cost</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {pos.map((po) => (
                  <tr
                    key={po.id}
                    className="hover:bg-slate-50 transition duration-150"
                  >
                    <td className="px-6 py-4 font-medium text-slate-800">
                      #{po.id}
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      #{po.purchase_request}
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {po.supplier_name || "N/A"}
                    </td>

                    <td className="px-6 py-4 font-medium text-slate-700">
                      ₹ {po.final_cost}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          po.status === "COMPLETED"
                            ? "bg-emerald-100 text-emerald-700"
                            : po.status === "CANCELLED"
                            ? "bg-red-100 text-red-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {po.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>

            </table>
          </div>
        </div>
      )}
    </div>
  </div>
);

}

export default POList;
