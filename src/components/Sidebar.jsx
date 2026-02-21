import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <div className="w-64 bg-gray-900 text-white flex flex-col p-6">
      <h1 className="text-2xl font-bold mb-10">ProcurePro</h1>

      <nav className="flex flex-col space-y-4">
        <Link
          to="/dashboard"
          className="hover:bg-gray-700 px-4 py-2 rounded-lg transition"
        >
          📊 Dashboard
        </Link>

        <Link
          to="/pr"
          className="hover:bg-gray-700 px-4 py-2 rounded-lg transition"
        >
          📦 Purchase Requests
        </Link>

        <Link
          to="/po"
          className="hover:bg-gray-700 px-4 py-2 rounded-lg transition"
        >
          📑 Purchase Orders
        </Link>

        <button
          onClick={handleLogout}
          className="mt-6 bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg transition"
        >
          🚪 Logout
        </button>
      </nav>
    </div>
  );
}

export default Sidebar;