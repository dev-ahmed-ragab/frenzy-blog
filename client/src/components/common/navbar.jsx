import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { useSelector, useDispatch } from "react-redux";
import toast from "react-hot-toast";
import { logout } from "../../Redux/UserSlice";
import logo from "../../assets/logo.webp";

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [openMenu, setOpenMenu] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const { token, username } = useSelector((state) => state.user);

  const closeAllMenus = () => {
    setOpenMenu(false);
    setOpenDropdown(false);
  };

  const toggleMenu = () => {
    setOpenDropdown(false);
    setOpenMenu((prev) => !prev);
  };

  const toggleDropdown = () => {
    setOpenMenu(false);
    setOpenDropdown((prev) => !prev);
  };

  const handleLogout = () => {
    dispatch(logout());
    closeAllMenus();
    toast.success("Logged out successfully");
    navigate("/");
  };

  const navlinkClassName = ({ isActive }) =>
    isActive
      ? "text-[#d681d6] font-bold transition-colors"
      : "text-gray-800 hover:text-[#d681d6] font-semibold transition-colors";

  const mobileNavlinkClassName = ({ isActive }) =>
    isActive
      ? "text-[#d681d6] font-bold w-full text-center py-2"
      : "text-white hover:text-[#d681d6] font-medium w-full text-center py-2";

  useEffect(() => {
    const handleScroll = () => closeAllMenus();
    const handleClickOutside = (event) => {
      const navbar = document.querySelector(".navbar-container");
      if (navbar && !navbar.contains(event.target)) {
        closeAllMenus();
      }
    };

    window.addEventListener("scroll", handleScroll);
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="bg-[#dde7f5] pt-6 sm:pt-10 px-4 sm:px-8 relative z-50">
      <div className="navbar-container max-w-7xl mx-auto bg-white/95 backdrop-blur-md h-20 sm:h-24 rounded-3xl flex justify-between items-center px-6 sm:px-10 shadow-xl relative border border-white/60">
        {/* Brand Logo */}
        <div
          onClick={() => {
            closeAllMenus();
            navigate("/");
          }}
          className="cursor-pointer transition-transform hover:scale-105"
        >
          <img src={logo} className="h-8 sm:h-10 object-contain" alt="Frenzy Blog Logo" />
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden lg:flex gap-8 text-sm uppercase tracking-wider items-center">
          <NavLink to="/" className={navlinkClassName}>
            Home
          </NavLink>
          <NavLink to="/posts" className={navlinkClassName}>
            Posts
          </NavLink>
          <NavLink to="/about" className={navlinkClassName}>
            About
          </NavLink>
          <NavLink to="/contact" className={navlinkClassName}>
            Contact
          </NavLink>
        </nav>

        {/* Desktop User / Auth Actions */}
        <div className="hidden lg:flex items-center gap-4">
          {!token ? (
            <div className="flex items-center gap-3">
              <NavLink
                to="/login"
                className="text-sm font-semibold text-gray-700 hover:text-black px-4 py-2 rounded-2xl transition-colors"
              >
                Sign In
              </NavLink>
              <NavLink
                to="/signup"
                className="text-sm font-semibold bg-black hover:bg-gray-800 text-white px-5 py-2.5 rounded-2xl shadow-md transition-all hover:shadow-lg"
              >
                Sign Up
              </NavLink>
            </div>
          ) : (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-gray-50 hover:bg-gray-100 border border-gray-200 transition-colors shadow-sm"
              >
                <div className="w-7 h-7 rounded-full bg-[#d681d6]/20 text-[#d681d6] flex items-center justify-center font-bold text-xs">
                  {username ? username.charAt(0).toUpperCase() : <User size={14} />}
                </div>
                <span className="font-semibold text-sm text-gray-800 max-w-[120px] truncate">
                  {username || "User"}
                </span>
                <ChevronDown size={16} className="text-gray-500" />
              </button>

              <AnimatePresence>
                {openDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.15 }}
                    className="absolute right-0 mt-3 w-52 bg-white rounded-2xl shadow-xl border border-gray-100 py-2 overflow-hidden z-50"
                  >
                    <div className="px-4 py-2 border-b border-gray-100 text-xs text-gray-400 font-semibold uppercase tracking-wider">
                      Account Menu
                    </div>
                    <NavLink
                      to="/profile"
                      onClick={closeAllMenus}
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#d681d6] transition-colors"
                    >
                      My Profile
                    </NavLink>
                    <NavLink
                      to="/my-posts"
                      onClick={closeAllMenus}
                      className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-gray-50 hover:text-[#d681d6] transition-colors"
                    >
                      My Posts
                    </NavLink>
                    <div className="border-t border-gray-100 mt-1 pt-1">
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 flex items-center gap-2 transition-colors font-medium"
                      >
                        <LogOut size={16} />
                        Logout
                      </button>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          className="lg:hidden p-2 text-gray-800 hover:text-black focus:outline-none"
          onClick={toggleMenu}
          aria-label="Toggle menu"
        >
          {openMenu ? <X size={28} /> : <Menu size={28} />}
        </button>

        {/* Mobile slide down menu */}
        <AnimatePresence>
          {openMenu && (
            <motion.div
              initial={{ opacity: 0, y: -15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.2 }}
              className="lg:hidden flex flex-col font-semibold z-50 absolute top-24 left-0 right-0 mx-4 bg-gray-900 text-white p-6 items-center gap-3 rounded-3xl shadow-2xl border border-gray-800"
            >
              <NavLink to="/" onClick={closeAllMenus} className={mobileNavlinkClassName}>
                Home
              </NavLink>
              <NavLink to="/posts" onClick={closeAllMenus} className={mobileNavlinkClassName}>
                Posts
              </NavLink>
              <NavLink to="/about" onClick={closeAllMenus} className={mobileNavlinkClassName}>
                About
              </NavLink>
              <NavLink to="/contact" onClick={closeAllMenus} className={mobileNavlinkClassName}>
                Contact
              </NavLink>

              <div className="w-full border-t border-gray-800 my-2" />

              {!token ? (
                <div className="flex flex-col w-full gap-2">
                  <NavLink
                    to="/login"
                    onClick={closeAllMenus}
                    className="w-full text-center py-2.5 rounded-xl border border-gray-700 hover:bg-gray-800 text-sm font-semibold transition-colors"
                  >
                    Sign In
                  </NavLink>
                  <NavLink
                    to="/signup"
                    onClick={closeAllMenus}
                    className="w-full text-center py-2.5 rounded-xl bg-[#d681d6] hover:bg-[#c970c9] text-white text-sm font-semibold transition-colors"
                  >
                    Sign Up
                  </NavLink>
                </div>
              ) : (
                <div className="flex flex-col w-full gap-2">
                  <NavLink
                    to="/profile"
                    onClick={closeAllMenus}
                    className="w-full text-center py-2 rounded-xl hover:bg-gray-800 text-sm"
                  >
                    My Profile
                  </NavLink>
                  <NavLink
                    to="/my-posts"
                    onClick={closeAllMenus}
                    className="w-full text-center py-2 rounded-xl hover:bg-gray-800 text-sm"
                  >
                    My Posts
                  </NavLink>
                  <button
                    onClick={handleLogout}
                    className="w-full text-center py-2 rounded-xl text-red-400 hover:bg-gray-800 text-sm flex items-center justify-center gap-2"
                  >
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  );
}

export default Navbar;
