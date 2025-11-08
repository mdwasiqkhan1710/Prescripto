import { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets.js";
import axios from "axios";
import { toast } from "react-toastify";

const MyProfile = () => {
  const { userData, setUserData, token, loadUserProfileData, backendUrl } =
    useContext(AppContext);

  const [isEdit, setIsEdit] = useState(false);
  const [image, setImage] = useState(false);

  const updateUserProfileData = async () => {
    try {
      const formData = new FormData();
      formData.append("name", userData.name);
      formData.append("phone", userData.phone);
      formData.append("address", JSON.stringify(userData.address));
      formData.append("gender", userData.gender);
      formData.append("dob", userData.dob);

      image && formData.append("image", image);

      const { data } = await axios.post(
        backendUrl + "/api/user/update-profile",
        formData,
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        await loadUserProfileData();
        setIsEdit(false);
        setImage(false);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    userData && (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-8 px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header Card */}
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 border border-gray-200">
            <div className="flex flex-col md:flex-row items-center gap-8">
              {/* Profile Image */}
              <div className="relative">
                {isEdit ? (
                  <label htmlFor="image">
                    <div className="inline-block relative cursor-pointer bg-gray-300 rounded-2xl">
                      <p className=" text-center text-sm font-sm">
                        Click to update image
                      </p>
                      <img
                        className="w-36 rounded-opacity-75"
                        src={
                          image ? URL.createObjectURL(image) : userData.image
                        }
                        alt=""
                      />
                      <img
                        className="w-10 absolute bottom-12 right-12"
                        src={image ? "" : assets.upload_icon}
                        alt=""
                      />
                    </div>
                    <input
                      onChange={(e) => setImage(e.target.files[0])}
                      type="file"
                      id="image"
                      hidden
                    />
                  </label>
                ) : (
                  <img
                    className="w-32 h-32 md:w-40 md:h-40 rounded-full object-cover border-4 border-blue-400 bg-blue-100 shadow-lg"
                    src={userData.image}
                    alt="Profile"
                  />
                )}

                {isEdit && (
                  <div className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full shadow-lg">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                      />
                    </svg>
                  </div>
                )}
              </div>

              {/* Name Section */}
              <div className="flex-1 text-center md:text-left">
                {isEdit ? (
                  <input
                    className="bg-gray-50 text-3xl font-bold text-gray-800 w-full p-3 rounded-lg border-2 border-blue-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200 text-center md:text-left"
                    type="text"
                    value={userData.name}
                    onChange={(e) =>
                      setUserData((prev) => ({ ...prev, name: e.target.value }))
                    }
                  />
                ) : (
                  <div>
                    <p className="font-bold text-3xl text-gray-800 mb-2">
                      {userData.name}
                    </p>
                    <p className="text-gray-500 text-lg">Patient Profile</p>
                  </div>
                )}
              </div>

              {/* Edit/Save Button */}
              <div className="mt-4 md:mt-0">
                {isEdit ? (
                  <button
                    className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
                    onClick={updateUserProfileData}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                    Save Changes
                  </button>
                ) : (
                  <button
                    className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-full font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200 flex items-center gap-2"
                    onClick={() => setIsEdit(true)}
                  >
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                      />
                    </svg>
                    Edit Profile
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Contact Information Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 my-5">
                CONTACT INFORMATION
              </h2>

              <div className="space-y-6">
                {/* Email */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <label className="font-semibold text-gray-700 min-w-32">
                    Email Id:
                  </label>
                  <p className="text-blue-600 font-medium flex-1">
                    {userData.email}
                  </p>
                </div>

                {/* Phone */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <label className="font-semibold text-gray-700 min-w-32">
                    Phone number:
                  </label>
                  {isEdit ? (
                    <input
                      className="flex-1 p-3 bg-gray-50 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                      type="text"
                      value={userData.phone}
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          phone: e.target.value,
                        }))
                      }
                    />
                  ) : (
                    <p className="text-blue-600 font-medium flex-1">
                      {userData.phone}
                    </p>
                  )}
                </div>

                {/* Address */}
                <div className="flex flex-col sm:flex-row gap-3">
                  <label className="font-semibold text-gray-700 min-w-32">
                    Address:
                  </label>
                  {isEdit ? (
                    <div className="flex-1 space-y-3">
                      <input
                        className="w-full p-3 bg-gray-50 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                        value={userData.address.line1}
                        onChange={(e) =>
                          setUserData((prev) => ({
                            ...prev,
                            address: { ...prev.address, line1: e.target.value },
                          }))
                        }
                        type="text"
                        placeholder="Address Line 1"
                      />
                      <input
                        className="w-full p-3 bg-gray-50 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                        value={userData.address.line2}
                        onChange={(e) =>
                          setUserData((prev) => ({
                            ...prev,
                            address: { ...prev.address, line2: e.target.value },
                          }))
                        }
                        type="text"
                        placeholder="Address Line 2"
                      />
                    </div>
                  ) : (
                    <div className="flex-1 text-gray-600">
                      <p>{userData.address.line1}</p>
                      <p>{userData.address.line2}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Basic Information Card */}
            <div className="bg-white rounded-2xl shadow-xl p-6 border border-gray-200">
              <h2 className="text-xl font-bold text-gray-800 my-5">
                BASIC INFORMATION
              </h2>

              <div className="space-y-6">
                {/* Gender */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <label className="font-semibold text-gray-700 min-w-32">
                    Gender:
                  </label>
                  {isEdit ? (
                    <select
                      className="flex-1 p-3 bg-gray-50 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          gender: e.target.value,
                        }))
                      }
                      value={userData.gender}
                    >
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  ) : (
                    <p className="text-gray-600 font-medium flex-1">
                      {userData.gender}
                    </p>
                  )}
                </div>

                {/* Date of Birth */}
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <label className="font-semibold text-gray-700 min-w-32">
                    Date of Birth:
                  </label>
                  {isEdit ? (
                    <input
                      className="flex-1 p-3 bg-gray-50 border-2 border-blue-200 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-200"
                      type="date"
                      onChange={(e) =>
                        setUserData((prev) => ({
                          ...prev,
                          dob: e.target.value,
                        }))
                      }
                      value={userData.dob}
                    />
                  ) : (
                    <p className="text-gray-600 font-medium flex-1">
                      {userData.dob
                        ? new Date(userData.dob).toLocaleDateString("en-GB")
                        : "01-01-1975"}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  );
};

export default MyProfile;
