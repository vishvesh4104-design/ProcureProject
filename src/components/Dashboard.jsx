import { useEffect, useState } from "react";
import api from "../api";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

function Dashboard() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("dashboard/")
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.error("Dashboard error:", err);
      });
  }, []);

  if (!data)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 text-lg">Loading dashboard...</p>
      </div>
    );

  const chartData = {
    labels: ["Total PR", "Approved PR", "Total PO", "Delivered PO"],
    datasets: [
      {
        label: "Procurement Stats",
        data: [
          data.total_pr,
          data.approved_pr,
          data.total_po,
          data.delivered_po,
        ],
        backgroundColor: [
          "#3B82F6",
          "#10B981",
          "#8B5CF6",
          "#F59E0B",
        ],
        borderRadius: 8,
      },
    ],
  };

  return (
    <>
      <h2 className="text-3xl font-bold mb-10 text-gray-800">
        Procurement Dashboard
      </h2>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
        <StatCard title="Total PRs" value={data.total_pr} color="blue" />
        <StatCard title="Pending PRs" value={data.pending_pr} color="yellow" />
        <StatCard title="Approved PRs" value={data.approved_pr} color="green" />
        <StatCard title="Total POs" value={data.total_po} color="purple" />
        <StatCard title="Delivered POs" value={data.delivered_po} color="orange" />
        <StatCard title="Total Value" value={`₹ ${data.total_value}`} color="indigo" />
      </div>

      {/* Chart */}
      <div className="bg-white p-8 rounded-2xl shadow-md">
        <h3 className="text-xl font-semibold mb-6 text-gray-700">
          Procurement Overview
        </h3>
        <Bar data={chartData} />
      </div>
    </>
  );
}

function StatCard({ title, value, color }) {
  const colorMap = {
    blue: "bg-blue-100 text-blue-700",
    green: "bg-green-100 text-green-700",
    yellow: "bg-yellow-100 text-yellow-700",
    purple: "bg-purple-100 text-purple-700",
    orange: "bg-orange-100 text-orange-700",
    indigo: "bg-indigo-100 text-indigo-700",
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition duration-300 border border-gray-100">
      <div className="flex justify-between items-center">
        <h3 className="text-gray-500 text-sm font-medium">
          {title}
        </h3>
        <div className={`px-3 py-1 rounded-full text-xs font-semibold ${colorMap[color]}`}>
          ↑ 12%
        </div>
      </div>

      <p className="text-3xl font-bold mt-4 text-gray-800">
        {value}
      </p>
    </div>
  );
}

export default Dashboard;