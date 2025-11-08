import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const Doctors = () => {
  const { speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilters, setShowFilters] = useState(false);
  const { doctors } = useContext(AppContext);
  const navigate = useNavigate();

  const applyFilter = () => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  };

  useEffect(() => {
    applyFilter();
  }, [doctors, speciality]);

  return (
    <div className="md:mx-10">
      <p className="text-gray-900 text-lg font-medium">
        Filter the doctors based on specialty.
      </p>
      <div className="flex flex-col sm:flex-row items-start gap-8 mt-5">
        <button
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${
            showFilters ? "bg-[#414aafff] text-white" : ""
          }`}
          onClick={() => setShowFilters((prev) => !prev)}
        >
          Filters
        </button>
        {/* -------Filter options (Speciality)--------------- */}
        <div
          className={`w-full sm:w-1/4 flex-col gap-4 text-sm text-gray-600 ${
            showFilters ? "flex" : " hidden sm:flex "
          }`}
        >
          <p
            onClick={() =>
              speciality === "General physician"
                ? navigate("/doctors")
                : navigate("/doctors/General physician")
            }
            className={`w-full pl-3 py-2 pr-16 border border-gray-400 rounded transition-all cursor-pointer hover:bg-gray-50 ${
              speciality === "General physician"
                ? "bg-indigo-100 text-black"
                : ""
            }`}
          >
            General Physician
          </p>
          <p
            onClick={() =>
              speciality === "Gynecologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gynecologist")
            }
            className={`w-full pl-3 py-2 pr-16 border border-gray-400 rounded transition-all cursor-pointer hover:bg-gray-50 ${
              speciality === "Gynecologist" ? "bg-indigo-100 text-black" : ""
            }`}
          >
            Gynecologist
          </p>
          <p
            onClick={() =>
              speciality === "Dermatologist"
                ? navigate("/doctors")
                : navigate("/doctors/Dermatologist")
            }
            className={`w-full pl-3 py-2 pr-16 border border-gray-400 rounded transition-all cursor-pointer hover:bg-gray-50 ${
              speciality === "Dermatologist" ? "bg-indigo-100 text-black" : ""
            }`}
          >
            Dermatologist
          </p>
          <p
            onClick={() =>
              speciality === "Pediatricians"
                ? navigate("/doctors")
                : navigate("/doctors/Pediatricians")
            }
            className={`w-full pl-3 py-2 pr-16 border border-gray-400 rounded transition-all cursor-pointer hover:bg-gray-50 ${
              speciality === "Pediatricians" ? "bg-indigo-100 text-black" : ""
            }`}
          >
            Pediatricians
          </p>
          <p
            onClick={() =>
              speciality === "Neurologist"
                ? navigate("/doctors")
                : navigate("/doctors/Neurologist")
            }
            className={`w-full pl-3 py-2 pr-16 border border-gray-400 rounded transition-all cursor-pointer hover:bg-gray-50 ${
              speciality === "Neurologist" ? "bg-indigo-100 text-black" : ""
            }`}
          >
            Neurologist
          </p>
          <p
            onClick={() =>
              speciality === "Gastroenterologist"
                ? navigate("/doctors")
                : navigate("/doctors/Gastroenterologist")
            }
            className={`w-full pl-3 py-2 pr-16 border border-gray-400 rounded transition-all cursor-pointer hover:bg-gray-50 ${
              speciality === "Gastroenterologist"
                ? "bg-indigo-100 text-black"
                : ""
            }`}
          >
            Gastroenterologist
          </p>
        </div>

        {/* --------------Showing the list of Doctors------------------ */}
        <div className="w-full sm:w-3/4">
          {filterDoc.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filterDoc.map((item, index) => (
                <div
                  onClick={() => navigate(`/appointment/${item._id}`)}
                  className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-5px] transition-all duration-300 shadow-sm hover:shadow-md"
                  key={index}
                >
                  <img
                    className="w-full h-auto object-fill bg-blue-50"
                    src={item.image}
                    alt="docs-image"
                  />
                  <div className="p-4">
                    <div className="flex items-center gap-2 text-sm text-green-500 mb-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <p>Available</p>
                    </div>
                    <p className="text-gray-900 text-lg font-medium">
                      {item.name}
                    </p>
                    <p className="text-gray-600 text-sm">{item.speciality}</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-gray-500">
                No doctors found for the selected specialty.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Doctors;
