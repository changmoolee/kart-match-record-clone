import React, { useState } from "react";
import styled from "styled-components";
import Toggle from "./Toggle";

const Container = styled.div`
  width: 100%;
  height: 61px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #ccc;
`;

const Box = styled.section`
  height: 100%;
  display: flex;
  align-items: center;
  font-size: 12px;
  color: #1f334a;
`;

const Tab = styled.div`
  width: 81px;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
  border-bottom: ${({ clicked, index }) =>
    clicked === index ? "4px solid #0277ff" : "4px solid transparent"};
  font-size: 14px;
  font-weight: 500;
  color: ${({ clicked, index }) => (clicked === index ? "#0277ff" : "#a1a1a1")};
  transition: all 0.15s ease-in-out;
  :hover {
    border-bottom: 4px solid #0277ff;
    color: #0277ff;
  }
`;
const Text = styled.span`
  margin-bottom: -4px;
`;

const Tabs = ({ isRetire, setIsRetire }) => {
  const [clicked, setClicked] = useState(0);

  const tabsName = ["통합", "매우빠름", "무한부스터"];

  const onClickTab = (index) => {
    setClicked(index);
  };

  return (
    <Container>
      <Box>
        {tabsName.map((name, index) => (
          <Tab
            key={name}
            clicked={clicked}
            index={index}
            onClick={() => onClickTab(index)}
          >
            <Text clicked={clicked} index={index}>
              {name}
            </Text>
          </Tab>
        ))}
      </Box>
      <Box>
        리타이어 노출
        <Toggle isRetire={isRetire} setIsRetire={setIsRetire} />
      </Box>
    </Container>
  );
};

export default Tabs;
