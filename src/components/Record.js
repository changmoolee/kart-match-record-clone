import React from "react";
import styled from "styled-components";

const Container = styled.section`
  width: 350px;
  height: 265px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 12px;
  margin-right: 10px;
  background: white;
  box-sizing: border-box;
`;
const Heading = styled.header`
  width: 100%;
  height: 41px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
  font-size: 14px;
  font-weight: 700;
  border-bottom: 1px solid #ccc;
  color: #1f334a;
  box-sizing: border-box;
`;
const Title = styled.div``;
const Blue = styled.span`
  color: #2877ff;
`;
const Black = styled.span``;
const WinAndLose = styled.div`
  font-size: 12px;
  color: #1f334a;
  letter-spacing: -1px;
`;
const Graph = styled.section`
  width: 95%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  margin: 0 auto;
  font-weight: 500;
`;
const WinRate = styled.div`
  display: flex;
  flex-direction: column;
  margin: 8px 0;
  text-align: center;
  font-size: 14px;
  border-right: 1px solid #f2f2f2;
`;
const FinishRate = styled.div`
  display: flex;
  flex-direction: column;
  margin: 8px 0;
  text-align: center;
  font-size: 14px;
  border-right: 1px solid #f2f2f2;
`;
const RetireRate = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  margin: 8px 0;
  font-size: 14px;
`;
const CircleBox = styled.div`
  width: 83px;
  height: 83px;
  margin: 20px auto;
`;
const OuterCircle = styled.div`
  width: 83px;
  height: 83px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: ${({ color, degree }) => `conic-gradient(
    ${color} 0deg,
    ${color} ${degree}deg,
    #ebebeb ${degree}deg,
    #ebebeb 360deg
  )`};
`;
const InnerCircle = styled.div`
  width: 68px;
  height: 68px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 50%;
  background: white;
`;
const Percent = styled.span`
  margin-bottom: 7px;
  font-size: 20px;
  color: ${({ color }) => color};
`;
const Bottom = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 8px;
  margin: 8px;
  font-size: 14px;
  font-weight: 500;
  border-top: 1px solid #f2f2f2;
`;
const RunMode = styled.span`
  font-size: 20px;
  font-weight: 700;
  color: #1f334a;
`;
const Record = ({ data }) => {
  const dummyPercent = [35, 91, 67];

  const convertToDeg = (percent) => {
    let degree = percent * 3.6;
    return degree;
  };

  return (
    <Container>
      <Heading>
        <Title>
          <Blue>종합</Blue> <Black>전적</Black>
        </Title>
        <WinAndLose>200전 69승 131패</WinAndLose>
      </Heading>
      <Graph>
        <WinRate>
          <span>승률</span>
          <CircleBox>
            <OuterCircle color="#0277ff" degree={convertToDeg(dummyPercent[0])}>
              <InnerCircle>
                <Percent color="#0277ff">{dummyPercent[0]}%</Percent>
              </InnerCircle>
            </OuterCircle>
          </CircleBox>
        </WinRate>
        <FinishRate>
          <span>완주율</span>
          <CircleBox>
            <OuterCircle color="#9bd728" degree={convertToDeg(dummyPercent[1])}>
              <InnerCircle>
                <Percent color="#9bd728">{dummyPercent[1]}%</Percent>
              </InnerCircle>
            </OuterCircle>
          </CircleBox>
        </FinishRate>
        <RetireRate>
          <span>리타이어율</span>
          <CircleBox>
            <OuterCircle color="#f62559" degree={convertToDeg(dummyPercent[2])}>
              <InnerCircle>
                <Percent color="#f62559">{dummyPercent[2]}%</Percent>
              </InnerCircle>
            </OuterCircle>
          </CircleBox>
        </RetireRate>
      </Graph>
      <Bottom>
        <Title>
          <Blue>최다주행</Blue> <Black>모드</Black>
        </Title>
        <RunMode>통합</RunMode>
      </Bottom>
    </Container>
  );
};

export default Record;
