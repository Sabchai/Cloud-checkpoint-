import React from "react";


const AppButton = ({ handleClick, children }) => {
  return (
    <button className="app-button" onClick={handleClick}>
      {children}
    </button>
  );
};

export default AppButton;
