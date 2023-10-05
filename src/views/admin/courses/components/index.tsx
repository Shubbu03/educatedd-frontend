import React from "react";
import Enrolled from "./Enrolled";
import EnrolledCourses from "./EnrolledCourses";

export default function Courses() {
  const userRole = localStorage.getItem("role");

  const isStudent = () => {
    if (userRole === "STUDENT") {
      return true;
    } else {
      return false;
    }
  };

  return isStudent() ? <EnrolledCourses /> : <Enrolled />;
}

