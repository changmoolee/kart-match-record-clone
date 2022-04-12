import React from "react";
import styled from "styled-components";

const ToggleContainer = styled.div`
  width: 34px;
  height: 18px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 10px;
  cursor: pointer;
`;
const Shadow = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  border-radius: 10px;
  background: ${({ isRetire }) => (isRetire ? "gray" : "#f62459")};
  transition: all 0.15s ease-in-out;
`;

const Ball = styled.div`
  position: relative;
  width: 14px;
  height: 14px;
  transform: ${({ isRetire }) =>
    isRetire ? "translate(2px, 0)" : "translate(18px, 0)"};
  border-radius: 50%;
  background: white;
  transition: all 0.15s ease-in-out;
`;

const Toggle = ({ isRetire, setIsRetire }) => {
  const handleToggle = () => {
    setIsRetire((isRetire) => !isRetire);
  };

  return (
    <ToggleContainer onClick={handleToggle}>
      <Shadow isRetire={isRetire}>
        <Ball isRetire={isRetire} />
      </Shadow>
    </ToggleContainer>
  );
};

export default Toggle;
