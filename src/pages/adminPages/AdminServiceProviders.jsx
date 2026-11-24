import { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";

import Navbar from "../../components/common/Navbar";
import {
  useGetAdminServiceProvidersQuery,
  useApproveServiceProviderMutation,
  useRejectServiceProviderMutation,
  useGetServiceCategoriesQuery,
} from "../../store/serviceProviderApi";

const AdminServiceProviders = () => {
  // Query parameters state
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [status, setStatus] = useState("");
  const [serviceCategoryId, setServiceCategoryId] = useState("");
  const [city, setCity] = useState("");
  const [sort, setSort] = useState("newest");
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearch, setActiveSearch] = useState("");

  // Rejection modal state
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [selectedProvider, setSelectedProvider] = useState(null);
  const [rejectionReason, setRejectionReason] = useState("");
  const [rejectError, setRejectError] = useState("");

  // Provider details modal state
  const [detailsModalProvider, setDetailsModalProvider] = useState(null);

  const { data: categories = [] } = useGetServiceCategoriesQuery();

  const queryParams = {
    page,
    limit,
    status: status || undefined,
    serviceCategoryId: serviceCategoryId || undefined,
    city: city.trim() || undefined,
    sort,
    q: activeSearch.trim() || undefined,
  };

  const {
    data,
    isLoading,
    isFetching,
    isError,
    error,
    refetch,
  } = useGetAdminServiceProvidersQuery(queryParams);

  const [approveProvider, { isLoading: isApproving }] =
    useApproveServiceProviderMutation();
  const [rejectProvider, { isLoading: isRejecting }] =
    useRejectServiceProviderMutation();

  const serviceProviders = data?.serviceProviders || [];
  const meta = data?.meta || { page: 1, limit: 10, totalItems: 0, totalPages: 1 };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1);
    setActiveSearch(searchQuery);
  };

  const handleResetFilters = () => {
    setSearchQuery("");
    setActiveSearch("");
    setStatus("");
    setServiceCategoryId("");
    setCity("");
    setSort("newest");
    setPage(1);
  };

  const handleApprove = async (provider) => {
    if (
      !window.confirm(
        `Approve "${provider.businessName}"? This will grant the SERVICE_PROVIDER role.`
      )
    ) {
      return;
    }

    try {
      await approveProvider(provider.id).unwrap();
      toast.success(`"${provider.businessName}" approved successfully.`);
      refetch();
    } catch (err) {
      const msg = err?.data?.message || "Failed to approve provider";
      toast.error(msg);
    }
  };

  const openRejectModal = (provider) => {
    setSelectedProvider(provider);
    setRejectionReason("");
    setRejectError("");
    setRejectModalOpen(true);
  };

  const handleConfirmReject = async () => {
    const trimmed = rejectionReason.trim();
    if (trimmed.length < 5) {
      setRejectError("Rejection reason must be at least 5 characters.");
      return;
    }
    if (trimmed.length > 500) {
      setRejectError("Rejection reason cannot exceed 500 characters.");
      return;
    }

    try {
      await rejectProvider({
        id: selectedProvider.id,
        rejectionReason: trimmed,
      }).unwrap();
      toast.info(`"${selectedProvider.businessName}" was rejected.`);
      setRejectModalOpen(false);
      setSelectedProvider(null);
      refetch();
    } catch (err) {
      const msg = err?.data?.message || "Failed to reject provider";
      toast.error(msg);
    }
  };

  return (
    <div>
      <Navbar />

      <main className="max-w-6xl mx-auto my-8 p-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold">Admin: Service Providers</h1>
            <p className="text-sm text-gray-600">
              Manage and review Service Provider applications.
            </p>
          </div>
          <Link
            to="/admin/profile"
            className="text-sm text-primary hover:underline"
          >
            Back to Admin Profile
          </Link>
        </div>

        {/* Filters Form */}
        <section className="p-4 border rounded-lg bg-white mb-6 space-y-3">
          <form onSubmit={handleSearchSubmit} className="flex gap-2">
            <input
              type="text"
              placeholder="Search by business name..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 p-2 border rounded text-sm"
            />
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded text-sm"
            >
              Search
            </button>
            <button
              type="button"
              onClick={handleResetFilters}
              className="border px-4 py-2 rounded text-sm hover:bg-gray-100"
            >
              Reset
            </button>
          </form>

          <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-sm">
            <div>
              <label htmlFor="filterStatus" className="block text-xs font-medium mb-1">
                Status
              </label>
              <select
                id="filterStatus"
                value={status}
                onChange={(e) => {
                  setStatus(e.target.value);
                  setPage(1);
                }}
                className="w-full p-2 border rounded bg-white"
              >
                <option value="">All Statuses</option>
                <option value="PENDING">PENDING</option>
                <option value="APPROVED">APPROVED</option>
                <option value="REJECTED">REJECTED</option>
              </select>
            </div>

            <div>
              <label htmlFor="filterCategory" className="block text-xs font-medium mb-1">
                Category
              </label>
              <select
                id="filterCategory"
                value={serviceCategoryId}
                onChange={(e) => {
                  setServiceCategoryId(e.target.value);
                  setPage(1);
                }}
                className="w-full p-2 border rounded bg-white"
              >
                <option value="">All Categories</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="filterCity" className="block text-xs font-medium mb-1">
                City
              </label>
              <input
                id="filterCity"
                type="text"
                placeholder="Filter city..."
                value={city}
                onChange={(e) => {
                  setCity(e.target.value);
                  setPage(1);
                }}
                className="w-full p-2 border rounded"
              />
            </div>

            <div>
              <label htmlFor="filterSort" className="block text-xs font-medium mb-1">
                Sort
              </label>
              <select
                id="filterSort"
                value={sort}
                onChange={(e) => {
                  setSort(e.target.value);
                  setPage(1);
                }}
                className="w-full p-2 border rounded bg-white"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
            </div>
          </div>
        </section>

        {/* Status / Loading / Error states */}
        {(isLoading || isFetching) && <p className="mb-4">Loading providers...</p>}

        {!isLoading && isError && (
          <div className="p-4 bg-red-50 border border-red-200 rounded text-red-700 text-sm mb-4">
            <p>Error loading providers: {error?.data?.message || "Unknown error"}</p>
            <button
              onClick={() => refetch()}
              className="mt-2 text-xs border px-2 py-1 rounded bg-white"
            >
              Retry
            </button>
          </div>
        )}

        {!isLoading && !isError && serviceProviders.length === 0 && (
          <div className="p-8 border rounded-lg bg-white text-center text-gray-500">
            No service providers found.
          </div>
        )}

        {/* Data Table */}
        {!isLoading && !isError && serviceProviders.length > 0 && (
          <div className="border rounded-lg bg-white overflow-x-auto mb-4">
            <table className="w-full text-left text-sm">
              <thead className="border-b bg-gray-50 text-xs font-semibold uppercase text-gray-600">
                <tr>
                  <th className="p-3">Business</th>
                  <th className="p-3">Category</th>
                  <th className="p-3">City</th>
                  <th className="p-3">Phone</th>
                  <th className="p-3">Status</th>
                  <th className="p-3">Date</th>
                  <th className="p-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {serviceProviders.map((sp) => (
                  <tr key={sp.id} className="hover:bg-gray-50">
                    <td className="p-3 font-medium">{sp.businessName}</td>
                    <td className="p-3">{sp.category?.name || "N/A"}</td>
                    <td className="p-3">{sp.city}</td>
                    <td className="p-3">{sp.phone}</td>
                    <td className="p-3">
                      <span
                        className={`font-semibold text-xs ${
                          sp.status === "APPROVED"
                            ? "text-green-700"
                            : sp.status === "REJECTED"
                            ? "text-red-700"
                            : "text-amber-700"
                        }`}
                      >
                        {sp.status}
                      </span>
                      {sp.status === "REJECTED" && sp.rejectionReason && (
                        <p className="text-xs text-red-600 truncate max-w-xs">
                          {sp.rejectionReason}
                        </p>
                      )}
                    </td>
                    <td className="p-3 text-xs text-gray-500">
                      {sp.createdAt
                        ? new Date(sp.createdAt).toLocaleDateString()
                        : "—"}
                    </td>
                    <td className="p-3 text-right space-x-2">
                      <button
                        type="button"
                        onClick={() => setDetailsModalProvider(sp)}
                        className="text-xs border px-2 py-1 rounded hover:bg-gray-100"
                      >
                        Details
                      </button>

                      {sp.status === "PENDING" && (
                        <>
                          <button
                            type="button"
                            disabled={isApproving}
                            onClick={() => handleApprove(sp)}
                            className="text-xs bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 disabled:opacity-50"
                          >
                            Approve
                          </button>
                          <button
                            type="button"
                            disabled={isRejecting}
                            onClick={() => openRejectModal(sp)}
                            className="text-xs bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700 disabled:opacity-50"
                          >
                            Reject
                          </button>
                        </>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination Controls */}
            <div className="p-3 border-t flex justify-between items-center text-xs text-gray-600">
              <div className="flex items-center gap-2">
                <span>Show</span>
                <select
                  value={limit}
                  onChange={(e) => {
                    setLimit(Number(e.target.value));
                    setPage(1);
                  }}
                  className="border rounded p-1"
                >
                  <option value={5}>5</option>
                  <option value={10}>10</option>
                  <option value={20}>20</option>
                  <option value={50}>50</option>
                </select>
                <span>Total: {meta.totalItems}</span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  disabled={page <= 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="border px-2 py-1 rounded disabled:opacity-50"
                >
                  Prev
                </button>
                <span>
                  Page {meta.page} of {meta.totalPages || 1}
                </span>
                <button
                  type="button"
                  disabled={page >= meta.totalPages}
                  onClick={() => setPage((p) => p + 1)}
                  className="border px-2 py-1 rounded disabled:opacity-50"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Reject Dialog Modal */}
        {rejectModalOpen && selectedProvider && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-md w-full border space-y-4">
              <h2 className="text-lg font-bold text-red-600">
                Reject Application: {selectedProvider.businessName}
              </h2>
              <p className="text-sm text-gray-600">
                Provide a reason for rejection (5 to 500 characters).
              </p>
              <div>
                <textarea
                  rows={4}
                  value={rejectionReason}
                  onChange={(e) => {
                    setRejectionReason(e.target.value);
                    if (rejectError) setRejectError("");
                  }}
                  placeholder="Enter rejection reason..."
                  className="w-full p-2 border rounded text-sm"
                />
                {rejectError && (
                  <p className="text-red-500 text-xs mt-1">{rejectError}</p>
                )}
              </div>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setRejectModalOpen(false)}
                  className="border px-3 py-1.5 rounded text-sm hover:bg-gray-100"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  disabled={isRejecting}
                  onClick={handleConfirmReject}
                  className="bg-red-600 text-white px-4 py-1.5 rounded text-sm font-medium disabled:opacity-50"
                >
                  {isRejecting ? "Rejecting..." : "Confirm Reject"}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Details Dialog Modal */}
        {detailsModalProvider && (
          <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg p-6 max-w-lg w-full border space-y-3 max-h-[85vh] overflow-y-auto">
              <div className="flex justify-between items-start">
                <h2 className="text-lg font-bold">
                  {detailsModalProvider.businessName}
                </h2>
                <button
                  type="button"
                  onClick={() => setDetailsModalProvider(null)}
                  className="text-gray-500 hover:text-black font-bold"
                >
                  ✕
                </button>
              </div>

              <div className="text-sm space-y-2">
                <p>
                  <span className="font-semibold">Status: </span>
                  {detailsModalProvider.status}
                </p>
                {detailsModalProvider.rejectionReason && (
                  <p className="text-red-600">
                    <span className="font-semibold">Rejection Reason: </span>
                    {detailsModalProvider.rejectionReason}
                  </p>
                )}
                <p>
                  <span className="font-semibold">Category: </span>
                  {detailsModalProvider.category?.name || "N/A"}
                </p>
                <p>
                  <span className="font-semibold">Phone: </span>
                  {detailsModalProvider.phone}
                </p>
                <p>
                  <span className="font-semibold">City: </span>
                  {detailsModalProvider.city}
                </p>
                {detailsModalProvider.areasServed?.length > 0 && (
                  <p>
                    <span className="font-semibold">Areas Served: </span>
                    {detailsModalProvider.areasServed.join(", ")}
                  </p>
                )}
                {detailsModalProvider.eventTypesServed?.length > 0 && (
                  <p>
                    <span className="font-semibold">Event Types: </span>
                    {detailsModalProvider.eventTypesServed
                      .map((et) => et.name)
                      .join(", ")}
                  </p>
                )}
                {detailsModalProvider.description && (
                  <div>
                    <span className="font-semibold">Description:</span>
                    <p className="text-gray-700 whitespace-pre-line mt-1 bg-gray-50 p-2 rounded text-xs">
                      {detailsModalProvider.description}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex justify-end pt-2">
                <button
                  type="button"
                  onClick={() => setDetailsModalProvider(null)}
                  className="border px-4 py-1.5 rounded text-sm hover:bg-gray-100"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default AdminServiceProviders;
