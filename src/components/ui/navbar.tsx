import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/AuthContext";

export const Navbar = () => {
  const { user, logout, loading } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/auth");
  };

  if (loading) return null; // ⏳ Don’t render until auth is ready

  return (
    <header className="w-full bg-white/70 backdrop-blur-md shadow-sm fixed top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <Link
          to="/"
          className="text-2xl font-bold bg-gradient-to-r from-ev-blue to-ev-green bg-clip-text text-transparent"
        >
          ElectricChargeHub
        </Link>

        <nav className="flex items-center gap-6 text-gray-700 font-medium">
          <Link to="/find-stations" className="hover:text-ev-blue">
            Find Stations
          </Link>
          <Link to="/about" className="hover:text-ev-blue">
            About
          </Link>
          <Link to="/contact" className="hover:text-ev-blue">
            Contact
          </Link>

          {user ? (
            <>
              <Link
                to="/profile"
                className="hover:text-ev-blue font-semibold text-ev-green"
              >
                Profile
              </Link>
              <Button
                onClick={handleLogout}
                variant="outline"
                className="ml-2 border-2"
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              <Link
                to="/auth?mode=login"
                className="text-gray-700 hover:text-ev-blue"
              >
                Sign in
              </Link>
              <Button
                onClick={() => navigate("/auth?mode=signup")}
                className="bg-gradient-to-r from-ev-blue to-ev-green text-white"
              >
                Sign up
              </Button>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};
