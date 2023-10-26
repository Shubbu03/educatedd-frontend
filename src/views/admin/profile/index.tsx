// Chakra imports
import { Box, Grid } from "@chakra-ui/react";
import axios from "axios";
import Banner from "views/admin/profile/components/Banner";
import banner from "assets/img/auth/banner.png";
import avatar from "assets/img/avatars/avatar4.png";
import avatarAdmin from "assets/img/avatars/avatar04.png";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

export default function Overview() {
  const [dataLoaded, setDataLoaded] = useState(false);

  const [userData, setUserData] = useState({
    firstName: "",
    lastName: "",
    role: "",
    email: "",
  });

  const history = useHistory();

  async function getProfile() {
    const accessToken = localStorage.getItem("accessToken");
    setDataLoaded(true);
    await axios
      .get("http://localhost:3005/users/me", {
        headers: {
          "x-api-token": `${accessToken}`,
        },
      })
      .then((res) => {
        if (res.data.code === 200) {
          const value = res.data.data;
          setUserData({
            firstName: value.firstName,
            lastName: value.lastName,
            role: value.role,
            email: value.email,
          });
        } else {
          localStorage.setItem("accessToken", "");
          history.push("/login");
        }
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => setDataLoaded(false));
  }

  useEffect(() => {
    getProfile();
  });
  return (
    <Box pt={{ base: "130px", md: "80px", xl: "80px" }}>
      <>
        <Banner
          gridArea="1 / 1 / 2 / 2"
          banner={banner}
          avatar={userData.role === "STUDENT" ? avatar : avatarAdmin}
          name={userData.firstName}
          lastName={userData.lastName}
          role={userData.role}
          email={userData.email}
        />
      </>
    </Box>
  );
}
