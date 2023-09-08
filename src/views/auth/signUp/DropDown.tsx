import React, { useEffect, useState } from 'react';

type DropDownProps = {
  roles: string[];
  showDropDown: boolean;
  toggleDropDown: Function;
  rolesSelection: Function;
};

const DropDown: React.FC<DropDownProps> = ({
  roles,
  rolesSelection,
}: DropDownProps): JSX.Element => {
  const [showDropDown, setShowDropDown] = useState<boolean>(false);

  /**
   * Handle passing the city name
   * back to the parent component
   *
   * @param city  The selected city
   */
  const onClickHandler = (role: string): void => {
    rolesSelection(role);
  };

  useEffect(() => {
    setShowDropDown(showDropDown);
  }, [showDropDown]);

  return (
    <>
      <div className={showDropDown ? 'dropdown' : 'dropdown active'}>
        {roles.map(
          (role: string, index: number): JSX.Element => {
            return (
              <p
                key={index}
                onClick={(): void => {
                  onClickHandler(role);
                }}
              >
                {role}
              </p>
            );
          }
        )}
      </div>
    </>
  );
};

export default DropDown;
