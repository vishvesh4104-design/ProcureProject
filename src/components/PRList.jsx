import { useEffect, useState } from "react";
import api from "../api";

function PRList() {
  const [prs, setPrs] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchPRs = () => {
    api.get("pr/")
      .then(res => {
        setPrs(res.data);
      })
      .catch(err => {
        console.error("Fetch PRs error:", err);
      });
  };

  useEffect(() => {
    fetchPRs();
  }, []);

  const approvePR = (id) => {
    setLoading(true);

    api.patch(`pr/${id}/approve/`)
      .then(() => {
        alert("PR Approved");
        fetchPRs(); // refresh list
      })
      .catch(err => {
        console.error("Approve error:", err);
        alert("Error approving PR");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
  <div className="min-h-screen bg-slate-50 p-8">
    <div className="max-w-6xl mx-auto">

      <h1 className="text-3xl font-bold text-slate-800 mb-8">
        Purchase Requests
      </h1>

      {prs.length === 0 ? (
        <div className="bg-white p-6 rounded-xl shadow text-center text-slate-500">
          No Purchase Requests found.
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg border border-slate-100 overflow-hidden">

          <div className="px-6 py-4 border-b border-slate-100">
            <h2 className="text-lg font-semibold text-slate-700">
              All Requests
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left">

              <thead className="bg-slate-50 text-slate-600 uppercase text-xs tracking-wider">
                <tr>
                  <th className="px-6 py-3">ID</th>
                  <th className="px-6 py-3">Department</th>
                  <th className="px-6 py-3">Status</th>
                  <th className="px-6 py-3">Total Cost</th>
                  <th className="px-6 py-3 text-right">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100">
                {prs.map((pr) => (
                  <tr
                    key={pr.id}
                    className="hover:bg-slate-50 transition duration-150"
                  >
                    <td className="px-6 py-4 font-medium text-slate-800">
                      #{pr.id}
                    </td>

                    <td className="px-6 py-4 text-slate-600">
                      {pr.department}
                    </td>

                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 text-xs font-semibold rounded-full ${
                          pr.status === "APPROVED"
                            ? "bg-emerald-100 text-emerald-700"
                            : "bg-amber-100 text-amber-700"
                        }`}
                      >
                        {pr.status}
                      </span>
                    </td>

                    <td className="px-6 py-4 font-medium text-slate-700">
                      ₹ {pr.total_estimated_cost}
                    </td>

                    <td className="px-6 py-4 text-right">
                      {pr.status === "PENDING" ? (
                        <button
                          onClick={() => approvePR(pr.id)}
                          disabled={loading}
                          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition"
                        >
                          Approve
                        </button>
                      ) : (
                        <span className="text-slate-400">-</span>
                      )}
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

export default PRList;
