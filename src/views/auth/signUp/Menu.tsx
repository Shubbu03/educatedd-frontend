import React, { useState } from "react";
import DropDown from "./DropDown";

const Menu: React.FC = (): JSX.Element => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);
  const [selectRole, setSelectRole] = useState<string>("");
  const roless = () => {
    return ["ADMIN", "AUTHOR", "GUEST"];
  };

  /**
   * Toggle the drop down menu
   */
  const toggleDropDown = () => {
    setShowDropDown(!showDropDown);
  };

  /**
   * Hide the drop down menu if click occurs
   * outside of the drop-down element.
   *
   * @param event  The mouse event
   */
  const dismissHandler = (event: React.FocusEvent<HTMLButtonElement>): void => {
    if (event.currentTarget === event.target) {
      setShowDropDown(false);
    }
  };

  /**
   * Callback function to consume the
   * city name from the child component
   *
   * @param role  The selected role
   */
  const newRoleSelection = (role: string): void => {
    setSelectRole(role);
  };

  return (
    <>
      <div className="announcement">
        {/* <div>
          {selectRole
            ? `You selected ${selectRole} for your travel destination`
            : "Select your travel destination"}
        </div> */}
      </div>
      <button
        className={showDropDown ? "active" : undefined}
        onClick={(): void => toggleDropDown()}
        onBlur={(e: React.FocusEvent<HTMLButtonElement>): void =>
          dismissHandler(e)
        }
      >
        <div>{selectRole ? "Select: " + selectRole : "Select ..."} </div>
        {showDropDown && (
          <DropDown
            roles={roless()}
            showDropDown={false}
            toggleDropDown={(): void => toggleDropDown()}
            rolesSelection={newRoleSelection}
          />
        )}
      </button>
    </>
  );
};

export default Menu;
