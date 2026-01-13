import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <nav className="flex items-center justify-between bg-white px-4 py-3 shadow">
      <Link to="/" className="font-semibold text-lg">
        Task Manager
      </Link>
      <div className="flex items-center gap-3">
        {user && (
          <>
            <span className="text-sm text-gray-600">Hi, {user.name}</span>
            <Link
              to="/profile"
              className="rounded bg-gray-100 px-3 py-1 text-sm hover:bg-gray-200"
            >
              Profile
            </Link>
            <button
              onClick={logout}
              className="rounded bg-red-500 px-3 py-1 text-sm text-white hover:bg-red-600"
            >
              Logout
            </button>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
