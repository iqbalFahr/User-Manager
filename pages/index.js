import { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { addUser, fetchUsers, setPage } from "../store/usersSlice";

export default function AddUserPage() {
  const dispatch = useDispatch();
  const { list = [], total, limit, page } = useSelector((state) => state.users);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [department, setDepartment] = useState("");
  const [role, setRole] = useState("");
  const [zone, setZone] = useState("");
  const [loading, setLoading] = useState(false); // loading untuk form submit
  const [loadingList, setLoadingList] = useState(true); // loading untuk daftar user
  const [newUserIds, setNewUserIds] = useState([]);

  // search & sort
  const [searchTerm, setSearchTerm] = useState("");
  const [sortAZ, setSortAZ] = useState(false);

  // fetch users when page changes
  useEffect(() => {
    setLoadingList(true);
    dispatch(fetchUsers({ page, limit })).finally(() => {
      setTimeout(() => setLoadingList(false), 800); // delay untuk efek skeleton
    });
  }, [dispatch, page, limit]);

  const isEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
  const isPhone = (v) => /^\+?[1-9]\d{7,14}$/.test(v);

  const checkIdentifier = async () => {
    setLoading(true);
    try {
      let res;
      if (isEmail(email)) {
        res = await fetch(
          `/api/validate/email?email=${encodeURIComponent(email)}`
        );
      } else if (isPhone(phone)) {
        res = await fetch(
          `/api/validate/phone?phone=${encodeURIComponent(phone)}`
        );
      } else {
        toast.error("Invalid email or phone format");
        return false;
      }
      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
        return false;
      }
      return true;
    } catch (err) {
      toast.error(err.message);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValidRemote = await checkIdentifier();
    if (isValidRemote) {
      const newUser = {
        id: Date.now(),
        firstName,
        lastName,
        email,
        phone,
        department,
        role,
        zone,
        isNew: true,
      };
      dispatch(addUser(newUser));
      setNewUserIds((prev) => [...prev, newUser.id]);
      toast.success("User added successfully!");

      setFirstName("");
      setLastName("");
      setEmail("");
      setPhone("");
      setDepartment("");
      setRole("");
      setZone("");

      setTimeout(() => {
        setNewUserIds((prev) => prev.filter((id) => id !== newUser.id));
      }, 5000);
    }
  };

  // Filtering & Sorting
  let filteredUsers = (list || []).filter((u) => {
    const fullName = `${u.firstName} ${u.lastName}`.toLowerCase();
    return (
      fullName.includes(searchTerm.toLowerCase()) ||
      (u.email || "").toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  if (sortAZ) {
    filteredUsers = [...filteredUsers].sort((a, b) =>
      a.firstName.localeCompare(b.firstName)
    );
  }

  const totalPages = Math.ceil(total / limit);

  // Skeleton Loader untuk Web
  const TableSkeleton = () => (
    <div className="hidden md:block">
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border-b p-2 text-left">Name</th>
            <th className="border-b p-2 text-left">Email</th>
            <th className="border-b p-2 text-left">Phone</th>
            <th className="border-b p-2 text-left">Dept</th>
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 5 }).map((_, i) => (
            <tr key={i}>
              {Array.from({ length: 4 }).map((_, j) => (
                <td key={j} className="p-2">
                  <div className="h-4 bg-gray-300 rounded animate-pulse"></div>
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );

  // Skeleton Loader untuk Mobile
  const CardSkeleton = () => (
    <div className="block md:hidden space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="bg-white shadow rounded-lg p-3 border border-gray-200 space-y-2 animate-pulse"
        >
          <div className="h-4 bg-gray-300 rounded w-1/3"></div>
          <div className="h-3 bg-gray-200 rounded w-2/3"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/4"></div>
        </div>
      ))}
    </div>
  );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-[#1e3c72] via-[#2a5298] to-[#004e92] p-5">
      <div
        className={`${
          list.length > 0 ? "w-full" : "w-[50%]"
        } bg-white/90 rounded-lg shadow-lg p-6 flex flex-col lg:flex-row gap-6`}
      >
        {/* Form */}
        <div className="flex-1">
          <h2 className="text-2xl font-bold text-center mb-4">Add User</h2>
          <form onSubmit={handleSubmit} className="space-y-3">
            {/* First & Last Name */}
            <div className="flex gap-3 flex-col sm:flex-row">
              <input
                type="text"
                placeholder="First Name"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              />
              <input
                type="text"
                placeholder="Last Name"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              />
            </div>

            {/* Email & Phone */}
            <div className="flex gap-3 flex-col sm:flex-row">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              />
              <input
                type="text"
                placeholder="Phone"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
              />
            </div>

            {/* Department */}
            <input
              type="text"
              placeholder="Department"
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />

            {/* Role */}
            <input
              type="text"
              placeholder="Role"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />

            {/* Zone */}
            <input
              type="text"
              placeholder="Zone"
              value={zone}
              onChange={(e) => setZone(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
            />

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-2 rounded font-semibold"
            >
              {loading ? "Validating..." : "Tambah User"}
            </button>
          </form>
        </div>

        {/* Current List */}
        {list.length > 0 && (
          <div className="flex-1 bg-gray-50 p-4 rounded-lg">
            {/* Search & Sort */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-3 gap-2">
              <input
                type="text"
                placeholder="Search user..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded px-3 py-1 text-sm w-full sm:w-2/3"
              />
              <button
                onClick={() => setSortAZ((prev) => !prev)}
                className="bg-blue-500 text-white px-3 py-1 rounded text-sm w-full sm:w-auto"
              >
                Sort {sortAZ ? "Z-A" : "A-Z"}
              </button>
            </div>

            <h2 className="text-xl font-bold mb-3">Daftar Users</h2>

            {/* Loading Skeleton */}
            {loadingList ? (
              <>
                <TableSkeleton />
                <CardSkeleton />
              </>
            ) : (
              <>
                {/* Desktop Table */}
                <div className="hidden md:block overflow-x-auto">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="border-b p-2 text-left">Name</th>
                        <th className="border-b p-2 text-left">Email</th>
                        <th className="border-b p-2 text-left">Phone</th>
                        <th className="border-b p-2 text-left">Dept</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map((u) => (
                        <tr key={u.id}>
                          <td className="p-2">
                            {u.firstName} {u.lastName}{" "}
                            {newUserIds.includes(u.id) && (
                              <span className="bg-green-500 text-white px-2 py-0.5 rounded text-xs ml-1">
                                New
                              </span>
                            )}
                          </td>
                          <td className="p-2">{u.email || "—"}</td>
                          <td className="p-2">{u.phone || "—"}</td>
                          <td className="p-2">{u.department || "—"}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Card View */}
                <div className="block md:hidden space-y-3">
                  {filteredUsers.map((u) => (
                    <div
                      key={u.id}
                      className="bg-white shadow rounded-lg p-3 border border-gray-200"
                    >
                      <div className="flex justify-between">
                        <span className="font-semibold">
                          {u.firstName} {u.lastName}
                        </span>
                        {newUserIds.includes(u.id) && (
                          <span className="bg-green-500 text-white px-2 py-0.5 rounded text-xs">
                            New
                          </span>
                        )}
                      </div>
                      <div className="text-sm text-gray-600">
                        {u.email || "—"}
                      </div>
                      <div className="text-sm text-gray-600">
                        {u.phone || "—"}
                      </div>
                      <div className="text-sm text-gray-600">
                        Dept: {u.department || "—"}
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Pagination */}
            {!loadingList && (
              <div className="mt-4 w-full overflow-x-auto">
                <div className="flex justify-center gap-2 flex-wrap">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (p) => (
                      <button
                        key={p}
                        onClick={() => dispatch(setPage(p))}
                        className={`px-3 py-1 border rounded-md ${
                          p === page
                            ? "bg-blue-500 text-white border-blue-500"
                            : "bg-white border-gray-300"
                        }`}
                      >
                        {p}
                      </button>
                    )
                  )}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar
        newestOnTop
        closeOnClick
        draggable
        pauseOnHover
      />
    </div>
  );
}
