import React, { useRef, useState, useEffect } from "react";
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

const Total = styled.div`
  font-size: 12px;
  color: #1f334a;
  letter-spacing: -1px;
`;
const ChartBox = styled.div`
  width: 300px;
  height: 180px;
  padding: 12px;
`;
const Chart = styled.canvas`
  width: 100%;
  height: 100%;
`;

const Rank = ({ data }) => {
  let matchDatas = data.matches[0].matches;

  let rankDatas = [];
  matchDatas.map((matchData) => rankDatas.push(matchData.player.matchRank));
  rankDatas = rankDatas.map((rankdata) =>
    rankdata === "" || rankdata === "99" ? "8" : rankdata
  );
  // console.log(rankDatas);

  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const [ctx, setCtx] = useState();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = 300;
    canvas.height = 180;

    // 표 눈금선 그리기
    context.strokeStyle = "black";
    context.lineWidth = 0.2;
    context.beginPath();
    context.moveTo(15, 20);
    context.lineTo(15, 160);
    context.stroke();
    context.closePath();
    for (let i = 1; i < 9; i++) {
      context.strokeStyle = "black";
      context.lineWidth = 0.2;
      context.beginPath();
      context.moveTo(10, 20 * i);
      context.lineTo(300, 20 * i);
      context.stroke();
      context.closePath();
    }
    // 표 눈금 숫자 그리기
    for (let i = 1; i < 9; i++) {
      context.font = "12px sans-serif";
      context.fillText(i, 0, 20 * i + 5);
    }
    // 선 그래프 작성
    for (let i = 0; i < 50; i++) {
      context.strokeStyle = "#2877ff";
      context.lineWidth = 1;
      context.beginPath();
      context.moveTo(15 + (285 / 50) * i, 20 * rankDatas[i]);
      context.lineTo(15 + (285 / 50) * (i + 1), 20 * rankDatas[i + 1]);
      context.stroke();
      context.closePath();
    }
    for (let i = 0; i < 50; i++) {
      context.fillStyle = "#2877ff";
      context.beginPath();
      context.arc(
        15 + (285 / 50) * i,
        20 * rankDatas[i],
        3,
        0,
        Math.PI * 2,
        true
      );
      context.fill();
      context.closePath();
    }

    contextRef.current = context;

    setCtx(contextRef.current);
  }, []);

  return (
    <Container>
      <Heading>
        <Title>
          <Blue>순위 변동</Blue> <Black>추이</Black>
        </Title>
        <Total>
          지난 100경기 &nbsp;
          <Blue>
            {rankDatas.reduce((acc, cur) => Number(acc) + Number(cur)) / 100 +
              "위"}
          </Blue>
          &nbsp; 최근 50경기 &nbsp;
          <Blue>
            {rankDatas
              .slice(0, 50)
              .reduce((acc, cur) => Number(acc) + Number(cur)) /
              50 +
              "위"}
          </Blue>
        </Total>
      </Heading>
      <ChartBox>
        <Chart ref={canvasRef}></Chart>
      </ChartBox>
    </Container>
  );
};

export default Rank;
