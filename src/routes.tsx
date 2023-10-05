//all these imports are for the sidebar on the main page ..
import { Icon } from "@chakra-ui/react";
import {
  MdPerson,
  MdHome,
  MdBook,
  MdOutlineShoppingCart,
} from "react-icons/md";

// Admin Imports
import MainDashboard from "views/admin/default";
import Files from "views/admin/myFiles";
import Courses from "views/admin/courses/components";
import Profile from "views/admin/profile";
import ShowEnrolled from "views/admin/courses/components/ShowEnrolled";

const isStudent = () => {
  const role = localStorage.getItem("role");

  if (role === "STUDENT") {
    return true;
  } else {
    return false;
  }
};

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: MainDashboard,
    isVisible: !isStudent(),
  },
  {
    name: "My Documents",
    layout: "/admin",
    path: "/files",
    icon: <Icon as={MdBook} width="20px" height="20px" color="inherit" />,
    component: Files,
    secondary: true,
    isVisible: !isStudent(),
  },
  {
    name: "Courses",
    layout: "/admin",
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    path: "/course",
    component: Courses,
    isVisible: true,
  },
  {
    name: "Enrolled Courses",
    layout: "/admin",
    icon: (
      <Icon
        as={MdOutlineShoppingCart}
        width="20px"
        height="20px"
        color="inherit"
      />
    ),
    path: "/enrolled",
    component: ShowEnrolled,
    isVisible: true,
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "/profile",
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: Profile,
    isVisible: true,
  },
];

// export const routesUser = [
//   {
//     name: "Courses",
//     layout: "/user",
//     icon: (
//       <Icon
//         as={MdOutlineShoppingCart}
//         width="20px"
//         height="20px"
//         color="inherit"
//       />
//     ),
//     path: "/course",
//     component: Courses,
//   },
//   {
//     name: "Profile",
//     layout: "/user",
//     path: "/profile",
//     icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
//     component: Profile,
//   },
// ];

export default routes;
