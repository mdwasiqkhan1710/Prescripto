import { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { AdminContext } from "../context/AdminContext";
import { DoctorContext } from "../context/DoctorContext";

const SideBar = () => {
  const { aToken } = useContext(AdminContext);
  const { dToken } = useContext(DoctorContext);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <>
      {/* Mobile Hamburger Button */}
      <div className="lg:hidden fixed top-16 right-0 z-50">
        <button onClick={toggleSidebar} className="p-2">
          <svg
            className="w-8 h-7"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>
      </div>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-30"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div
        className={`
                fixed lg:static inset-y-0 left-0 z-40
                w-64 bg-white h-[145vh] border-b border-r border-gray-300 transform
                transition-transform duration-300 ease-in-out
                ${
                  isSidebarOpen
                    ? "translate-x-0"
                    : "-translate-x-full lg:translate-x-0"
                }
            `}
      >
        <div className="flex items-center justify-between p-4 lg:hidden border-b border-gray-300">
          <span className="text-lg font-semibold">Menu</span>
          <button
            onClick={closeSidebar}
            className="p-1 rounded-md hover:bg-gray-100"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {aToken && (
          <ul className="text-[#515151] mt-5">
            <li>
              <NavLink
                className={({ isActive }) =>
                  `flex items-center gap-3 py-3.5 px-6 lg:px-9 cursor-pointer hover:bg-[#F2F3FF] transition-colors duration-200 ${
                    isActive ? "bg-[#F2F3FF] border-r-4 border-[#5F6FFF]" : ""
                  }`
                }
                to={"/admin-dashboard"}
                onClick={closeSidebar}
              >
                <img src={assets.home_icon} alt="home" className="w-5 h-5" />
                <p>Dashboard</p>
              </NavLink>
            </li>

            <li>
              <NavLink
                className={({ isActive }) =>
                  `flex items-center gap-3 py-3.5 px-6 lg:px-9 cursor-pointer hover:bg-[#F2F3FF] transition-colors duration-200 ${
                    isActive ? "bg-[#F2F3FF] border-r-4 border-[#5F6FFF]" : ""
                  }`
                }
                to={"/all-appointments"}
                onClick={closeSidebar}
              >
                <img
                  src={assets.appointment_icon}
                  alt="appointment"
                  className="w-5 h-5"
                />
                <p>Appointments</p>
              </NavLink>
            </li>

            <li>
              <NavLink
                className={({ isActive }) =>
                  `flex items-center gap-3 py-3.5 px-6 lg:px-9 cursor-pointer hover:bg-[#F2F3FF] transition-colors duration-200 ${
                    isActive ? "bg-[#F2F3FF] border-r-4 border-[#5F6FFF]" : ""
                  }`
                }
                to={"/add-doctor"}
                onClick={closeSidebar}
              >
                <img src={assets.add_icon} alt="add-doc" className="w-5 h-5" />
                <p>Add Doctor</p>
              </NavLink>
            </li>

            <li>
              <NavLink
                className={({ isActive }) =>
                  `flex items-center gap-3 py-3.5 px-6 lg:px-9 cursor-pointer hover:bg-[#F2F3FF] transition-colors duration-200 ${
                    isActive ? "bg-[#F2F3FF] border-r-4 border-[#5F6FFF]" : ""
                  }`
                }
                to={"/doctor-list"}
                onClick={closeSidebar}
              >
                <img
                  src={assets.people_icon}
                  alt="doc-list"
                  className="w-5 h-5"
                />
                <p>Doctors List</p>
              </NavLink>
            </li>
          </ul>
        )}

        {dToken && (
          <ul className="text-[#515151] mt-5">
            <li>
              <NavLink
                className={({ isActive }) =>
                  `flex items-center gap-3 py-3.5 px-6 lg:px-9 cursor-pointer hover:bg-[#F2F3FF] transition-colors duration-200 ${
                    isActive ? "bg-[#F2F3FF] border-r-4 border-[#5F6FFF]" : ""
                  }`
                }
                to={"/doctor-dashboard"}
                onClick={closeSidebar}
              >
                <img src={assets.home_icon} alt="home" className="w-5 h-5" />
                <p>Dashboard</p>
              </NavLink>
            </li>

            <li>
              <NavLink
                className={({ isActive }) =>
                  `flex items-center gap-3 py-3.5 px-6 lg:px-9 cursor-pointer hover:bg-[#F2F3FF] transition-colors duration-200 ${
                    isActive ? "bg-[#F2F3FF] border-r-4 border-[#5F6FFF]" : ""
                  }`
                }
                to={"/doctor-appointments"}
                onClick={closeSidebar}
              >
                <img
                  src={assets.appointment_icon}
                  alt="appointment"
                  className="w-5 h-5"
                />
                <p>Appointments</p>
              </NavLink>
            </li>

            <li>
              <NavLink
                className={({ isActive }) =>
                  `flex items-center gap-3 py-3.5 px-6 lg:px-9 cursor-pointer hover:bg-[#F2F3FF] transition-colors duration-200 ${
                    isActive ? "bg-[#F2F3FF] border-r-4 border-[#5F6FFF]" : ""
                  }`
                }
                to={"/doctor-profile"}
                onClick={closeSidebar}
              >
                <img
                  src={assets.people_icon}
                  alt="doc-list"
                  className="w-5 h-5"
                />
                <p>Profile</p>
              </NavLink>
            </li>
          </ul>
        )}
      </div>
    </>
  );
};

export default SideBar;
