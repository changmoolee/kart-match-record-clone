import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";

const Y_SCALE_UNIT = 20;
const X_START_POINT = 15;
const TOTAL_POINTS = 50;

const ChartBox = styled.div`
  width: 300px;
  height: 180px;
  padding: 12px;
`;
const Chart = styled.canvas`
  width: 100%;
  height: 100%;
`;

const RankGraph = ({ rankDatas }) => {
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  const [ctx, setCtx] = useState();

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = 300;
    canvas.height = 180;

    // 표 y축 눈금선 그리기
    context.strokeStyle = "black";
    context.lineWidth = 0.2;
    context.beginPath();
    context.moveTo(X_START_POINT, 20);
    context.lineTo(X_START_POINT, 160);
    context.stroke();
    context.closePath();

    // 표 x축 눈금선 그리기
    for (let i = 1; i < 9; i++) {
      context.strokeStyle = "black";
      context.lineWidth = 0.2;
      context.beginPath();
      context.moveTo(10, Y_SCALE_UNIT * i);
      context.lineTo(300, Y_SCALE_UNIT * i);
      context.stroke();
      context.closePath();
    }

    // 표 눈금 숫자 그리기
    for (let i = 1; i < 9; i++) {
      context.font = "12px Noto Sans KR";
      context.fillText(i, 0, Y_SCALE_UNIT * i + 5);
    }

    // 선 그래프 작성
    context.strokeStyle = "#2877ff";
    context.lineWidth = 1;
    context.beginPath();
    for (let i = 0; i < TOTAL_POINTS; i++) {
      context.moveTo(
        X_START_POINT + (285 / TOTAL_POINTS) * i,
        Y_SCALE_UNIT * rankDatas[i]
      );
      context.lineTo(
        X_START_POINT + (285 / TOTAL_POINTS) * (i + 1),
        Y_SCALE_UNIT * rankDatas[i + 1]
      );
    }
    context.stroke();
    context.closePath();

    // 그래프 포인트 작성
    for (let i = 0; i < 50; i++) {
      context.fillStyle = "#2877ff";
      context.beginPath();
      context.arc(
        X_START_POINT + (285 / TOTAL_POINTS) * i,
        Y_SCALE_UNIT * rankDatas[i],
        3,
        0,
        (Math.PI / 180) * 360,
        true
      );
      context.fill();
      context.closePath();
    }

    contextRef.current = context;

    setCtx(contextRef.current);
  }, [rankDatas]);

  return (
    <ChartBox>
      <Chart ref={canvasRef}></Chart>
    </ChartBox>
  );
};

export default RankGraph;
