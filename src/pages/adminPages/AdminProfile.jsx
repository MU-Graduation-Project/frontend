import Navbar from "../../components/common/Navbar";
import { Link } from "react-router-dom";

const AdminProfile = () => {
  return (
    <div>
      <Navbar />
      <div className="max-w-2xl mx-auto mt-8 p-6 bg-white rounded-2xl shadow-sm border border-gray-100">
        <h1 className="text-2xl font-bold text-secondary mb-4">Admin Dashboard</h1>
        <div className="space-y-3">
          <div>
            <Link
              to="/admin/service-providers"
              className="inline-flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-xl hover:opacity-90 transition font-medium text-sm shadow-sm"
            >
              Manage Service Providers →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminProfile;
