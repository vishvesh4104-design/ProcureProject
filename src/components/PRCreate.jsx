import { useEffect, useState } from "react";
import api from "../api";

function PRCreate({ onCreated }) {
  const [department, setDepartment] = useState("");
  const [inventory, setInventory] = useState([]);
  const [itemId, setItemId] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [loading, setLoading] = useState(false);

  // Live total calculation
  const total =
    quantity && price
      ? (Number(quantity) * Number(price)).toFixed(2)
      : "0.00";

  useEffect(() => {
    api.get("inventory/items/")
      .then((res) => {
        setInventory(res.data);
      })
      .catch((err) => {
        console.error("Inventory error:", err);
      });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!department || !itemId || !quantity || !price) {
      alert("Please fill all fields");
      return;
    }

    setLoading(true);

    api.post("pr/", {
      department: department,
      items: [
        {
          item: Number(itemId),
          quantity: Number(quantity),
          estimated_price: Number(price),
        },
      ],
    })
      .then(() => {
        alert("Purchase Request Created");

        setDepartment("");
        setItemId("");
        setQuantity("");
        setPrice("");

        if (onCreated) onCreated();
      })
      .catch((err) => {
        console.error("PR create error:", err.response?.data);
        alert("Error creating Purchase Request");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="max-w-4xl mx-auto mb-12">
      <div className="bg-white p-10 rounded-2xl shadow-md border border-gray-100">

        <h2 className="text-2xl font-bold text-gray-800 mb-8">
          Create Purchase Request
        </h2>

        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Department */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Department
            </label>
            <input
              type="text"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              placeholder="Enter department name"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Item Select */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Select Item
            </label>
            <select
              value={itemId}
              onChange={(e) => setItemId(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            >
              <option value="">Select Item</option>
              {inventory.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>

          {/* Quantity */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Quantity
            </label>
            <input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              min="1"
              placeholder="Enter quantity"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Estimated Price */}
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-2">
              Estimated Price (₹)
            </label>
            <input
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              min="0"
              step="0.01"
              placeholder="Enter price per unit"
              className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-blue-500 focus:outline-none"
              required
            />
          </div>

          {/* Total Box */}
          <div className="flex justify-between items-center bg-gray-100 p-4 rounded-lg">
            <span className="text-gray-600 font-medium">
              Total Estimated Cost
            </span>
            <span className="text-lg font-bold text-gray-800">
              ₹ {total}
            </span>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition duration-300 disabled:opacity-60"
          >
            {loading ? "Creating..." : "Create Purchase Request"}
          </button>

        </form>
      </div>
    </div>
  );
}

export default PRCreate;

