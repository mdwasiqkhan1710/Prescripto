// DoctorsList.jsx
import { useContext, useEffect } from "react";
import { AdminContext } from "../../context/AdminContext";

const DoctorsList = () => {
  const { doctors, aToken, getAllDoctors, changeAvailability } =
    useContext(AdminContext);

  useEffect(() => {
    const fetchDoctors = async () => {
      if (aToken) {
        await getAllDoctors();
      }
    };

    fetchDoctors();
  }, [aToken]);

  return (
    <div className="m-5 max-h-[90vh] overflow-y-scroll">
      <h1 className="text-lg text-center font-medium">All Doctors</h1>
      <div className="w-[70vw] mx-15 flex flex-wrap gap-12 pt-5 gap-y-6">
        {doctors && doctors.length > 0 ? (
          doctors.map((item, index) => (
            <div
              className="border border-indigo-400 rounded-xl max-w-58 overflow-hidden cursor-pointer group"
              key={index}
            >
              <img
                className="bg-blue-100 group-hover:bg-[#5F6FFF] transition-all duration-500"
                src={item.image}
                alt="profile-photo"
              />
              <div className="p-4">
                <p className="text-netural-800 text-lg font-medium">
                  {item.name}
                </p>
                <p className="text-zinc-700 text-sm">{item.speciality}</p>
                <div className="mt-5 flex items-center gap-1 text-sm">
                  <input
                    onChange={() => changeAvailability(item._id)}
                    type="checkbox"
                    checked={item.available}
                  />
                  <p>Available</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className=" border border-xl rounded rounded-medium p-4 text-lg font-medium text-red-500">
            No doctors found!
          </p>
        )}
      </div>
    </div>
  );
};

export default DoctorsList;
