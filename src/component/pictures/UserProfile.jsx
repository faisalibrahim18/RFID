import React, { useEffect, useState } from "react";
import axios from "axios";
const UserProfile = () => {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_KEY;
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${API_URL}/api/v1/rfid/getUserSignedIn`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setUserData(response.data.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchUserData();
  }, []);

  if (!userData) {
    return (
      <div>
        <h1 className="mt-5 mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] text-primary motion-reduce:animate-[spin_1.5s_linear_infinite]">
          <span className="!absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
            Loading...
          </span>
        </h1>
        <div className="">Loading...</div>
      </div>
    );
  }

  const firstLetter = userData.name
    ? userData.name.charAt(0).toUpperCase()
    : "";

  const circleStyle = {
    backgroundColor: stringToColor(userData._id),
    color: "#ffffff",
  };

  function stringToColor(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    const color = "#" + (hash & 0x00ffffff).toString(16).toUpperCase();
    return color.padEnd(7, "0");
  }

  return (
    <div
      className="h-56 w-56 rounded-full m-0 text-9xl flex justify-center items-center pb-6  font-semibold"
      style={circleStyle}
    >
      {firstLetter}
    </div>
  );
};
export default UserProfile;
