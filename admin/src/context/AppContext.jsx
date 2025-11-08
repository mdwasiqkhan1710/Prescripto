import { createContext } from "react";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const currency = "$";

  const calculateAge = (dob) => {
    const today = new Date();
    const birthDate = new Date(dob);
    let age = today.getFullYear() - birthDate.getFullYear();

    return age;
  };

  const months = [
    "",
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "June",
    "July",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const slotDateFormat = (slotDate) => {
    if (!slotDate) return "N/A";
    try {
      const dateArray = slotDate.split("_");
      if (dateArray.length !== 3) return slotDate; // Return original if format is wrong

      const day = dateArray[0];
      const month = months[Number(dateArray[1])];
      const year = dateArray[2];

      return `${day} ${month} ${year}`;
    } catch (error) {
      console.error("Error formatting slot date:", error);
      return slotDate; // Return original date if formatting fails
    }
  };

  const value = {
    calculateAge,
    slotDateFormat,
    currency,
  };

  return (
    <AppContext.Provider value={value}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
