import { useContext, useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { AppContext } from "../../context/AppContext";
import { useEffect } from "react";
import { assets } from "../../assets/assets";

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData } =
    useContext(DoctorContext);
  const { currency, backendUrl } = useContext(AppContext);
  const [isEditing, setIsEditing] = useState(false);
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    if (dToken) {
      getProfileData();
    }
  }, [dToken]);

  useEffect(() => {
    if (profileData) {
      setIsAvailable(profileData.available || false);
    }
  }, [profileData]);

  const handleAvailabilityToggle = () => {
    setIsAvailable(!isAvailable);
    // Here you would typically call an API to update availability
    console.log("Availability changed to:", !isAvailable);
  };

  if (!profileData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
            Doctor Profile
          </h1>
          <p className="text-gray-600 mt-2">
            Manage your professional information
          </p>
        </div>

        {/* Main Content */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
          {/* Profile Header - Mobile First */}
          <div className="p-6 sm:p-8 border-b border-gray-200 bg-gradient-to-r from-blue-50 to-indigo-50">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
              {/* Profile Image */}
              <div className="relative">
                <img
                  src={profileData.image}
                  alt={`Dr. ${profileData.name}`}
                  className="w-24 h-24 sm:w-32 sm:h-32 rounded-2xl object-cover border-4 border-white shadow-lg"
                />
              </div>

              {/* Basic Info */}
              <div className="flex-1 text-center sm:text-left">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">
                  Dr. {profileData.name}
                </h2>
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mt-3">
                  <p className="text-gray-700 font-medium text-sm sm:text-base">
                    {profileData.degree} - {profileData.speciality}
                  </p>
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {profileData.experience} experience
                  </span>
                </div>

                {/* Fee - Mobile Only */}
                <div className="mt-4 sm:hidden">
                  <p className="text-lg font-semibold text-gray-900">
                    Appointment Fee:{" "}
                    <span className="text-green-600">
                      {currency}
                      {isEditing ? (
                        <input
                          className="border border-blue-500 border-[2.5px]"
                          type="number"
                          onChange={(e) =>
                            setProfileData((prev) => ({
                              ...prev,
                              fees: e.target.value,
                            }))
                          }
                          value={profileData.fees}
                        ></input>
                      ) : (
                        profileData.fee
                      )}
                    </span>
                  </p>
                </div>
              </div>

              {/* Fee and Actions - Desktop */}
              <div className="hidden sm:flex flex-col items-end gap-4">
                <div className="text-right">
                  <p className="text-lg font-semibold text-gray-900">
                    {currency}
                    {profileData.fee}
                  </p>
                  <p className="text-sm text-gray-600">Appointment Fee</p>
                </div>
              </div>
            </div>

            {/* Actions - Mobile */}
            <div className="flex justify-between items-center mt-6 sm:hidden">
              <div className="flex items-center gap-2">
                <div className="relative inline-block w-12 h-6">
                  <input
                    type="checkbox"
                    checked={isAvailable}
                    onChange={handleAvailabilityToggle}
                    className="opacity-0 w-0 h-0"
                    id="availability-toggle"
                  />
                  <label
                    htmlFor="availability-toggle"
                    className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-colors duration-200 ${
                      isAvailable ? "bg-green-500" : "bg-gray-300"
                    }`}
                  >
                    <span
                      className={`absolute left-1 top-1 bg-white w-4 h-4 rounded-full transition-transform duration-200 ${
                        isAvailable ? "transform translate-x-6" : ""
                      }`}
                    />
                  </label>
                </div>
                <label
                  htmlFor="availability-toggle"
                  className="text-sm font-medium text-gray-700"
                >
                  Available
                </label>
              </div>
            </div>
          </div>

          {/* Detailed Information */}
          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column */}
              <div className="space-y-6">
                {/* About Section */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    About
                  </h3>
                  <p className="text-gray-700 leading-relaxed">
                    {profileData.about}
                  </p>
                </div>
              </div>

              {/* Right Column */}
              <div className="space-y-6">
                {/* Address Section */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    Clinic Address
                  </h3>
                  <div className="space-y-2 text-gray-700">
                    <p className="font-medium">
                      {profileData.address?.line1 || "Main Clinic Address"}
                    </p>
                    {profileData.address?.line2 && (
                      <p>{profileData.address.line2}</p>
                    )}
                    {!profileData.address?.line1 &&
                      !profileData.address?.line2 && (
                        <p className="text-gray-500 italic">
                          Address not specified
                        </p>
                      )}
                  </div>
                </div>

                {/* Professional Details */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                    Professional Details
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600">Speciality</span>
                      <span className="font-medium text-gray-900">
                        {profileData.speciality}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600">Degree</span>
                      <span className="font-medium text-gray-900">
                        {profileData.degree}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-200">
                      <span className="text-gray-600">Experience</span>
                      <span className="font-medium text-gray-900">
                        {profileData.experience}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600">Consultation Fee</span>
                      <span className="font-medium text-green-600">
                        {currency}
                        {isEditing ? (
                          <input
                            className="border border-blue-500 border-[2.5px]"
                            type="number"
                            onChange={(e) =>
                              setProfileData((prev) => ({
                                ...prev,
                                fees: e.target.value,
                              }))
                            }
                            value={profileData.fees}
                          ></input>
                        ) : (
                          profileData.fee
                        )}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Availability - Desktop */}
                <div className="hidden sm:flex items-center justify-between bg-gray-50 rounded-xl p-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-1">
                      Availability Status
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {isAvailable
                        ? "You are currently available for appointments"
                        : "You are currently not accepting new appointments"}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="relative inline-block w-14 h-7">
                      <input
                        type="checkbox"
                        checked={isAvailable}
                        onChange={handleAvailabilityToggle}
                        className="opacity-0 w-0 h-0"
                        id="availability-toggle-desktop"
                      />
                      <label
                        htmlFor="availability-toggle-desktop"
                        className={`absolute cursor-pointer top-0 left-0 right-0 bottom-0 rounded-full transition-colors duration-200 ${
                          isAvailable ? "bg-green-500" : "bg-gray-300"
                        }`}
                      >
                        <span
                          className={`absolute left-1 top-1 bg-white w-5 h-5 rounded-full transition-transform duration-200 ${
                            isAvailable ? "transform translate-x-7" : ""
                          }`}
                        />
                      </label>
                    </div>
                    <span
                      className={`font-medium ${
                        isAvailable ? "text-green-600" : "text-gray-600"
                      }`}
                    >
                      {isAvailable ? "Available" : "Busy"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoctorProfile;
