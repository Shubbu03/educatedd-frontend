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

const routes = [
  {
    name: "Main Dashboard",
    layout: "/admin",
    path: "/default",
    icon: <Icon as={MdHome} width="20px" height="20px" color="inherit" />,
    component: MainDashboard,
  },
  {
    name: "My Documents",
    layout: "/admin",
    path: "/files",
    icon: <Icon as={MdBook} width="20px" height="20px" color="inherit" />,
    component: Files,
    secondary: true,
  },
  {
    name: "My Courses",
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
  },
  {
    name: "Profile",
    layout: "/admin",
    path: "/profile",
    icon: <Icon as={MdPerson} width="20px" height="20px" color="inherit" />,
    component: Profile,
  },
];

export default routes;
