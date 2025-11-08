import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AppContext } from "../context/AppContext";
import { assets } from "../assets/assets";
import RelatedDoctors from "../components/RelatedDoctors";
import axios from "axios";
import { toast } from "react-toastify";

const Appointments = () => {
  const { docId } = useParams();
  const { doctors, currencySymbol, token, backendUrl, getDoctorsData } =
    useContext(AppContext);

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState("");

  const navigate = useNavigate();

  const daysOfWeek = ["SUN", "MON", "TUE", "WED", "THU", "FRI", "SAT"];

  const fetchDocInfo = async () => {
    const docInfo = doctors.find((doc) => doc._id === docId);
    setDocInfo(docInfo);
  };

  const bookAppointment = async () => {
    if (!token) {
      toast.warn("Please Login to book Appointment!");
      return naviagte("/login");
    }

    try {
      const date = docSlots[slotIndex][0].datetime;
      let day = date.getDate();
      let month = date.getMonth() + 1;
      let year = date.getFullYear();

      const slotDate = day + "_" + month + "_" + year;

      const { data } = await axios.post(
        backendUrl + "/api/user/book-appointment",
        { docId, slotDate, slotTime },
        { headers: { token } }
      );

      if (data.success) {
        toast.success(data.message);
        getDoctorsData();
        navigate("/my-appointments");
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const getAvailableSlots = async () => {
    if (!docInfo || !docInfo.slots_booked) return;
    setDocSlots([]);

    // Base date - today
    let today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize to start of day

    let allSlots = [];

    for (let i = 0; i < 7; i++) {
      // Create a new date for each day (don't mutate the original)
      let currentDay = new Date(today);
      currentDay.setDate(today.getDate() + i);

      // Set start time based on whether it's today or future day
      let startTime = new Date(currentDay);
      if (i === 0) {
        // For today, start from current time or 10:00 AM, whichever is later
        let now = new Date();
        startTime.setHours(Math.max(10, now.getHours()));

        // Round up to next 30-minute interval
        let minutes = startTime.getMinutes();
        if (minutes > 30) {
          startTime.setHours(startTime.getHours() + 1);
          startTime.setMinutes(0);
        } else if (minutes > 0) {
          startTime.setMinutes(30);
        }
      } else {
        // For future days, start from 10:00 AM
        startTime.setHours(10, 0, 0, 0);
      }

      // Set end time for this day (9:00 PM)
      let endTime = new Date(currentDay);
      endTime.setHours(21, 0, 0, 0);

      // If start time is after end time for today, skip today
      if (startTime >= endTime) {
        allSlots.push([]);
        continue;
      }

      let timeSlots = [];
      let currentSlot = new Date(startTime);

      // Generate 30-minute slots until end time
      while (currentSlot < endTime) {
        let formattedTime = currentSlot.toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });

        let day = currentDay.getDate();
        let month = currentDay.getMonth() + 1;
        let year = currentDay.getFullYear();

        const slotDate = day + "_" + month + "_" + year;
        const slotTime = formattedTime;

        const isSlotAvaialble =
          docInfo.slots_booked[slotDate] &&
          docInfo.slots_booked[slotDate].includes(slotTime)
            ? false
            : true;

        if (isSlotAvaialble) {
          timeSlots.push({
            datetime: new Date(currentSlot),
            time: formattedTime,
            date: currentDay.toLocaleDateString(), // Add date for clarity
          });
        }

        // Move to next 30-minute slot
        currentSlot.setMinutes(currentSlot.getMinutes() + 30);
      }

      allSlots.push(timeSlots);
    }

    setDocSlots(allSlots);
  };

  useEffect(() => {
    fetchDocInfo();
  }, [doctors, docId]);

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo]);

  useEffect(() => {
    // console.log(docSlots);
  }, [docSlots]);

  return (
    docInfo && (
      <div>
        {/* --------------------Doctors Details----------------- */}
        <div className="flex flex-col sm:flex-row gap-4 ">
          <div className="flex-3">
            <img
              style={{ backgroundColor: "#8bbbdaff" }}
              className="w-full sm:mxx-w-72 rounded-lg"
              src={docInfo.image}
              alt="doctors-image"
            />
          </div>

          <div className="flex-9 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0">
            {/* -----------Doctor's name, degree and exp--------------- */}
            <p className="flex items-center gap-2 text-2xl font-medium text-gray-900 ">
              {docInfo.name}
              <img className="w-5" src={assets.verified_icon} alt="icon" />
            </p>
            <div className="flex items-center gap-2 text-sm mt-1 text-gray-600">
              <p>
                {docInfo.degree} - {docInfo.speciality}
              </p>
              <button className="py-0.5 px-2 border text-xs rounded-full">
                {docInfo.experience}
              </button>
            </div>
            {/* ---------------Doctor About----------------- */}
            <div>
              <p className="flex items-centergap-1 text-sm font-medium text-gray-900 mt-3">
                About <img className="px-2 w-8" src={assets.info_icon} alt="" />{" "}
              </p>
              <p className="text-sm text-left text-gray-700 max-w-[700px] mt-2">
                {docInfo.about}
              </p>
            </div>
            <p className="text-gray-500 font-medium mt-4">
              Appointment Fee :{" "}
              <span className="text-gray-700">
                {currencySymbol}
                {docInfo.fee}
              </span>
            </p>
          </div>
        </div>

        {/* ------------------Booking Slots--------------------- */}

        <div className="sm:ml-2 sm:pl-2 mt-8 font-medium text-gray-800">
          <p className="text-medium">
            Get Doctor's Appointment Now! Available slots -:{" "}
          </p>
          {/* <p>Available slots -</p> */}
          <div className="flex gap-5 items-center w-full overflow-x-scroll mt-4">
            {docSlots.length &&
              docSlots.map((item, index) => (
                <div
                  onClick={() => {
                    setSlotIndex(index);
                  }}
                  className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${
                    slotIndex == index
                      ? "bg-[#414aafff] text-white"
                      : "border border-gray-300"
                  }`}
                  key={index}
                >
                  <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
                  <p>{item[0] && item[0].datetime.getDate()}</p>
                </div>
              ))}
          </div>

          <div className="flex items-center gap-4 w-full overflow-x-scroll mt-4 ml-0 pl-0">
            {docSlots.length &&
              docSlots[slotIndex].map((item, index) => (
                <p
                  onClick={() => setSlotTime(item.time)}
                  className={`text-sm font-dark flex-shrink-0px-5 py-3 rounded-full cursor-pointer px-5 ${
                    item.time === slotTime
                      ? "bg-[#414aafff] text-white"
                      : "border border-gray-300"
                  }`}
                  key={index}
                >
                  {item.time.toLowerCase()}
                </p>
              ))}
          </div>
          <button
            onClick={bookAppointment}
            className="mx-114 bg-[#414aafff] text-white text-medium font-bold px-14 py-3 rounded-full my-6 p-6"
          >
            Book an appointment
          </button>
        </div>

        {/* ----------Listing Related Doctors----------- */}
        <RelatedDoctors speciality={docInfo.speciality} docId={docId} />
      </div>
    )
  );
};

export default Appointments;
