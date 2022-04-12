import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";

const X_SCALE_UNIT = 25;
const Y_SCALE_UNIT = 20;

const X_START_POINT = 25;
const Y_END_POINT = 120;

const TOTAL_POINTS = 11;

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

const GraphBox = styled.section`
  width: 100%;
  height: 140px;
  padding: 10px 0;
`;
const Graph = styled.canvas`
  width: 100%;
  height: 100%;
`;

const TrackGraph = () => {
  const dummyRecord = [];

  for (let i = 0; i < TOTAL_POINTS; i++) {
    let standard = 1.36;
    dummyRecord.push((standard + 0.06 * i).toFixed(2));
  }

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
    context.moveTo(X_START_POINT, 120);
    context.lineTo(280, Y_END_POINT);
    context.stroke();
    context.closePath();

    // 표 y축 그리기
    context.strokeStyle = "black";
    context.lineWidth = 0.5;
    context.beginPath();
    context.moveTo(X_START_POINT, 20);
    context.lineTo(X_START_POINT, Y_END_POINT);
    context.stroke();
    context.closePath();

    // 표 세로(vertical) 눈금선 그리기
    for (let i = 1; i < 11; i++) {
      context.strokeStyle = "black";
      context.lineWidth = 1;
      context.globalAlpha = 0.1;
      context.beginPath();
      context.moveTo(X_START_POINT + X_SCALE_UNIT * i, 20);
      context.lineTo(X_START_POINT + X_SCALE_UNIT * i, Y_END_POINT);
      context.stroke();
      context.closePath();
    }

    // 표 가로(Horizontal) 눈금선 그리기
    for (let i = 0; i < 6; i++) {
      context.strokeStyle = "black";
      context.lineWidth = 1;
      context.beginPath();
      context.moveTo(X_START_POINT, Y_END_POINT - Y_SCALE_UNIT * i);
      context.lineTo(280, Y_END_POINT - Y_SCALE_UNIT * i);
      context.stroke();
      context.closePath();
    }

    // 표 y축 눈금 숫자 그리기
    for (let i = 0; i < 6; i++) {
      context.globalAlpha = 1;
      context.font = "12px Noto Sans KR";
      context.fillText(i, 5, 125 - Y_SCALE_UNIT * i);
    }

    // 표 x축 눈금 숫자 그리기
    for (let i = 0; i < TOTAL_POINTS; i++) {
      context.save();
      context.font = "10px Noto Sans KR";
      context.translate(15 + X_SCALE_UNIT * i, 135);
      context.rotate((Math.PI / 180) * 330);
      context.translate(-15 - X_SCALE_UNIT * i, -135);
      context.fillText(dummyRecord[i], 15 + X_SCALE_UNIT * i, 140);
      context.restore();
    }

    // 선 그래프 배경색
    context.fillStyle = "#2877ff";
    context.globalAlpha = 0.1;
    context.beginPath();
    context.moveTo(X_START_POINT, Y_END_POINT - Y_SCALE_UNIT * dummyData[0]);
    for (let i = 1; i < TOTAL_POINTS; i++) {
      context.lineTo(
        X_START_POINT + X_SCALE_UNIT * i,
        Y_END_POINT - Y_SCALE_UNIT * dummyData[i]
      );
    }
    context.fill();
    context.closePath();

    // 선 그래프 작성
    context.strokeStyle = "#2877ff";
    context.globalAlpha = 1;
    context.lineWidth = 1;
    context.beginPath();
    context.moveTo(X_START_POINT, Y_END_POINT - Y_SCALE_UNIT * dummyData[0]);
    for (let i = 1; i < TOTAL_POINTS; i++) {
      context.lineTo(
        X_START_POINT + X_SCALE_UNIT * i,
        Y_END_POINT - Y_SCALE_UNIT * dummyData[i]
      );
    }
    context.stroke();
    context.closePath();

    // 그래프 포인트 작성
    for (let i = 0; i < TOTAL_POINTS; i++) {
      context.fillStyle = "#2877ff";
      context.beginPath();
      context.arc(
        X_START_POINT + X_SCALE_UNIT * i,
        Y_END_POINT - Y_SCALE_UNIT * dummyData[i],
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
    <GraphBox>
      <Graph ref={canvasRef} />
    </GraphBox>
  );
};

export default TrackGraph;
