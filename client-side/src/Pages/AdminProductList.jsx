import { useEffect, useState, useContext } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";
import { fetchAll, deleteProd } from "../services/adminProduct";
import "../CSS/Admin.css";
export default function AdminProductList() {
  const { user } = useContext(AuthContext);
  const nav = useNavigate();
  const [data, setData] = useState(null);

  useEffect(() => {
    if (user) fetchAll().then(setData);
  }, [user]);

  if (!user) return <Navigate to="/login" replace />;
  if (data === null) return <p>Loading…</p>;

  const onDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await deleteProd(id);
      setData((d) => d.filter((p) => p.product_id !== id));
    } catch (e) {
      alert(e.response?.data?.message || "Delete failed");
    }
  };

  return (
    <div className="admin-list">
      <div className="top-a">
        <p>ADMIN</p>
        <div></div>
        <div></div>
      </div>
      <button className="add" onClick={() => nav("/admin/product/new")}>Add New</button>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Type</th>
            <th>Status</th>
            <th />
          </tr>
        </thead>
        <tbody>
          {data.map((p) => (
            <tr key={p._id}>
              <td>{p.product_id}</td>
              <td>{p.product_name}</td>
              <td>{p.product_type}</td>
              <td>{p.product_status}</td>
              <td>
                <button onClick={() => nav(`/admin/product/${p.product_slug}`)}>
                  Edit
                </button>
                <button onClick={() => onDelete(p.product_id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
