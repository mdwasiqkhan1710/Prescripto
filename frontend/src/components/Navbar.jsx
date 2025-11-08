import { useContext, useState } from "react";
import { assets } from "../assets/assets.js";
import { NavLink, useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext.jsx";

const Navbar = () => {
  const navigate = useNavigate();
  const [showMenu, setShowMenu] = useState(false);
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const { token, setToken, userData } = useContext(AppContext);

  const logout = () => {
    setToken(false);
    navigate("/login");
    localStorage.removeItem("token");
  };

  const closeMenu = () => {
    setShowMenu(false);
  };

  const toggleProfileDropdown = () => {
    setShowProfileDropdown(!showProfileDropdown);
  };

  return (
    <div className="flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400 px-4 sm:px-6 lg:px-8">
      {/* Logo */}
      <img
        onClick={() => navigate("/")}
        className="w-32 sm:w-44 cursor-pointer"
        src={assets.logo}
        alt="Prescripto Logo"
      />

      {/* Desktop Navigation */}
      <ul className="hidden md:flex items-start gap-5 font-medium">
        <NavLink to="/">
          <li
            style={{ color: "#414cafff", fontSize: "1.1rem" }}
            className="py-1"
          >
            Home
          </li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/doctors">
          <li
            style={{ color: "#414cafff", fontSize: "1.1rem" }}
            className="py-1"
          >
            All Doctors
          </li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/about">
          <li
            style={{ color: "#414cafff", fontSize: "1.1rem" }}
            className="py-1"
          >
            About
          </li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
        <NavLink to="/contact">
          <li
            style={{ color: "#414cafff", fontSize: "1.1rem" }}
            className="py-1"
          >
            Contact
          </li>
          <hr className="border-none outline-none h-0.5 bg-primary w-3/5 m-auto hidden" />
        </NavLink>
      </ul>

      {/* User Actions */}
      <div className="flex items-center gap-4">
        {token && userData ? (
          <>
            {/* Profile Dropdown for Desktop */}
            <div
              style={{ cursor: "pointer" }}
              className="hidden md:flex items-center gap-2 cursor-pointer group relative"
              onMouseEnter={() => setShowProfileDropdown(true)}
              onMouseLeave={() => setShowProfileDropdown(false)}
            >
              <img
                className="w-8 rounded-full bg-blue-200"
                src={userData.image}
                alt="profile_pic"
              />
              <img
                className="w-2.5"
                src={assets.dropdown_icon}
                alt="dropdown_icon"
              />
              <div
                className={`absolute top-0 right-0 pt-14 text-base font-medium text-gray-500 z-20 ${
                  showProfileDropdown ? "block" : "hidden"
                }`}
              >
                <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4 shadow-lg">
                  <p
                    onClick={() => {
                      navigate("/my-profile");
                      setShowProfileDropdown(false);
                    }}
                    className="hover:text-black cursor-pointer"
                  >
                    My Profile
                  </p>
                  <p
                    onClick={() => {
                      navigate("/my-appointments");
                      setShowProfileDropdown(false);
                    }}
                    className="hover:text-black cursor-pointer"
                  >
                    My Appointments
                  </p>
                  <p
                    onClick={logout}
                    className="hover:text-black cursor-pointer"
                  >
                    Logout
                  </p>
                </div>
              </div>
            </div>

            {/* Profile Icon for Mobile - Shows dropdown on click */}
            <div className="md:hidden relative">
              <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={toggleProfileDropdown}
              >
                <img
                  className="w-8 rounded-full"
                  src={assets.profile_pic}
                  alt="profile_pic"
                />
                <img
                  className="w-2.5"
                  src={assets.dropdown_icon}
                  alt="dropdown_icon"
                />
              </div>
              {/* Mobile Profile Dropdown */}
              {showProfileDropdown && (
                <div className="absolute top-full right-0 mt-2 text-base font-medium text-gray-500 z-20">
                  <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4 shadow-lg">
                    <p
                      onClick={() => {
                        navigate("/my-profile");
                        setShowProfileDropdown(false);
                      }}
                      className="hover:text-black cursor-pointer"
                    >
                      My Profile
                    </p>
                    <p
                      onClick={() => {
                        navigate("/my-appointments");
                        setShowProfileDropdown(false);
                      }}
                      className="hover:text-black cursor-pointer"
                    >
                      My Appointments
                    </p>
                    <p
                      onClick={logout}
                      className="hover:text-black cursor-pointer"
                    >
                      Logout
                    </p>
                  </div>
                </div>
              )}
            </div>
          </>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="cursor-pointer bg-blue-500 text-white px-4 py-2 sm:px-6 sm:py-3 rounded-full font-semibold text-md sm:text-md hidden md:block"
          >
            Login / Sign Up
          </button>
        )}

        {/* Mobile Menu Button */}
        <img
          onClick={() => setShowMenu(true)}
          className="w-6 md:hidden cursor-pointer"
          src={assets.menu_icon}
          alt="menu-icon"
        />

        {/* Mobile Menu Overlay */}
        {showMenu && (
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
            onClick={closeMenu}
          ></div>
        )}

        {/* Mobile Side Menu */}
        <div
          className={`fixed top-0 right-0 h-full w-64 bg-white z-40 transform transition-transform duration-300 ease-in-out md:hidden ${
            showMenu ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex items-center justify-between px-5 py-6 border-b border-gray-200">
            <img className="w-32" src={assets.logo} alt="logo" />
            <img
              className="w-6 cursor-pointer"
              onClick={closeMenu}
              src={assets.cross_icon}
              alt="cross-icon"
            />
          </div>

          <ul className="flex flex-col gap-2 mt-6 px-5 text-base font-medium">
            <NavLink
              to="/"
              onClick={closeMenu}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/doctors"
              onClick={closeMenu}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              All Doctors
            </NavLink>
            <NavLink
              to="/about"
              onClick={closeMenu}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              About
            </NavLink>
            <NavLink
              to="/contact"
              onClick={closeMenu}
              className={({ isActive }) =>
                `block px-4 py-3 rounded-lg transition-colors ${
                  isActive
                    ? "bg-blue-50 text-blue-600"
                    : "text-gray-700 hover:bg-gray-100"
                }`
              }
            >
              Contact Us
            </NavLink>
          </ul>

          {/* Mobile Login Button if not logged in */}
          {!token && (
            <div className="px-5 mt-6">
              <button
                onClick={() => {
                  navigate("/login");
                  closeMenu();
                }}
                className="w-full bg-blue-500 text-white px-4 py-3 rounded-full font-bold text-sm"
              >
                Login or Sign Up
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
