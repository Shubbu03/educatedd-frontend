import React, { useEffect, useState } from "react";
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
} from "@chakra-ui/react";

const DropMenu = () => {
  const [role, setRole] = useState("");

  const saveRole = (role: string) => {
    localStorage.setItem("role", role);

  };

  useEffect(() => {}, [role]);
  return (
    <div>
      <Menu>
        {({ isOpen }) => (
          <>
            <MenuButton isActive={isOpen} as={Button}>
              {role.length ? role : "Select"}
            </MenuButton>
            <MenuList>
              <MenuItem
                onClick={() => {
                  setRole("AUTHOR");
                  saveRole("AUTHOR");
                }}
              >
                Author
              </MenuItem>
              <MenuItem
                onClick={() => {
                  setRole("STUDENT");
                  saveRole("STUDENT");
                }}
              >
                Student
              </MenuItem>
            </MenuList>
          </>
        )}
      </Menu>
    </div>
  );
};

export default DropMenu;
