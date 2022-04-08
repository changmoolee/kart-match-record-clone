import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 330px;
  display: flex;
  flex-direction: column;
  margin-right: 10px;
`;
const Tabs = styled.div`
  display: flex;
`;
const Tab = styled.div`
  width: 116px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  border-bottom: ${({ clicked, index }) =>
    clicked === index ? "2px solid #0277ff" : "2px solid transparent"};
  color: ${({ clicked, index }) => (clicked === index ? "#0277ff" : "gray")};
  background: ${({ clicked, index }) =>
    clicked === index ? "white" : "#ebebeb"};
`;

const TopTable = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: white;
`;
const TableTitle = styled.div`
  width: 288px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 8px;
  margin-top: 15px;
  font-weight: 700;
  letter-spacing: -1px;
  border-bottom: 1px solid #ccc;
`;

const TitleBox = styled.div`
  font-size: 14px;
`;
const PercentBox = styled.div`
  font-size: 12px;
`;
const Blue = styled.span`
  color: #2877ff;
`;
const Black = styled.span``;

const Graph = styled.div`
  width: 288px;
  height: 178px;
  padding: 15px 8px;
`;
const Title = styled.div`
  width: 100%;
  font-size: 14px;
  font-weight: 500;
  color: #1f334a;
`;
const Gray = styled.span`
  color: #a1a1a1;
`;
const ChartBox = styled.section`
  width: 100%;
  height: 140px;
  padding: 10px 0;
`;
const Chart = styled.canvas`
  width: 100%;
  height: 100%;
`;

const BottomTable = styled.div`
  width: 310px;
  height: 235px;
  display: flex;
  flex-direction: column;
  padding-right: 18px;
  background: white;
  overflow-x: hidden;
  overflow-y: auto;
`;
const Thead = styled.section`
  width: 100%;
  height: 35px;
  display: grid;
  grid-template-columns: 25px 160px 25px 33px 40px 27px;
  background: #f9f9f9;
`;
const Th = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 13px;
  font-weight: bold;
  letter-spacing: -1px;
`;
const Tbody = styled.div`
  width: 100%;
  height: 200px;
`;
const Tr = styled.section`
  width: 100%;
  height: 46px;
  display: grid;
  grid-template-columns: 25px 160px 25px 33px 40px 27px;
  justify-items: center;
  align-items: center;
`;
const Radio = styled.input``;
const Track = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  padding-left: 10px;
  font-size: 13px;
  color: #1f334a;
`;
const TrackImage = styled.img`
  height: 27px;
  margin-right: 5px;
`;
const Td = styled.div`
  text-align: center;
  font-size: 13px;
  color: #1f334a;
  letter-spacing: -1px;
`;

const Left = () => {
  const [clicked, setClicked] = useState(0);
  const [radioChecked, setRadioChecked] = useState(0);

  const onClickTab = (index) => {
    setClicked(index);
  };
  const onClickRadio = (index) => {
    setRadioChecked(index);
  };

  const tabs = ["트랙", "카트"];

  const dummyTrackRecord = Array(2).fill("");

  const dummyData = [
    "0.01",
    "0.4",
    "1.64",
    "3.3",
    "3.49",
    "3.93",
    "4.7",
    "2.54",
    "1.7",
    "0.5",
    "0.03",
  ];

  const dummyRecord = [];

  for (let i = 0; i < 10; i++) {
    let standard = 1.36;
    dummyRecord.push((standard + 0.06 * i).toFixed(2));
  }
  // console.log(dummyRecord);

  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const [ctx, setCtx] = useState();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = 288;
    canvas.height = 140;
    // 표 x축 그리기
    context.strokeStyle = "black";
    context.lineWidth = 0.5;
    context.beginPath();
    context.moveTo(25, 120);
    context.lineTo(280, 120);
    context.stroke();
    context.closePath();

    // 표 y축 그리기
    context.strokeStyle = "black";
    context.lineWidth = 0.5;
    context.beginPath();
    context.moveTo(25, 20);
    context.lineTo(25, 120);
    context.stroke();
    context.closePath();

    // 표 세로 눈금선 그리기
    for (let i = 1; i < 11; i++) {
      context.strokeStyle = "black";
      context.lineWidth = 1;
      context.globalAlpha = 0.1;
      context.beginPath();
      context.moveTo(25 + 25 * i, 20);
      context.lineTo(25 + 25 * i, 120);
      context.stroke();
      context.closePath();
    }

    // 표 가로 눈금선 그리기
    for (let i = 0; i < 6; i++) {
      context.strokeStyle = "black";
      context.lineWidth = 1;
      context.beginPath();
      context.moveTo(25, 120 - 20 * i);
      context.lineTo(280, 120 - 20 * i);
      context.stroke();
      context.closePath();
    }

    // 표 세로 눈금 숫자 그리기
    for (let i = 0; i < 6; i++) {
      context.globalAlpha = 1;
      context.font = "12px Noto Sans KR";
      context.fillText(i, 5, 125 - 20 * i);
    }

    // 표 가로 눈금 숫자 그리기
    for (let i = 0; i < 10; i++) {
      context.save();
      context.font = "10px Noto Sans KR";
      context.translate(15 + 25 * i, 135);
      context.rotate((Math.PI / 180) * 330);
      context.translate(-15 - 25 * i, -135);
      context.fillText(dummyRecord[i], 15 + 25 * i, 140);
      context.restore();
    }

    // 선 그래프 배경색
    context.fillStyle = "#2877ff";
    context.globalAlpha = 0.1;
    context.beginPath();
    context.moveTo(25, 120 - 20 * dummyData[0]);
    for (let i = 1; i < 11; i++) {
      context.lineTo(25 + 25 * i, 120 - 20 * dummyData[i]);
    }
    context.fill();
    context.closePath();

    // 선 그래프 작성
    context.strokeStyle = "#2877ff";
    context.globalAlpha = 1;
    context.lineWidth = 1;
    context.beginPath();
    context.moveTo(25, 120 - 20 * dummyData[0]);
    for (let i = 1; i < 11; i++) {
      context.lineTo(25 + 25 * i, 120 - 20 * dummyData[i]);
    }
    context.stroke();
    context.closePath();

    // 그래프 포인트 작성
    for (let i = 0; i < 50; i++) {
      context.fillStyle = "#2877ff";
      context.beginPath();
      context.arc(
        25 + (275 / 11) * i,
        120 - 20 * dummyData[i],
        2.5,
        0,
        Math.PI * 2,
        true
      );
      context.stroke();
    }

    contextRef.current = context;

    setCtx(contextRef.current);
  }, []);

  return (
    <Container>
      <Tabs>
        {tabs.map((tab, index) => (
          <Tab
            key={index}
            clicked={clicked}
            index={index}
            onClick={() => onClickTab(index)}
          >
            {tab}
          </Tab>
        ))}
      </Tabs>
      <TopTable>
        <TableTitle>
          <TitleBox>
            <Blue>트랙</Blue>&nbsp;
            <Black>전적</Black>
          </TitleBox>
          <PercentBox>
            평균 상위&nbsp;
            <Blue>15.00</Blue>%
          </PercentBox>
        </TableTitle>
        <Graph>
          <Title>
            브로디 비밀의 연구소&nbsp;<Gray>기록분포</Gray>
          </Title>
          <ChartBox>
            <Chart ref={canvasRef} />
          </ChartBox>
        </Graph>
      </TopTable>
      <BottomTable>
        <Thead>
          <Th>선택</Th>
          <Th>트랙</Th>
          <Th>횟수</Th>
          <Th>승률</Th>
          <Th>기록</Th>
          <Th>상위</Th>
        </Thead>
        <Tbody>
          {dummyTrackRecord.map((track, index) => (
            <Tr key={index}>
              <Radio
                type="radio"
                name="track"
                Checked={radioChecked === index}
                onClick={() => onClickRadio(index)}
              />
              <Track>
                <TrackImage
                  src="https://s3-ap-northeast-1.amazonaws.com/solution-userstats/kartimg/Category/brodi_1.png"
                  alt="트랙이미지"
                />
                브로디 비밀의 연구
              </Track>
              <Td>13</Td>
              <Td>38%</Td>
              <Td>2'13'72</Td>
              <Td>15%</Td>
            </Tr>
          ))}
        </Tbody>
      </BottomTable>
    </Container>
  );
};

export default Left;
